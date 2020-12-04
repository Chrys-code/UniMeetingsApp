import React from 'react'
import './listsStyle.scss';
import {motion} from 'framer-motion'

function Lists(props) {
    const {variants, transition} = props;
    return (
        <motion.div initial="initial" animate="visible" exit="hidden" variants={variants} transition={transition}  className="lists">
                     <h1>HI IM LISTS</h1>
        </motion.div>
    )
}

export default Lists
