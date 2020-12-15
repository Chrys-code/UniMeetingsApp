import React from 'react'
import { parseISO } from "date-fns";
import Datefunction from "../../utils/date";


function Listings(props) {
    const {functions, states} = props;
    const {removeStudent, addStudent, searchStudentHandler}  = functions;
    const {listedStudents, invitedStudents} = states;

    return (
        <>
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
                                        <li style={{"--color": color}} key={student.id}><p>{student.name}</p><span>{student.userDate === "" || student.event == null ? "--" : <Datefunction dateString={student.event.date} /> }</span>
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
                           {listedStudents && listedStudents.map(student => {
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
                                    <li style={{"--color": color}} key={student.id}><p>{student.name}</p><span>{student.userDate === "" || student.event == null ? "--" : <Datefunction dateString={student.event.date} /> }</span>
                                        <button  className="add-btn" style={{color: '#6BA46A', boxShadow: '4px 2px 10px #6BA46A'}} onClick={(e)=>addStudent(e, student)}> + </button>
                                    </li>              
                                )
                           })}
                   </ul>
                </div>
        </>
    )
}

export default Listings
