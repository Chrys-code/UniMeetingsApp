import React, {useState, useContext, useEffect} from 'react'
import Datefunction from "../../utils/date";
import { parseISO } from "date-fns";

// Local Data
import UserContext from '../../userData/userData';


function Filter(props) {

    //Props
    const {order, filter} = props;
    //Local Data
    const userData = useContext(UserContext);
    const students = userData.school.school.students
    //State
    const [isLoading, setIsLoading] = useState(true);
    const [filterStudents, setFilterStudents] = useState([]);
    const [orderedStudents, setOrderedStudents] = useState([]);


    /////////////////////////
    // Filter Students 
    /////////////////////////
    useEffect(() => {

        //write a function that replaces user.event.date with user.userDate
        // if user.event.date == null && user.userDate
        // return a new list & pass as new students list instad of original students list

        // Initial
        if(filter == null || filter == "all") {
            setFilterStudents(students)
            setTimeout(()=> {
                setIsLoading(false);
            }, 500)
            return
        }

        // User filters by status (green, orange, red)
        // status depends on days spent since last event (in display, see render Fn)
        // event.date - current.date = days spent since last event
        //  x < 7 days = red 
        //  7 < x < 14 days = orange 
        //  14 < x days = green
        // event.date == null = green 
        let d1 = Date.now();
        let filterMin = 0 ;

        // Since the function will return an interval min-max filter required
        if(filter == 7) {
            filterMin = 0
        } else if (filter == 14) {
            filterMin = 7
        } else if (filter == 15){
            filterMin = 14
        }

        // Get students with event dates
        let studentsWithEvents = students.filter((x) => x.event);

        // Filter students with events regarding the chosen values
        let filteredStudents = studentsWithEvents.filter((x) =>  (Math.floor((d1 - parseISO(x.event.date))/1000/60/60/24) > filterMin) && (Math.floor((d1 - parseISO(x.event.date))/1000/60/60/24) <= filter) );
    
        // No need of a max value to search for green status
        if(filter == 15) {
            filteredStudents = studentsWithEvents.filter((x) =>  Math.floor((d1 - parseISO(x.event.date))/1000/60/60/24) > filterMin);
        }

        //Push students with no initial event to the end of the list only if green status is chosen
        if(filteredStudents != null && filter == 15) {
            let studentsWithOutEvents = students.filter((x) => x.event == null);
            filteredStudents.push(...studentsWithOutEvents);
        }

        // Set results
        setFilterStudents(filteredStudents);
        setTimeout(()=> {
            setIsLoading(false);
        }, 500)

        // Delete filtering uponleaving the page
        return () => {
            setFilterStudents([])
        }
    }, [filter, students])


    /////////////////////////
    // Order Students
    // (on filteredStudens)
    /////////////////////////
    useEffect(() => {

        if(order == "name") {
            let sortedByName = filterStudents.sort((a, b) => a.name > b.name? 1:-1);
            console.log(sortedByName)
            //set state
            setOrderedStudents(sortedByName);
        }

        // Remember filtering for green status will push those of event=null students as well
        if(order == "status") {
            // with events
            let studentsWithEvents = filterStudents.filter((x) => x.event);
            // without events
            let studentsWithOutEvents = filterStudents.filter((x) => x.event == null);
            // sort students with events
            let orderByStatus = studentsWithEvents.sort((a, b) => parseISO(b.event.date) - parseISO(a.event.date));
            // Push students without events
            orderByStatus.push(...studentsWithOutEvents)
            // Set state
            setOrderedStudents(orderByStatus);
        }

    }, [filterStudents, order, filter])



    /////////////////////////
    // Render students (based on order)
    // Assign status colors by populating css
    /////////////////////////

    return (<>
    
                {isLoading ? 
                <div>Loading Students ...</div> 
                :orderedStudents&&orderedStudents.map(student => {
                    let color = "red";

                    if(student.event) {
                        let d1 = Date.now();
                        let d2 = parseISO(student.event.date)
                        let daysDiff = Math.floor(((((d1 - d2)/1000)/60)/60)/24);

                        daysDiff < 14
                        ? daysDiff < 7 
                            ? color='red'
                            : color='orange'
                        : color='green'    
                    } else {
                        // for students with no event.date
                        color = 'green'
                    }

                    return <li  style={{"--color": color}} key={student.name}>{student.name}  <span>{student.event == null ? "--" : <Datefunction dateString={student.event.date} /> }</span></li>
                })}

       </>)
}

export default Filter
