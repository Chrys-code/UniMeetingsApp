import React from 'react'
import './eventsStyle.scss';
import {motion} from 'framer-motion';

function Events(props) {
    const {variants, transition} = props;
    
    return (
        <motion.div initial="initial" animate="visible" exit="hidden" variants={variants} transition={transition} className="events">
                <h1>Hi Im events page</h1>
        </motion.div>
    )
}

export default Events
