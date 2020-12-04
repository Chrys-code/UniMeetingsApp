import React from 'react'
import './meetingsStyle.scss';
import {motion} from 'framer-motion'

function Meetings(props) {

    const {variants, transition} = props;

    return (
        <motion.div initial="initial" animate="visible" exit="hidden" variants={variants} transition={transition} className="meetings" >
            <div className="meetings_container">
                <div className="meetings_title">
                    <h3>Lists</h3>
                    <p>See the lists of students below:</p>
                </div>
                <form>

                <div className="meetings_details">
                    <p>Provide date & location</p>
                        <span>Day:</span>{" "}<br/>
                        <select>
                                <option>2020</option> 
                        </select> {" "}<br/>

                        <span>Month:</span>{" "}<br/>
                        <select> 
                                <option>1</option>
                        </select>{" "}<br/> 

                        <span>Year:</span>{" "}<br/>
                        <select>
                                <option>2020</option>
                        </select>{" "}<br/>

                        <p>Provide address or place name</p>

                        <div className="field">
                                <div className="field_icon">
                                        <img src={require('../../Assets/Login/lockmail.png').default} alt="" />
                                </div>
                                <input name="place" type="text" placeholder="Address or place name" />
                        </div>
                </div>


                <div className="participant_list">
                <p>Student:<span>Last event:</span></p> 

                        <ul>

                        <li><p>Example Student</p><span>3 days ago</span>
                        <button className="remove-btn"> - </button>
                        </li>

                        <li><p>Example Student</p><span>3 days ago</span>
                        <button className="remove-btn"> - </button>
                        </li>
                        </ul>
                </div>

                <div className="search_students participant_list">
                <div className="field">
                        <div className="field_icon">
                                <img src={require('../../Assets/Meetings/students.png').default} alt="" />
                        </div>
                        <input type="text" name="student" placeholder="Search for student..." />
                </div>
                <ul>

                <li><p>Example Student</p><span>3 days ago</span>
                <button className="add-btn" style={{color: '#6BA46A', boxShadow: '4px 2px 10px #6BA46A'}}> + </button>
                </li>

                <li><p>Example Student</p><span>3 days ago</span>
                <button className="add-btn" style={{color: '#6BA46A', boxShadow: '4px 2px 10px #6BA46A'}}> + </button>
                </li>
                </ul>
                </div>

                <button type="submit">Send</button>
                </form>

            </div>
        </motion.div>

                )
}

export default Meetings
