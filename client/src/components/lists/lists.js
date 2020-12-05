import React, {useState, useEffect} from 'react'
import './listsStyle.scss';
import Filter from "./filter";
// Local Data
// Page Transition
import {motion} from 'framer-motion'


function Lists(props) {
    const {variants, transition} = props;

    const [order, setOrder] = useState(null)
    const [filter, setFilter] = useState(null);

    function sortStudents(e) {
        e.preventDefault();
        setOrder(e.target.value);
    }

    function filterStudents(e) {
        e.preventDefault();
        setFilter(e.target.value);
    }

    useEffect(() => {
        return () => {
            setOrder('')
            setFilter(0)
        }
    }, [])


    return (
        <motion.div initial="initial" animate="visible" exit="hidden" variants={variants} transition={transition}  className="lists">
            <div className="lists_container">
                <div className="lists_title">
                    <h3>Lists</h3>
                    <p>See the lists of students below:</p>
                </div>

                <select onChange={(e)=>filterStudents(e)}>
                <option value="all" >Filter</option>
                <option value="14" >Green</option>
                <option value="11">Orange</option>
                <option value="7">Red</option>
                </select>

                <select onChange={(e)=>sortStudents(e)}>
                <option >Order By</option>
                <option value="name" >Name</option>
                <option value="status">Last event</option>
                </select>

                <ul className="student_list">
                <li>Student:  <span>Last event:</span></li>
                <Filter order={order} filter={filter} />
                </ul>
            </div>
        </motion.div>
    )
}

export default Lists

