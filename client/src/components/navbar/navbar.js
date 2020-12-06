import React, {useState, useContext} from 'react';
import './navbarStyle.scss';
// Local Data
import {useHistory} from 'react-router-dom';
import { getFromStorage, setInStorage } from "../../utils/storage";
import UserContext from '../../userData/userData';
//Components
import Usermenu from "./usermenu";
function Navbar(props) {
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
        <Usermenu user={user} userMenuOpen={userMenuOpen} />

  </div>

)
}

export default Navbar
