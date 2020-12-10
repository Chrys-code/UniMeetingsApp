import React, {useState, useEffect} from 'react';
// Server Data
import {graphql} from 'react-apollo';
import {getStudentQuery} from "../../queries/loginqueries";
import {getSchoolOfStudentQuery} from "../../queries/listsquery";
import {flowRight as compose} from 'lodash';
// Local Data
import UserContext from '../../userData/userData';

// Higher Order Component React.Context API
// Loading UserData to React.ContextProvider before seeing the app

function Main (props) {

    const { getStudentQuery, getSchoolOfStudentQuery, children } = props;

    const [loading, setLoading] = useState(true)

    useEffect(()=> {
      if  (getStudentQuery.loading === false && getSchoolOfStudentQuery.loading === false) {
          setTimeout(()=> {
              setLoading(false)
          }, 1000)
      }
    }, [getStudentQuery, getSchoolOfStudentQuery])

    return (
            <UserContext.Provider value={{ user: getStudentQuery, school: getSchoolOfStudentQuery}}>
                {loading ? <div className="loader"> <p>Collecting data ...</p> </div> : children}
            </UserContext.Provider>
        )
    }

export default  compose(
    graphql(getStudentQuery, {
        name: 'getStudentQuery',
        options: (props)=>{
            return {
                variables: {
                    id: props.id,
                }
            }
        }
    }),

    graphql(getSchoolOfStudentQuery, {
        name: 'getSchoolOfStudentQuery',
        options: (props)=>{
            return {
                variables: {
                    id: props.schoolId,
                }
            }
        }
    }),


) (Main)



