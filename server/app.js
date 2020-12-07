const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema');
const app = express();
const mongoose = require('mongoose');
const userAuth = require("./authentication/userauth.js");
const addEvent = require("./userEvents/addEvent.js");
const cors = require('cors');
const bodyParser = require('body-parser');
require("dotenv/config");

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
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: false,
}))

app.listen(PORT, ()=> {
    console.log(`server run at port:${PORT}`)
})
