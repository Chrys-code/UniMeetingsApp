import React from 'react';
// Server Data
import {graphql} from 'react-apollo';
import {getStudentQuery, getSchoolOfStudentQuery} from "../../queries/loginqueries";
import {flowRight as compose} from 'lodash';
// Local Data
import UserContext from '../../userData/userData';

// Higher Order Component React.Context API
// Loading UserData to React.ContextProvider before seeing the app

function Main (props) {

    const { getStudentQuery, getSchoolOfStudentQuery, children } = props;

        return (
            <UserContext.Provider value={{ user: getStudentQuery, school: getSchoolOfStudentQuery}}>
                {getStudentQuery.loading || getSchoolOfStudentQuery.loading ? <div>Loading page...</div> : children}
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



