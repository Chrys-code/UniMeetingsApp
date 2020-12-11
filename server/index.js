const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema');
const app = express();
const mongoose = require('mongoose');
// user Auth
const userAuth = require("./authentication/userauth.js");
// user Events
const addEvent = require("./userEvents/addEvent.js");
const confirmEvent = require("./userEvents/confirmEvent.js");
const notification = require("./userEvents/notification");
// org auth
const orgAuth = require("./authentication/orgauth");
// org Events
const register = require("./orgEvents/studentregister");


const cors = require('cors');
const bodyParser = require('body-parser');
require("dotenv/config");

const Event = require("./models/event");
const Student = require('./models/student');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/unimeetingsapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});
mongoose.connection.on('open', ()=>{
    console.log('Connected to Database')
});

//Heroku connect
if (process.env.NODE_ENV === "production") {
    app.use(express.static("../client/build"));
}
  

app.use(bodyParser.json());
app.use(cors());
//app.use(express.urlencoded({ extended: false }));

//////////////////////
// Routes
//////////////////////

// user Auth
app.use("/api", userAuth);
// user Events
app.use("/userevent", addEvent);
app.use("/userevent", confirmEvent);
app.use("/userevent", notification);
// org Auth
app.use("/api/org", orgAuth);
// org Events
app.use("/api/org", register);




app.use('/graphql', graphqlHTTP({
    schema: schema,
}))

/** 
 * Automatic eventId updater for users
 * Once serverDate == event.date(yyyy-mm-dd) && event.student.accepted === true
 * Update student.eventId = event._id based event.students._id (student.eventId works as secondary kay to request event by ID withi graphQL)
 * if event.student.accepted === false, filtered out when listing participants in notifications + skipped during update
 * if answer === null student will also be skipped on the update squence
*/ 
function updateEventId() {

    // Format new Date to match "yyyy-mm-dd" as stored in DB
        var d = new Date(),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        const serverDate = [year, month, day].join('-');

    ////////////////////////////////////
    // Find every event for current day
    ////////////////////////////////////
     Event.find({
        date: serverDate
    },            
    (err, events) => {
        if(err) {
        return res.send({
            success: false,
            message: "Error: Couldn't find event"
        });
        } else {       
            ////////////////////////////////////
            // For each event find students
            // With answer === true
            // Update those students
            ////////////////////////////////////
          events.forEach(e =>{
            e.students.forEach(student=> {
              if(student.accepted == true) {
               Student.findOneAndUpdate(
                   {_id: student._id},
                   {'$set': {eventId: e._id} },
                   {new: true},
                   (err, success) => {
                       if(err){
                           return res.send({
                               success: false,
                               message: "Error during update."
                           })
                       } else if (success) {
                        return res.send({
                            success: true,
                            message: "Successfully updated!"
                        })
                    }
                   }
                )

              } else {
                  return
              }

            })
          })
        }
    }
);
}
    
////////////////////////////////////
// Run updater once every hour
////////////////////////////////////
setInterval(()=> {
    updateEventId();
}, 1000*60*60)

const PORT = process.env.PORT || 8080 ;

app.listen(PORT)
