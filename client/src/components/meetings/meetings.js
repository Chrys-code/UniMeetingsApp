import React, {useState, useContext, useEffect} from 'react'
import './meetingsStyle.scss';
import { parseISO } from "date-fns";
import Datefunction from "../../utils/date";
// Page Transition
import {motion} from 'framer-motion'
// Local
import UserContext from '../../userData/userData';

function Meetings(props) {

        const {variants, transition} = props;
        // State
        const [year, setYear] = useState('2020'); // format yyyy-mm-dd
        const [day, setDays] = useState('01');
        const [month, setMonth] = useState('01');
        const [place, setPlace] = useState('');

        // Display Purposes
        const [searchList, setSearchList] = useState([]); // initial list
        const [listOfStudents, setListOfStudents] = useState([]); // what user see when they are searching
        const [invitedStudents, setInvitedStudents] = useState([]); // what users added to event participants
        // Server - Data purposes
        const [creatorStudent, setCreatorStudent] = useState({}); // event creator id
        const [invitedStudentsId, setInvitedStudentsId] = useState([]);  // participants id array
        // Loading handler
        const [isLoading, setLoading] = useState(false);
        //Local Data for mutation
        const userData = useContext(UserContext);
        const students = userData.school.school.students
        const id = userData.user.student.id
        const name = userData.user.student.name;

        
        //////////////////////////
        // Page content 
        // format yyyy-mm-dd
        //////////////////////////
        const days = ['01', '02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31']
        const months = ['01','02','03','04','05','06','07','08','09','10','11','12']
        const years = ['2020','2021']
    

        //////////////////////////
        // initialize state with userContext
        //////////////////////////
        useEffect(() => {
                setCreatorStudent({_id: id, name: name})
                invitedStudentsId.push({_id: id, name: name, accepted: true})
                setInvitedStudentsId(invitedStudentsId)
        }, [id, name])

        // Remove current user from list
        useEffect(() => {
                let withoutUser = students.filter((x)=> x.id !== creatorStudent._id)
                setSearchList(withoutUser)
        }, [students, creatorStudent])



        //////////////////////////
        // Send data to the server on event creation
        //////////////////////////

        async function onCreateEvent() {
            setLoading(true)
             await fetch("/userevent/createEvent", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                creator: creatorStudent,
                location: place,
                date: `${year}-${month}-${day}`,
                students: invitedStudentsId,
             }),
            })
              .then((res) => res.json())
              .then((json) => {
                if (json.success) {
                  setLoading(false);
                } else {
                  setLoading(false);
                }  
              });
          }
      


    //////////////////////////
    // Trusted events (input)
    //////////////////////////

    function yearInputHandler(e) {
        setYear(e.target.value);
    }

    function monthInputHandler(e) {
        setMonth(e.target.value);
    }

    function dayInputHandler(e) {
        setDays(e.target.value);
    }

    function placeInputHandler(e) {
        setPlace(e.target.value);
    }

    function searchStudentHandler(e) {
            if(e.target.value === "" || e.target.value == null) {
                setListOfStudents([]);
            } else {
                let list =  searchList.filter((x)=> x.name.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1 )
                setListOfStudents(list);
       
            }
    }

    function addStudent(e, student) {
        e.preventDefault();

        // prevent student being added twice to the invite list
        const index = invitedStudents.indexOf(student);
        if(index > -1) {
                return
        } else {
                // set ids for data exchange with server
                invitedStudentsId.push({_id: student.id, name: student.name})
                setInvitedStudentsId(invitedStudentsId)
                // Add students to list
                invitedStudents.push(student)
                setInvitedStudents(invitedStudents)
                // Once student is added it should be removed from search list and
                // from listed students
                var indexOfStudent = invitedStudents.indexOf(student);
                var restOfStudents = listOfStudents.splice(indexOfStudent, 0)
                setListOfStudents(restOfStudents);
                setSearchList(searchList.splice(indexOfStudent, 0))
                // This requires student being added again after removeing from invite list 
        }

    }

    function removeStudent(e, student) {
        e.preventDefault();


        // remove ids for data exchange with server
        const idIndex = invitedStudentsId.indexOf({_id: student.id, name: student.name})
        const remainingStudentIds = invitedStudentsId.splice(idIndex, 0);
        setInvitedStudentsId(remainingStudentIds)

        // Remove from lists
        const index = invitedStudents.indexOf(student)
        const studentsWithoutRemoved = invitedStudents.splice(index, 0)
        setInvitedStudents(studentsWithoutRemoved)

        // Add back to searchlist once student is removed from invite list
        searchList.push(student)
        setSearchList(searchList)
    }           


    function formHandler(e) {
        e.preventDefault();

        if(invitedStudentsId.length === 1) {
            return
        } else {
            //fire event
            setLoading(true);
            onCreateEvent();

            //cleanup (non visual data)
            // back to single student (creator)
            invitedStudentsId.filter((x) => x._id === creatorStudent._id);
            setInvitedStudentsId(invitedStudentsId)
            // reset listing
            setListOfStudents([])
            setInvitedStudents([])
        }


    }


    return (
        <motion.div initial="initial" animate="visible" exit="hidden" variants={variants} transition={transition} className="meetings" >
            <div className="meetings_container">
                <div className="meetings_title">
                    <h3>Lists</h3>
                    <p>See the lists of students below:</p>
                </div>

             <form onSubmit={(e)=>formHandler(e)}>
             <div className="meetings_details">
                <p>Provide date & location</p>
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
                <p>Provide address or place name</p>
                <div className="field">
                   <div className="field_icon">
                        <img src={require('../../Assets/Login/lockmail.png').default} alt="" />
                   </div>
                   <input name="place" type="text" placeholder="Address or place name" onChange={(e)=>placeInputHandler(e)} />
                </div>
             </div>


                <div className="participant_list">
                   <p>Student:<span>Last event:</span></p> 
                   <ul>
                        {invitedStudents && invitedStudents.map(student =>{

                                 let color;
                             
                                 let d1 = Date.now();
                                 let d2 ;
                                 student.event == null ? d2 = parseISO(student.userDate) : d2 = parseISO(student.event.date)
                                 let daysDiff = Math.floor(((((d1 - d2)/1000)/60)/60)/24);
                        
                                 daysDiff < 14
                                 ? daysDiff < 7 
                                     ? color='red'
                                     : color='orange'
                                 : color='green'    

                                return(
                                        <li style={{"--color": color}} key={student.name}><p>{student.name}</p><span>{student.userDate === "" || student.event == null ? "--" : <Datefunction dateString={student.event.date} /> }</span>
                                        <button className="remove-btn" onClick={(e)=>removeStudent(e, student)} > - </button>
                                     </li>
                                )
                        })}
                   </ul>
                </div>

                <div className="search_students participant_list">
                   <div className="field">
                      <div className="field_icon">
                         <img src={require('../../Assets/Meetings/students.png').default} alt="" />
                      </div>
                      <input type="text" name="student" placeholder="Search for student..." onChange={(e)=>searchStudentHandler(e)} />
                   </div>

                   <ul>
                           {listOfStudents.map(student => {
                                    let color;
                             
                                        let d1 = Date.now();
                                        let d2 ;
                                        student.event == null ? d2 = parseISO(student.userDate) : d2 = parseISO(student.event.date)
                                        let daysDiff = Math.floor(((((d1 - d2)/1000)/60)/60)/24);
                         
                                        daysDiff < 14
                                        ? daysDiff < 7 
                                            ? color='red'
                                            : color='orange'
                                        : color='green'    
                                     
                                return (
                                    <li style={{"--color": color}} key={student.name}><p>{student.name}</p><span>{student.userDate === "" || student.event == null ? "--" : <Datefunction dateString={student.event.date} /> }</span>
                                        <button  className="add-btn" style={{color: '#6BA46A', boxShadow: '4px 2px 10px #6BA46A'}} onClick={(e)=>addStudent(e, student)}> + </button>
                                    </li>              
                                )
                           })}
                   </ul>
                </div>

                   {isLoading ? <div>Loading ...</div> : <button type="submit">Send</button>}
                </form>
            </div>
        </motion.div>

                )
}

export default Meetings
