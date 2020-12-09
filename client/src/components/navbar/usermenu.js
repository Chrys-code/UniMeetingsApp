import React from 'react'
import "./usermenuStyle.scss";
import Notification from "./notification";

function Usermenu(props) {

    const {user, userMenuOpen} = props;

    const userMenuStyle = {
        transform: `translateX(${userMenuOpen? 0 : 100}%)`
      }
    
    return (
        <>
        <div className="user_menu" style={userMenuStyle}>
        <div className="scrollable">

          <div className="user_menu_tile">
            <div className="user_menu_tile_header">
            <p>Account information</p>{" "}
            </div>
            <div className="user_menu_tile_body">
            <ul className="user_menu_list">
              <li className="user_menu_list_info">Name: <span>{user.name}</span></li>
                <li className="user_menu_list_info">School: <span>{user.school.name}</span></li>
                {user.event ? (<li className="user_menu_list_info">Last Event: <span>{user.event.location}, {user.event.date}</span></li>) : user.userDate && (<li className="user_menu_list_info">Last Event: <span>{user.userDate}</span></li>)}
            </ul>
            </div>
        </div>
          <Notification userMenuOpen={userMenuOpen} />
        </div>
      </div>

        </>
    )
}

export default Usermenu

