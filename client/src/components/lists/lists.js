import React, {useState, useEffect} from 'react'
import './listsStyle.scss';
// Local Data
// Page Transition
import {motion} from 'framer-motion'
//Components
import Filter from "./filter";


function Lists(props) {
    // Props
    const {variants, transition} = props;
    // State
    const [order, setOrder] = useState('name')
    const [filter, setFilter] = useState('all');

    ///////////////////////////
    // Trusted events (input)
    //////////////////////////

    function sortStudents(e) {
        e.preventDefault();
        setOrder(e.target.value);
    }

    function filterStudents(e) {
        e.preventDefault();
        setFilter(e.target.value);
    }

    ///////////////////////////
    // Component will unmount events
    //////////////////////////

    useEffect(() => {
        return () => {
            setOrder('name')
            setFilter('all')
        }
    }, [])


    return (
        <motion.div initial="initial" animate="visible" exit="hidden" variants={variants} transition={transition}  className="lists">
            <div className="lists_container">
                <div className="lists_title">
                    <h3>Lists</h3>
                    <p>See the lists of students below:</p>
                </div>

                <p>Filter By:</p>
                <select onChange={(e)=>filterStudents(e)}>
                <option value="all" >All</option>
                <option value="15" >Green</option>
                <option value="14">Orange</option>
                <option value="7">Red</option>
                </select>

                <p>Order By:</p>
                <select onChange={(e)=>sortStudents(e)}>
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

