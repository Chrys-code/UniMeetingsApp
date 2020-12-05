import React, {useState, useContext} from 'react';
import './navbarStyle.scss';
// Local Data
import {useHistory} from 'react-router-dom';
import { getFromStorage, setInStorage } from "../../utils/storage";
import UserContext from '../../userData/userData';

function Navbar(props) {
  // User Data
  const userData = useContext(UserContext);
  const user = userData.user.student;

  // State
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  // Browser History for "back / logout" button
  let history = useHistory();

  console.log(userData)
  function menuHandler() {
    setUserMenuOpen(!userMenuOpen);
  }

  ////////////////////////////////
  // LogOut / back Function
  ////////////////////////////////

  function onLogOut(e) {
    if (history.location.pathname !== "/"){
          history.goBack()
    } else {

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

  const userMenuStyle = {
    transform: `translateX(${userMenuOpen? 0 : 100}%)`
  }

  ////////////////////////////////
  // Render Function
  ////////////////////////////////

  return (
    <div className="navbar">
      <button id="escape" onClick={(e)=>onLogOut(e)}><p>←</p></button>
        <div className="navbar_user">
          <p>{user.name}</p>
        <div className="navbar_user_image_container" onClick={()=>menuHandler()}>
          <img src={require('../../Assets/User/user_icon.png').default} alt="user_illustration"></img>
        </div>
      </div>

      <div className="user_menu" style={userMenuStyle}>
        <p>Account information:</p>{" "} <br/>
        <ul className="user_menu_list">
          <li className="user_menu_list_info">Name: {user.name}</li>
          <li className="user_menu_list_info">School: {user.school.name}</li>
          {user.event ? (<li className="user_menu_list_info">Last Event: {user.event.location}, {user.event.date}</li>) : user.userDate && (<li className="user_menu_list_info">Last Event: {user.userDate}</li>)}
        </ul>
      </div>
  </div>
)
}

export default Navbar
