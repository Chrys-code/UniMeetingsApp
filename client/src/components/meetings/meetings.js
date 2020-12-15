import React, {useState, useContext, useEffect} from 'react'
import './meetingsStyle.scss';
import Dateandplace from "./dateandplace";
import Listings from "./listings";

// Page Transition
import {motion} from 'framer-motion'
// Local
import UserContext from '../../userData/userData';

        // forceUpdate hook
        // for some reason after refactoring I could get React to re render child or even component itself
        // created a custom hook for forceloading the page
        function useForceUpdate(){
            const [value, setValue] = useState(0); 
            return () => setValue(value => ++value); 
        }

function Meetings(props) {

        const {variants, transition} = props;
        // State
        const [year, setYear] = useState('Year'); // format yyyy-mm-dd
        const [day, setDays] = useState('Day');
        const [month, setMonth] = useState('Month');
        const [place, setPlace] = useState('');
        const [buttonLabel, setButtonLabel] = useState('Send')

        // Display Purposes
        const [searchList, setSearchList] = useState([]); // initial list to search from
        const [listedStudents, setListedStudents] = useState([]) // search results visible list
        const [invitedStudents, setInvitedStudents] = useState([]); // what user see when they are searching
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
        //Assign forceupdate hook
        const forceUpdate = useForceUpdate();

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
             await fetch("/userevent/createevent", {
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
                  setButtonLabel('Event created!')
                 setTimeout(()=>{
                    setButtonLabel('Send')
                }, 4000)
        
                } else {
                    setButtonLabel("Event already exist")
                  setLoading(false);
                }  
              });
          }
      


    //////////////////////////
    // Trusted events (input)
    //////////////////////////
    // Date
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

    //////////////////////////
    // Trusted events (input)
    //////////////////////////
    // Invitation list
    //////////////////////////

    function searchStudentHandler(e) {
        let list = searchList.filter((x)=> x.name.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1 )
        setListedStudents(list);
    }

    function addStudent(e, student) {
        e.preventDefault();
        // prevent student being added twice to the invite list
        const index = invitedStudents.indexOf(student);
        if(index > -1) {
                return
        } else {
        // ADD TO INVITES
            // set ids for data exchange with server
            invitedStudentsId.push({_id: student.id, name: student.name})
            setInvitedStudentsId(invitedStudentsId)
            // Add students to visible list (user can remove from here)
            invitedStudents.push(student);
            setInvitedStudents(invitedStudents)
            
        // REMOVE FROM CURRENT SEARCH
            const indexCurr = listedStudents.indexOf(student)
            if (indexCurr > -1) {
                listedStudents.splice(indexCurr, 1);
                setListedStudents(listedStudents)
            }


        // REMOVE FROM SEARCHABLE ITEMS
            const indexList = searchList.indexOf(student)
            if (indexList > -1) {
                searchList.splice(indexList, 1)
                setSearchList(searchList)
           }
        }
        forceUpdate();
    }

    function removeStudent(e, student) {
        e.preventDefault();
    // REMOVE
        // remove ids for data exchange with server
        const idIndex = invitedStudentsId.indexOf({_id: student.id, name: student.name})
        const remainingStudentIds = invitedStudentsId.splice(idIndex, 1);
        setInvitedStudentsId(remainingStudentIds)

        // Remove from lists
        const studentsWithoutRemoved = invitedStudents.filter(x => x.id !== student.id)
        setInvitedStudents(studentsWithoutRemoved)
        console.log(studentsWithoutRemoved)


    // ADD
        // prevent student being added twice to the search list
        const searchIndex = searchList.indexOf(student);
        if(searchIndex > -1) {
                return
        } else {
        // Add back to searchlist once student is removed from invite list
        searchList.push(student)
        setSearchList(searchList)
        }
        forceUpdate();
    }           


    function formHandler(e) {
        e.preventDefault();
        if (year === 'Year' || day === 'Day' || month === 'Month') {
            setLoading(false);
            setButtonLabel('Invalid date');
            setTimeout(()=>{
                setButtonLabel('Send')
            }, 4000)
            return
        }
        if (place === null || place === undefined || place === "" ) {
            setLoading(false);
            setButtonLabel('Provide place');
            setTimeout(()=>{
                setButtonLabel('Send')
            }, 4000)

            return
        }
        if(invitedStudentsId.length === 1 || 0) {
            setLoading(false);
            setButtonLabel('Invite others');
            setTimeout(()=>{
                setButtonLabel('Send')
            }, 4000)

            return
        } 
            //fire event
            setLoading(true);
            onCreateEvent();

            //cleanup (non visual data)
            // back to single student (creator)
            invitedStudentsId.filter((x) => x._id === creatorStudent._id);
            setInvitedStudentsId(invitedStudentsId)
            // reset listing
            setInvitedStudents([])
        
    }


    const buttonStyle = {
        color: buttonLabel === 'Send' || 'Event created!' ? '#6ba46a'  : '#FF6E79',
        boxShadow: buttonLabel === 'Send' || 'Event created!' ?  '4px 2px 10px #6ba46a' : '4px 2px 10px #FF6E79'
    }


    return (
        <motion.div initial="initial" animate="visible" exit="hidden" variants={variants} transition={transition} className="meetings" >
            <div className="meetings_container">
                <div className="meetings_title">
                    <h3>Meeting</h3>
                    <p>Invite others for a meeting</p>
                </div>

             <form onSubmit={(e)=>formHandler(e)}>
             <Dateandplace inputHandlers={{ yearInputHandler, monthInputHandler, dayInputHandler, placeInputHandler}} inputValue={{year, day, month}} />


            <Listings functions={{addStudent, removeStudent, searchStudentHandler}} states={{listedStudents, invitedStudents}}/>

                        {isLoading ?  <button type="submit">Loading ...</button> : <button type="submit" style={buttonStyle}>{buttonLabel}</button>}
                </form>
            </div>
        </motion.div>

                )
}

export default Meetings
