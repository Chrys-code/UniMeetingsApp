/*

import React, {useState, useContext, useEffect} from 'react';
// Local Data
import UserContext from '../../userData/userData';
// Verify User: Token
import { getFromStorage, setInStorage } from "../../utils/storage";


// Concept:  Fetch server time-to-time
// By userID fetch userdata.event.ID
// then fetch events and (oserver)findby Event.students.id
// If found event.id != user.event id push notification to the app waiting for accept / decline
// accept will do nothing
// decline will remove you from event.students list
// getting out of time will remove you as well
// on event day, update event.studens in their students.event

// mutations: expressJS  -server



function Notification(props) {

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
        console.log(student.event)
      }

    }, [userData])

    useEffect(()=> {
      fecthUserUpcomingEvent();
    }, [eventId,userId])


    async function fecthUserUpcomingEvent() {
            setLoading(true);

            const obj = getFromStorage("login_app");
            if (obj && obj.token) {
              const { token } = obj;
              console.log(token,eventId,userId)

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
                console.log(json)
                if (json.success) {

                  json.events.forEach(e => {
                    let students = [];

                    e.students.forEach(student => {
                      students.push(student)
                    })

                    notificationDetails.push({_id:e._id, creator: e.creator, location: e.location, date: e.date, students: students })
                    setNotificationDetails(notificationDetails)

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




    return (
        <div className="notifications">
           {notificationDetails && notificationDetails.map(notification => {
             return (
               <div className="notification_tile" key={notification._id}>
                 <h4>Invited By: {notification.creator}</h4>
                 <div className="notification_body">
                 <p>Location:{notification.location}</p>
                 <p>date:{notification.date}</p>
                 <ul>participants:{notification.students.map(student=>{
                   return (
                   <li key={student._id}>{ student.name}</li>
                   )
                 })}</ul>
                 </div>
               </div>
             )
           })}
        </div>
    )
}

export default Notification
*/