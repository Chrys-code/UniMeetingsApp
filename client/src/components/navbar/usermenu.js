import React from 'react'
function Usermenu(props) {

    const {user, userMenuOpen} = props;

    const userMenuStyle = {
        transform: `translateX(${userMenuOpen? 0 : 100}%)`
      }
    
    return (
        <>
        <div className="user_menu" style={userMenuStyle}>
        <p>Account information:</p>{" "} <br/>
        <ul className="user_menu_list">
          <li className="user_menu_list_info">Name: {user.name}</li>
          <li className="user_menu_list_info">School: {user.school.name}</li>
          {user.event ? (<li className="user_menu_list_info">Last Event: {user.event.location}, {user.event.date}</li>) : user.userDate && (<li className="user_menu_list_info">Last Event: {user.userDate}</li>)}
        </ul>
      </div>

        </>
    )
}

export default Usermenu
