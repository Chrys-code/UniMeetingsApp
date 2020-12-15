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
    const [year, setYear] = useState('Year');      // format yyyy-mm-dd
    const [day, setDays] = useState('Day');
    const [month, setMonth] = useState('Month');
    // options
    const [yearOpt, setYearOpt] = useState(['2019','2020','2021', '2022'])
    const [dayOpt, setDayOpt] = useState(['01', '02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'])
    const [monthOpt, setMonthOpt] = useState(['01','02','03','04','05','06','07','08','09','10','11','12'])
    // feedback
    const [isLoading, setLoading] = useState(false);
    const [buttonLabel, setButtonLabel] = useState('Send')
    // Mutation
    const [addDate, {data, loading}] = useMutation(addUserDate)
    //Local Data for mutation
    const userData = useContext(UserContext);
    const id = userData.user.student.id;

    // Set loading false upon getting the data back
    useEffect(()=>{
        if(loading) {
            return
        } else {
            setTimeout(()=> {
                setLoading(false);
            }, 1000)
        }
    },[loading])

    useEffect(()=> {
        if(data !== undefined && data !== null) {
            setButtonLabel('Sent!')
        }

        var id = setTimeout(()=>{
            setButtonLabel('Send')
        }, 3000)

        return ()=>{
            clearTimeout(id)
        }
    }, [data])
    

    //////////////////////////
    // Page content
    //////////////////////////
    // This function filters out days
    // Only past days are given
    //////////////////////////


    useEffect(()=>{
        // get date
        const d = new Date();

        setYearOpt(yearOpt.filter(x => x <= d.getFullYear()))  
        if(year === `${d.getFullYear()}`) {
            setMonthOpt(monthOpt.filter(x => x <= (d.getMonth() + 1)))
            if(month === `${(d.getMonth() + 1)}`){
                setDayOpt(dayOpt.filter(x => x <= d.getDate()))

            }
        } else if (year !== `${d.getFullYear()}`) {
            setMonthOpt(['01','02','03','04','05','06','07','08','09','10','11','12'])
            if(month === `${(d.getMonth() + 1)}`){
                setDayOpt(['01', '02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'])

            }

        }
        
    },[year, month, day])


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

        addDate({variables: {id: id, date: `${year}-${month}-${day}` }})

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
                        <option  disabled={year !== "Year" ? true : false }>Year</option>
                    {yearOpt.map(year=>{ return(
                            <option key={year} value={year}>{year}</option>
                        )})}
                    </select> {" "}<br/>

                    <span>Month:</span>{" "}<br/>
                    <select onChange={(e)=>monthInputHandler(e)}> 
                    <option  disabled={month !== "Month" ? true : false }>Month</option>
                        {monthOpt.map(month=>{ return(
                            <option key={month} value={month}>{month}</option>
                        )})}
                    </select>{" "}<br/> 

                    <span>Day:</span>{" "}<br/>
                    <select onChange={(e)=>dayInputHandler(e)}>
                    <option  disabled={day !== "Day" ? true : false }>Day</option>
                        {dayOpt.map(day=>{ return(
                            <option key={day} value={day}>{day}</option>
                        )})}
                    </select>{" "}<br/>


                        {isLoading ? <button type="submit">Loading ...</button> : <button type="submit">{buttonLabel}</button>}
                </form>
            </div>
        </motion.div>
    )
}

export default Events
