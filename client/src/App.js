import React, {useState, useEffect} from 'react';
import './components/login/loginStyle.scss';
//Server Data
import {graphql} from 'react-apollo';
import {getSchoolsQuery} from "./queries/loginqueries";
//Local Data
import { getFromStorage, setInStorage } from "./utils/storage";

//Components
import Navbar from "./components/navbar/navbar";
import Form from "./components/login/form";
import Main from './components/main/main';


// App
function App(props) {

  const [schoolId, setSchoolId] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [signInErr, setSignInErr] = useState('');
  const [token, setToken] = useState('');
  const [id, setId] = useState('');
  
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
                setToken(token)
                setIsLoading(false)
              } else {
                setIsLoading(false)
              }
            });
        } else {
          setIsLoading(false)
        }
  
      },[])
        
    ////////////////////////////////
    // Trusted Events
    ////////////////////////////////
    // Log-In user & set Token // Sending token within HEAD would be more safe
    ////////////////////////////////

    async function onSignIn(e) {
      e.preventDefault();
      setIsLoading(true)
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
            setSignInErr(json.message);
            setIsLoading(false);
            setToken(json.token);
            setInStorage("login_app", { token: json.token });
            
              //console.log('YOU ARE LOGGED IN');
          } else {
            setSignInErr(json.message);
            setIsLoading(false);
            //console.log('COULD NOT LOG YOU IN');
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


  if (!token) {
    return (
        <div className="login">
            <div className="login_logo_container">
            <img src={require('./Assets/Login/Iconlogo.png').default} alt=""/>
            </div>
            <p>Let your school know if you travel
                         &
                Protect your friends</p>

            <Form inputHandlers={{onSignIn ,organizationInputHandler, nameInputHandler, passwordInputHandler}} schoolsData={props.data} signInErr={signInErr} />
        </div>
    );
} else {
  return (
        <div className="App">
            <Navbar />
            <Main id={id} />
        </div> 
  );
}

  
  
  
}

export default graphql(getSchoolsQuery)(App);





