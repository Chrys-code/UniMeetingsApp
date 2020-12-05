import React, {useState, useContext, useEffect } from 'react'
import './eventsStyle.scss';
//Page transition
import {motion} from 'framer-motion';
// Server 
import {useMutation} from "react-apollo";
import {addUserDate} from "../../queries/eventmutation"; 
// Local
import UserContext from '../../userData/userData';

function Events(props) {
    //Props
    const {variants, transition} = props;
    // State
    const [date, setDate] = useState(''); // format yyyy-mm-dd
    const [year, setYear] = useState(2020); 
    const [day, setDays] = useState(1);
    const [month, setMonth] = useState(1);
    const [isLoading, setLoading] = useState(false);
    // Mutation
    const [addDate, {data}] = useMutation(addUserDate)
    //Local Data for mutation
    const userData = useContext(UserContext);
    const id = userData.user.student.id;

    //////////////////////////
    // Mutation
    //////////////////////////

    useEffect(() => {
        addDate({variables: {id: id, date: date }})
    }, [date, id, addDate])
    // Set loading false upon getting the data back
    if(data) {
        setTimeout(()=> {
            setLoading(false);
        }, 1000)
    }


    //////////////////////////
    // Page content
    //////////////////////////

    const days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30, 31]
    const months = [1,2,3,4,5,6,7,8,9,10,11,12]
    const years = [2020,2021]


    //////////////////////////
    // Trusted events (input)
    //////////////////////////

    function yearInputHandler(e) {
        setYear(e.target.value)
    }

    function monthInputHandler(e) {
        setMonth(e.target.value)
    }

    function dayInputHandler(e) {
        setDays(e.target.value)
    }

    function formHandler(e) {
        setLoading(true);
        e.preventDefault();
            setDate(`${year}-${month}-${day}`)
        
    }

    
    //////////////////////////
    // Render Fn
    //////////////////////////

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


                <form onSubmit={(e)=>formHandler(e)}>
                    <span>Year:</span>{" "}<br/>
                    <select onChange={(e)=>yearInputHandler(e)}>
                    {years.map(year=>{ return(
                            <option key={year} value={year}>{year}</option>
                        )})}
                    </select> {" "}<br/>

                    <span>Month:</span>{" "}<br/>
                    <select onChange={(e)=>monthInputHandler(e)}> 
                        {months.map(month=>{ return(
                            <option key={month} value={month}>{month}</option>
                        )})}
                    </select>{" "}<br/> 

                    <span>Day:</span>{" "}<br/>
                    <select onChange={(e)=>dayInputHandler(e)}>
                        {days.map(day=>{ return(
                            <option key={day} value={day}>{day}</option>
                        )})}
                    </select>{" "}<br/>


                    {isLoading  ? <div>Loading...</div> : <button type="submit">Send</button>}
                </form>
            </div>
        </motion.div>
    )
}

export default Events
