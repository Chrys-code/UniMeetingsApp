import React from 'react'
import './meetingsStyle.scss';
import {motion} from 'framer-motion'

function Meetings(props) {
    const {variants, transition} = props;

    return (
        <motion.div initial="initial" animate="visible" exit="hidden" variants={variants} transition={transition} className="meetings" >
                <h1>Hi Im meetings page</h1>
        </motion.div>

                )
}

export default Meetings
