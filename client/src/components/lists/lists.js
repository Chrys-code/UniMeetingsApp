import React, {useContext}from 'react'
import './listsStyle.scss';
import Datefunction from "../../utils/date";
// Local Data
import UserContext from '../../userData/userData';
// Page Transition
import {motion} from 'framer-motion'


function Lists(props) {
    const {variants, transition} = props;

    const userData = useContext(UserContext);
    const school = userData.school.school

    return (
        <motion.div initial="initial" animate="visible" exit="hidden" variants={variants} transition={transition}  className="lists">
            <div className="lists_container">
                <div className="lists_title">
                    <h3>Lists</h3>
                    <p>See the lists of students below:</p>
                </div>
                <select>
                    <option>Order By</option>
                </select>

                <ul className="student_list">
                <li>Student:  <span>Last event:</span></li>

                    {school.students.map((student)=> {
                        return(
                        <li key={student.name}>{student.name}  <span>{student.event == null ? "--" : <Datefunction dateString={student.event.date} /> }</span></li>
                        )
                    })}
                </ul>
            </div>
        </motion.div>
    )
}

export default Lists

