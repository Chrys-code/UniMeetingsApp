import React, {useState, useContext, useEffect} from 'react';
import './navbarStyle.scss';
// Local Data
import {useHistory} from 'react-router-dom';
import { getFromStorage, setInStorage } from "../../utils/storage";
import UserContext from '../../userData/userData';
//Components
import Usermenu from "./usermenu";
function Navbar(props) {
  const [indicator, setIndicator] = useState(false)
  const [borderColor, setBorderColor] = useState('');
  // User Data
  const userData = useContext(UserContext);
  const user = userData.user.student;
  // State
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  // Browser History for "back / logout" button
  let history = useHistory();

  function menuHandler() {
    setUserMenuOpen(!userMenuOpen);
  }

  ////////////////////////////////
  // LogOut / back Function
  ////////////////////////////////

  function onLogOut(e) {
    // If user would like to close the navbar menu instad of log out... 
    // I missed it myself a couple of times as well
    if (userMenuOpen === true) {
      setUserMenuOpen(false)
      return
    }

    // Is user is in nested pages the button behaves like an escape button
    if (history.location.pathname !== "/"){
          history.goBack()
    } else {
      
    // Is user is on the home page, button behaves as exit button
      const obj = getFromStorage("login_app");
      if (obj && obj.token) {
        const { token } = obj;
  
        fetch("/api/account/logout?token=" + token)
          .then((res) => res.json())
          .then((json) => {
            if (json.success) {
              setInStorage("login_app", { token: "" });
              window.location.reload();
            }
          });
      } else {
        setInStorage("login_app", { token: "" });
        window.location.reload();
      }
  
    }
  
  }

  // userIcon border upon open menu
  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

 useEffect(()=> {
  if(getRandomInt(3) === 0 ) {
    setBorderColor('#ffa500')
  } else if (getRandomInt(3) === 1) {
    setBorderColor('#6ba46a')
  }else if (getRandomInt(3) === 2) {
    setBorderColor('#FF6E79')
  }
 }, [userMenuOpen])

  const userIcon = {
    border: userMenuOpen ? `2px solid ${borderColor}` : null,
  }

  ////////////////////////////////
  // Render Function
  ////////////////////////////////


  return (
    <div className="navbar">
      <button id="escape" onClick={(e)=>onLogOut(e)}><p>←</p></button>
        <div className="navbar_user">
          <p>{user.name}</p>
          
          <div className="navbar_user_image_container" style={userIcon}  onClick={()=>menuHandler()}>
          <img src={require('../../Assets/User/user_icon.png').default} alt="user_illustration"></img>
          {indicator && <div className="indicator"></div>}
          </div>
        
      </div>
      <Usermenu user={user} userMenuOpen={userMenuOpen} setIndicator={setIndicator} />
  </div>

)
}

export default Navbar
