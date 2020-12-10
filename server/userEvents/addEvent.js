const express = require("express");
const router = express.Router();
const Event = require("../models/event");

router.post("/createevent", (req, res, next) => {
    const {body} = req;
    const {creator, date, location, students} = body;
    if (!creator) {
        return res.send({
          success: false,
          message: "Error: Creator cannot be blank.",
        });
      }
      if (!date) {
        return res.send({
          success: false,
          message: "Error: Date cannot be blank.",
        });
      }
    
      if (!location) {
        return res.send({
          success: false,
          message: "Error: Location cannot be blank.",
        });
      }
    
      if (!students) {
        return res.send({
          success: false,
          message: "Error: Students cannot be blank.",
        });
      }

      Event.find({
          creator: creator,
          date: date,
          location: location,
      },
      
      (err, previousEvents) => {
          if(err) {
              return res.send({
                  success: false,
                  message: "Error: Couldn't create event"
              });
          } else if (previousEvents.length > 0) {
            return res.send({
                success: false,
                message: "Error: Event already exist."
            });
          }

          const newEvent = new Event();
          newEvent.creator = creator;
          newEvent.date = date;
          newEvent.location = location;
          newEvent.students = students;
          newEvent.save((err, event) => {
              if(err) {
                  return res.send({
                      success: false,
                    message: "Error: Error saving event",
                  });
              }
              return res.send({
                  success: true,
                  message: "Event created successfully"
              })
          })
      }
      )
})

module.exports = router;