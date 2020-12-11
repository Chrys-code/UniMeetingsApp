const express = require("express");
const router = express.Router();
const Event = require("../models/event");
const UserSession = require("../models/usersession");



router.post("/getupcomingevents", (req, res, next) => {
    const {body} = req;
    const {token, userEventId, userId} = body;

    //verify user
    UserSession.find(
        {
          _id: token,
          isDeleted: false,
        },
        (err, sessions) => {
          if (err) {
            return res.send({
              success: false,
              message: "Error: Invalid Token",
            });
          }
    
          const session = sessions[0];
          if (sessions.length != 1) {
            return res.send({
              success: false,
              message: "Error: User already logged in.",
            });
          } else {

            // Get events back, then filter those of eventId != userEventId
            // if front gets events.length > 0
            // create notification with accept / decline
            // then user trigger setUpcomingEvent by response 
            Event.find({
              'students._id': userId,
            },            
            (err, events) => {
                if(err) {
                return res.send({
                    success: false,
                    message: "Error: Couldn't return event"
                });
                } else {
                  let eventList = [];

                  events.forEach(e =>{
                    e.students.forEach(student=> {
                      if(student._id == userId) {
                        eventList.push(e)
                      }
                    })
                  })

                  eventList = eventList.filter((x)=> x._id != userEventId)
                  
                    return res.send({
                      success: true,
                      message: "Sent!",
                      events: eventList,
                    })
                }
            }
            )
          }
        }
      );
    
})

module.exports = router;
