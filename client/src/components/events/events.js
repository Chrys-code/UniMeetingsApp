import React from 'react'
import './eventsStyle.scss';
import {motion} from 'framer-motion';

function Events(props) {
    const {variants, transition} = props;
    
    return (
        <motion.div initial="initial" animate="visible" exit="hidden" variants={variants} transition={transition} className="events">
            <div className="events_container">
                <div className="events_title">
                    <h3>Travel & Event Information</h3>
                    <p>Please provide date of your last event.</p>
                </div>


                <div className="events_lead">
                    <p>When was the last time you:</p> 
                    <ul>
                        <li>Went out</li>
                        <li>Traveled</li>
                        <li>Participated on an event</li>
                    </ul>
                </div>


                <form>
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

                    <button>Send</button>

                </form>
            </div>
        </motion.div>
    )
}

export default Events
