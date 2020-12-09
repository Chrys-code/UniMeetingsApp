import React, {useState, useContext, useEffect} from 'react';
import "./notificationStyle.scss";
// Local Data
import UserContext from '../../userData/userData';
// Verify User: Token
import { getFromStorage} from "../../utils/storage";


function Notification(props) {
  const {userMenuOpen} = props
    //state
    const [userId, setUserId] = useState('');
    const [eventId, setEventId] = useState('');
    const [loading, setLoading] = useState(false);
    //user data
    const userData = useContext(UserContext);
    //notification details
    const [notificationDetails, setNotificationDetails] = useState([]);

    // initialize user data
    useEffect(() => {
      const id = userData.user.student.id;
        setUserId(id)
        
        const student = userData.user.student;
      if(student.event != null && student.event.id != null){
        const userEventId = student.event.id;
        setEventId(userEventId);
      }

    }, [userData])

    useEffect(()=> {
      if(userMenuOpen === true) {
        fecthUserUpcomingEvent();
      }
    }, [eventId,userId, userMenuOpen])

    async function fecthUserUpcomingEvent() {
            setLoading(true);

            const obj = getFromStorage("login_app");
            if (obj && obj.token) {
              const { token } = obj;

            await fetch("/userevent/getupcomingevents", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  token: token,
                  userEventId: eventId,
                  userId: userId,
                }),
              
            })
              .then((res) => res.json())
              .then((json) => {
                if (json.success) {
                  console.log(json)
                  json.events.forEach(e => {

                    let students = [];

                    e.students.forEach(student => {
                      students.push(student)
                    })

                    const exist = notificationDetails.filter((x) => x._id === e._id)
                    if (exist.length >= 1) {
                      return
                    } else {
                      notificationDetails.push({_id:e._id, creator: {_id: e.creator._id, name: e.creator.name}, location: e.location, date: e.date, students: students })
                    }
                    setNotificationDetails(notificationDetails);

                  })
                  setLoading(false)
                } else {
                  setLoading(false)
                }
              });
          } else {
            setLoading(false)
          }
    }


    return (<>
    {loading ? <div>Loading events ...</div>: 
        <div className="notifications">
           {notificationDetails && notificationDetails.map(notification => {
             return (
               <div className="notification_tile" key={notification._id}>
                 <div className="notification_tile_header">
                 <h4>Invitation from {notification.creator.name}</h4>
                 </div>
                 <div className="notification_tile_body">
                 <p>Location: <span>{notification.location}</span></p>
                 <p>Date:  <span>{notification.date}</span></p>
                 <ul>Participants:{notification.students.map(student=>{
                   return (
                   <li key={student._id}>{ student.name}</li>
                   )
                 })}</ul>
                 </div>
                 <div className="buttons">
            <button className="accept" style={{color: '#6ba46a'}}>Accept</button>
            <button className="decline" style={{color: '#FF6E79'}}>Decline</button>
           </div>

               </div>
             )
           })}
        </div>}
    </>)
}

export default Notification
