import React, {useState, useContext, useEffect, useRef} from 'react';
import "./notificationStyle.scss";
import {motion} from "framer-motion"
// Local Data
import UserContext from '../../userData/userData';
// Verify User: Token
import { getFromStorage} from "../../utils/storage";


function Notification(props) {
  const {userMenuOpen, setIndicator} = props
    //state
    const [userId, setUserId] = useState('');
    const [eventId, setEventId] = useState('');
    const [loading, setLoading] = useState(false);
    const [isOpen, setReminderIsOpen] = useState(false);
    //notification details
    const [notificationDetails, setNotificationDetails] = useState([]);
    const [reminder, setReminder] = useState([]);

    //user data
    const userData = useContext(UserContext);

    /*
    This is an interval API 
    Calling setInterval is not an option as React re-renders the component on parent state-change
    I could set the component to not to re-render however I'am changing the parent component state from here
    And state update needed in this components as well...
    This API with useRef lets React remember the iterations of the interval so can be prevented to run on re-renders
    */

   function useInterval(callback, delay) {
    const savedCallback = useRef();
  
    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }


    // Set profile icon indicator to red when
    // an event invitation is in the menu
    const notificationIndicator = () => {
      if ( notificationDetails.length !== 0 ) {
        setIndicator(true);
      } else {
        setIndicator(false);

      }
    }

    // Data fetching with verified token
    // Gives back all the event invitations that the user haven't answered yet
    // and calls notification indicator if event.length > 0
    const fecthUserUpcomingEvent = async ()=> {
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

                  // Get all upcoming events
                  json.events.forEach(e => {
                    let students = [];

                    // event declined skip
                    const declined = e.students.filter((x) => x._id === userId && x.accepted === false);
                    if (declined.length > 0) {
                      return
                    }
                    
                    // create list of students who accepted the invite
                    e.students.forEach(student => {
  
                      if(student.accepted === true){
                        students.push(student)
                      }

                      
                    })

                    //creators should not get their own notification and declined events
                    const eventCreator = students.filter((x) => x._id === userId)
                    // add to notificationDetails 
                    const exist = notificationDetails.filter((x) => x._id === e._id)
                    if (exist.length >= 1 || eventCreator.length === 1 || eventCreator.accepted === false) {
                      return
                    } else {
                      notificationDetails.push({_id:e._id, creator: {_id: e.creator._id, name: e.creator.name}, location: e.location, date: e.date, students: students })
                    }
                    setNotificationDetails(notificationDetails);
                    notificationIndicator();
                  })

                  // Get all upcoming events
                  // if answered by user, save to "reminder"
                  json.events.forEach((e, index)=> {
                    let acceptedList = [];

                    e.students.forEach(student => {
                      if (student._id === userId ) {

                        if(student.accepted === true){
                          acceptedList.push(e)

                        }  
                      }
                    })

                   setReminder(acceptedList)
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

    // User answer on invitation
    const onAnswer = async (e, notificationId) =>  {
      e.preventDefault();
      const id = notificationId;
      const target = e.target.value;

        await fetch("/userevent/confirmevent", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            eventId: id,
            userId: userId,
            answer: target,
         }),
        })
          .then((res) => res.json())
          .then((json) => {
            if (json.success === true) {
              const withoutAnswered = notificationDetails.filter((x)=> x._id !== json.id)
              setNotificationDetails(withoutAnswered);  
              notificationIndicator();
            }
          });
    }


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

    // initial request for invites
    useEffect(()=>{
      fecthUserUpcomingEvent();
      notificationIndicator();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // On menu open request fetch
    // refresh on menu open
    useEffect(()=> {
      if(userMenuOpen === true) {
        fecthUserUpcomingEvent();
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userMenuOpen])

    // Custon setInterval hook:
    // Fetching data and turn notification indicator
    // per 15s
    useInterval(()=> {
      fecthUserUpcomingEvent();
      notificationIndicator();
    }, 15000)



  ////////////////////////////////
  // Onclick animation
  ////////////////////////////////

  const variants = {
    open: { opacity: 1, height: '100%' },
    closed: { opacity: 0, height: "0px" },
  }
    return (<>
    
        <div className="notifications">
        <div className="reminder_tile" onClick={()=>setReminderIsOpen(!isOpen)}>
                <div className="reminder_tile_header" >
                 <h4>Accepted Meetings:</h4>
                 </div>
                 <div className="reminder_tile_body">
                    {reminder && reminder.map(meeting => {
                      return (
                        < motion.div animate={isOpen ? "open" : "closed"} variants={variants} className="reminder" key ={meeting._id}>
                        <p>Created: {meeting.creator.name}</p>
                        <p>Location: <span>{meeting.location}</span></p>
                        <p>Date:  <span>{meeting.date}</span></p>
                        <p>Participants:</p> {meeting.students.map(student => {
                          return (
                            <p key={student._id}>- {student.name}</p>
                          )
                        })}
                        </motion.div>
                      )
                    } )}

                 </div>
          </div>

          {loading ? <div className="loader"><p>Loading events ...</p></div>: 

          

          notificationDetails && notificationDetails.map((notification) => {
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
                   <li key={student._id}>{student.name}</li>
                   )
                 })}</ul>
                 </div>
                        <div className="buttons">
                          <button  className="accept" style={{color: '#6ba46a'}}  value="true" onClick={(e)=>onAnswer(e, notification._id)}>Accept</button>
                          <button  className="decline" style={{color: '#FF6E79'}} value="false" onClick={(e)=>onAnswer(e,  notification._id)}>Decline</button>
                        </div>
                
               </div>
             )
           })
           }
        </div>
    </>)
}

export default Notification
