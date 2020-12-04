import React, {useContext} from 'react'
import './activitiesStyle.scss';
// Routing and transition
import {Link} from 'react-router-dom'
import {motion} from 'framer-motion'
// Local Data
import UserContext from '../../userData/userData';


function Activities(props) {
  const {variants, transition} = props;
  // UserData
  const userData = useContext(UserContext);
  const user = userData.user.student;
  /////////////////////////
  // Page Content
  /////////////////////////
  
  const activities = [
    {name:"event", title:"Travel & Event Date", subtitle:"Provide a date", link:"/events", img: require('../../Assets/Activities/event_bg.png').default},
    {name:"lists", title:"Lists", subtitle:"See the lists of students", link:"/lists", img: require('../../Assets/Activities/lists_bg.png').default},
    {name:"meeting", title:"Create Meeting", subtitle:"Declare a meeting with other students", link:"/meetings", img: require('../../Assets/Activities/meeting_bg.png').default},
]

  /////////////////////////
  // Tile for each object
  /////////////////////////

    const Tiles = (props) => {
        const {name, title, subtitle, link, img} = props;
        return (
            <Link to={`${link}`} >
                <div className={"tile_" + name}>
                <img style={{position: "absolute", transform: 'translate(-50%, -50%)', top: '50%', left: '50%', zIndex: '-1'}} src={img} alt="background_img"/>
                    <h4>{title}</h4>{" "} 
                    <p>{subtitle}</p>
                </div>
            </Link>
        )
    }

    
  /////////////////////////
  // Return function
  /////////////////////////

    return (
        <motion.div initial="initial" animate="visible" exit="hidden" variants={variants}  transition={transition}   className="activities">
            <div className="activities_greeting">
                <h3>Welcome, <span>{user.name}</span>!</h3>
                <p>Who you are meeting with today? {""} <br/>Please chose one from the activities below:</p>
            </div>
            <div className="activities_tlies_container">
                {activities.map(item => {
                    return (
                       <Tiles key={item.name} name={item.name} title={item.title} subtitle={item.subtitle} link={item.link} img={item.img} />
                    )
                })}
            </div>
        </motion.div>
    )
}

export default Activities
