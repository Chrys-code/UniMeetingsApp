const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema');
const app = express();
const mongoose = require('mongoose');
const userAuth = require("./authentication/userauth.js");
const addEvent = require("./userEvents/addEvent.js");
const confirmEvent = require("./userEvents/confirmEvent.js");
const notification = require("./userEvents/notification");
const cors = require('cors');
const bodyParser = require('body-parser');
require("dotenv/config");

const Event = require("./models/event");
const Student = require('./models/student');

const PORT = process.env.PORT || 8080 ;
mongoose.connect(process.env.DB_CONN, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});
mongoose.connection.on('open', ()=>{
    console.log('Connected to Database')
});


app.use(bodyParser.json());
app.use(cors());
//app.use(express.urlencoded({ extended: false }));

//////////////////////
// Routes
//////////////////////
app.use("/api", userAuth);
app.use("/userevent", addEvent);
app.use("/userevent", confirmEvent);
app.use("/userevent", notification);
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
}))

/** 
 * Automatic eventId updater for users
 * Once serverDate == given event date  && student accepted the notification
 * Update eventId based students._id within event
 * if declined student will be removed from event when answering notification
 * if answer === null student will be skipped on update squence
*/ 
function updateEventId() {

    // Need to find a proper date to match... otherwise it works
    const serverDate = '2020-12-10'  //new Date();

    console.log(serverDate)


     Event.find({
        date: serverDate
    },            
    (err, events) => {
        if(err) {
        return res.send({
            success: false,
            message: "Error: Smth went wrong"
        });
        } else {
            console.log(events);
          
          events.forEach(e =>{
            e.students.forEach(student=> {

              if(student.accepted == true) {
               // get each sctudent fron DB and update their eventId : e._id
               Student.findOneAndUpdate(
                   {_id: student._id},
                   {'$set': {eventId: e._id} },
                   {new: true},
                   (err, success) => {
                       if(err){
                           return console.log(err)
                       } else if (success) {
                           return console.log(success)
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
    
// User eventId updater run once a day 
setInterval(()=> {
    updateEventId();
}, 1000*60*60*24)


app.listen(PORT, ()=> {
    console.log(`server run at port:${PORT}`)
})
