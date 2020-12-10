const express = require("express");
const router = express.Router();
const Event = require("../models/event");

router.post("/confirmevent", (req, res, next) => {
    const {body} = req;
    const {userId, eventId, answer} = body;

    if (!answer) {
        return res.send({
          success: false,
          message: "Error: Answer ID cannot be blank.",
        });
      }
    
      if (!userId) {
        return res.send({
          success: false,
          message: "Error: User ID cannot be blank.",
        });
      }
    
      if (!eventId) {
        return res.send({
          success: false,
          message: "Error: Event ID cannot be blank.",
        });
      }

      Event.findOneAndUpdate(
        {"_id": eventId, 'students._id': userId},
        {"$set": {'students.$.accepted': answer}},
        {new: true, upsert: true}, 
        function(err, doc) {
          if (err)
            {return res.send(500, {error: err})}
          else 
            {return res.send({          success: true,      id:doc._id})
          }        
        }
      )

})

module.exports = router;


