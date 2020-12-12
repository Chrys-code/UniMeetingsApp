import React, {useState} from 'react'
import "./usermenuStyle.scss";
import Notification from "./notification";
import {motion} from "framer-motion";

function Usermenu(props) {

    const {user, userMenuOpen} = props;
    const [tileIsOpen, setTileIsOpen] = useState(false)

  ////////////////////////////////
  // Onclick animation
  ////////////////////////////////
  // Menu transtition
  const menuVariants = {
    menuOpen: { opacity: 1, transform: "translateX(0%)" },
    menuClosed: { opacity: 1,transform: "translateX(100%)" },
  }

  const menuTransition = {
    duration: .5,
    
  }


  // Account information tile transtition
  const tileVariants = {
    tileOpen: { opacity: 1, height: "100%" },
    tileClosed: { opacity: 1, height: "0px" },
  }

    
    return (
        <>
        <motion.div initial={"menuClosed"} animate={userMenuOpen ? "menuOpen" : "menuClosed"} variants={menuVariants} transition={menuTransition} className="user_menu" >
        <div className="scrollable">

          <div className="user_menu_tile" onClick={()=>setTileIsOpen(!tileIsOpen)}>
            <div className="user_menu_tile_header">
            <p>Account information</p>{" "}
            </div>
            <motion.div  initial={"tileClosed"} animate={tileIsOpen ? "tileOpen" : "tileClosed"} variants={tileVariants}  className="user_menu_tile_body">
            <ul className="user_menu_list">
              <li className="user_menu_list_info">Name: <span>{user.name}</span></li>
                <li className="user_menu_list_info">School: <span>{user.school.name}</span></li>
                {user.event ? (<li className="user_menu_list_info">Last Event: <span>{user.event.location}, {user.event.date}</span></li>) : user.userDate && (<li className="user_menu_list_info">Last Event: <span>{user.userDate}</span></li>)}
            </ul>
            </motion.div>
        </div>
          <Notification userMenuOpen={userMenuOpen} setIndicator={props.setIndicator} />
        </div>
      </motion.div>

        </>
    )
}

export default Usermenu

