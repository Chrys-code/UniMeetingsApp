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
    const [students, setStudents] = useState([]);
    //State
    const [isLoading, setIsLoading] = useState(true);
    //Filtering
    const [filterStudents, setFilterStudents] = useState([]);
    const [studentsToFilter, setStudentsToFilter] = useState([]);
    const [orderedStudents, setOrderedStudents] = useState([]);


    useEffect(()=>{
        const studentsLocal = userData.school.school.students
       setStudents(studentsLocal)
    },[userData])

    /////////////////////////
    // Preparing filterable students
    /////////////////////////
    // Replace event.date with user
    // given date (in events & travel page)
    /////////////////////////

    useEffect(()=>{

        const replaceDate = () => {
            // Get students with out event date and replace with userDate
            let withOutDate = students.filter((x) => x.event == null);
            withOutDate.forEach(student => {
                const userDate = student.userDate;
                student.event = {date: userDate, location: null}
            }) 
            // filter again for successful ones
            // (Students we want to replace now)
            let withReplacedDate = withOutDate.filter((x) => x.event.date);
    
            // Replace the students with the students with new event.dates on matching index
            withReplacedDate.map(student => {
                const index = students.indexOf(student.name);
                if(index > -1) {
                   return students[index].replace(student)
                }
                return students
            })
    
            setStudentsToFilter(students);
        }
    
       replaceDate();
    }, [students])


    /////////////////////////
    // Filter Students 
    /////////////////////////
    useEffect(() => {


        // Initial
        if(filter == null || filter === "all") {
            setFilterStudents(studentsToFilter)
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
        if(filter === '7') {
            filterMin = 0
        } else if (filter === '14') {
            filterMin = 7
        } else if (filter === '15'){
            filterMin = 14
        }

        //Get all students with date
        let studentsWithdate = studentsToFilter.filter(x=> x.event != null)
        // Filter students with events regarding the chosen values
        let filteredStudents = studentsWithdate.filter((x) =>  (Math.floor((d1 - parseISO(x.event.date))/1000/60/60/24) > filterMin) && (Math.floor((d1 - parseISO(x.event.date))/1000/60/60/24) <= filter) );
        // No need of a max value to search for green status
        if(filter === '15') {
            filteredStudents = studentsWithdate.filter((x) =>  Math.floor((d1 - parseISO(x.event.date))/1000/60/60/24) > filterMin);
        }
        //Push students with no initial date to the end of the list only if red status is chosen
        if(filteredStudents != null && filter === '7') {
        // Students still without any event date 
        let studentsWithOutDate = studentsToFilter.filter(x=> x.event == null || x.event.date === "")
            filteredStudents.push(...studentsWithOutDate);
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
        
    }, [filter, studentsToFilter])


    /////////////////////////
    // Order Students
    // (on filteredStudens)
    /////////////////////////
    useEffect(() => {

        if(order === "name") {
            let sortedByName = filterStudents.sort((a, b) => a.name > b.name? 1:-1);
            //set state
            setOrderedStudents(sortedByName);
        }

        // Remember filtering for green status will push those of event=null students as well (solved)
        if(order === "status") {
            // with events
            let studentsWithEvents = filterStudents.filter((x) => x.event.date !== "");
            // without events
            let studentsWithOutEvents = filterStudents.filter((x) => x.event.date === "");
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
    // Retun the event.date or user.userDate which is the closest to todays date
    /////////////////////////

    return (<>

                {isLoading ? 
                <div>Loading Students ...</div> 
                : orderedStudents && orderedStudents.map(student => {
                    let color = "#FF6E79";  

                    if(student.event) {
                        let d1 = Date.now();
                        let d2 = parseISO(student.event.date)
                        let daysDiff = Math.floor(((((d1 - d2)/1000)/60)/60)/24);
                    
                        daysDiff < 14
                        ? daysDiff < 7 
                            ? color='#FF6E79'
                            : color='#FFA500'
                        : color='#6BA46A' 
                        
                        if(isNaN(daysDiff)){color='#FF6E79'}  // event.date == null => dayDiff return NaN

                    } else {
                        // for students with no event.date
                        color = '#6BA46A'
                    }

                    return <li  style={{"--color": color}} key={student.name}>{student.name}  <span>{student.event.date === "" || student.event == null ? "--" : <Datefunction dateString={(parseISO(student.event.date) - parseISO(student.userDate) > 0 )? student.event.date : student.userDate } /> }</span></li>
                })}

       </>)
}

export default Filter
