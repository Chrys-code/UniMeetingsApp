import React, {useState, useEffect} from 'react';
import './components/login/loginStyle.scss';
//Router and transition
import {Route, Switch, useLocation} from 'react-router-dom'
import {AnimatePresence} from 'framer-motion'
//Server Data
import {graphql} from 'react-apollo';
import {getSchoolsQuery} from "./queries/loginqueries";
//Local Data
import { getFromStorage, setInStorage } from "./utils/storage";

//Components
import Form from "./components/login/form";
// Components HOC user context api
import Main from './components/userContext/main';
// Constant Viewport 
import Navbar from "./components/navbar/navbar";
// Pages
import Activities from './components/activites/activities';
import Events from "./components/events/events";
import Lists from "./components/lists/lists";
import Meetings from './components/meetings/meetings';

// App
function App(props) {

  // User Input
  const [schoolId, setSchoolId] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  // Fetch & response
  const [signInErr, setSignInErr] = useState('');
  const [token, setToken] = useState('');
  const [id, setId] = useState('');
  const [data, setData] = useState({});
  // Page transition
  const location = useLocation();
  ////////////////////////////////
  // Lifecycle Methods
  ////////////////////////////////
  // Verify existing token
  ////////////////////////////////
  
  useEffect(() => {
    const obj = getFromStorage("login_app");
    if (obj && obj.token) {
    const { token } = obj;
    
    fetch("/api/account/verify?token=" + token)
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          const obj = getFromStorage("login_app");
          if (obj && obj.schoolId) {
            const { schoolId } = obj;
        
          setToken(token)
          setId(json.userId)
          setSchoolId(schoolId)
          }
        } else {
          return
        }});
      } else {
        return
      }
  },[])


  useEffect(()=>{
    if(props.data.loading === false) {
      setData(props.data)
    }
  },[props.data])

  ////////////////////////////////
  // Trusted Events
  ////////////////////////////////
  // Log-In user & set Token // **Sending token within HEAD would be more safe**
  ////////////////////////////////

    async function onSignIn(e) {
      e.preventDefault();

       await fetch("/api/account/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          password: password,
          schoolId: schoolId,
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.success) {
            setId(json.id);
            setSchoolId(json.schoolId)
            setSignInErr(json.message.split(':')[1]);
            setToken(json.token);
            setInStorage("login_app", { token: json.token, schoolId: schoolId });
          } else {
            setSignInErr(json.message.split(':')[1]);
            setTimeout(()=>{
              setSignInErr('Login')
            }, 2000)
            console.log(signInErr)

          }  
        });
    }


  ////////////////////////////////
  // Input Handlers
  ////////////////////////////////

  function organizationInputHandler(e) {
    setSchoolId(e.target.value)
  }
  function nameInputHandler(e) {
    setName(e.target.value)
  }
  function passwordInputHandler(e) {
    setPassword(e.target.value)
  }

  ////////////////////////////////
  // Page Transition
  ////////////////////////////////

  const variants = {
    initial: { opacity: 0, scale: 1.05 },
    visible: { opacity: 1, scale: 1  },
    hidden: { opacity: 0 , scale: 1.05 },  
  }

  const transition = {
    duration: .3,
  }

  ////////////////////////////////
  // Render Function
  ////////////////////////////////

  if (!token) {
    return (<>
        <div className="login">
            <div className="login_logo_container">
            <img src={require('./Assets/Login/Iconlogo.png').default} alt=""/>
            </div>
            <p>Let your school know if you travel {" "} & Protect your friends</p>
            <Form inputHandlers={{onSignIn ,organizationInputHandler, nameInputHandler, passwordInputHandler}} schoolsData={data} signInErr={signInErr} />
        </div>


    </>);
} else {
  return (
      <div className="App" >
          <Main id={id} schoolId={schoolId}>
            <Navbar />
            <AnimatePresence exitBeforeEnter >
            <Switch location={location} key={location.key}>
              <Route path="/" exact component={(e)=><Activities  variants={ variants } transition={transition}/>} />
              <Route path="/events" component={(e)=><Events variants={variants} transition={transition} />} />
              <Route path="/lists" component={(e)=><Lists variants={variants} transition={transition} /> } />
              <Route path="/meetings" component={(e)=><Meetings variants={variants} transition={transition} /> } />
            </Switch>
            </AnimatePresence>
          </Main>
      </div> 
  );
  }
}

export default graphql(getSchoolsQuery)(App);





