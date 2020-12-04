import React from 'react';
// Server Data
import {graphql} from 'react-apollo';
import {getStudentQuery} from "../../queries/loginqueries";
import {getSchoolOfStudentQuery} from "../../queries/listsqueries";
import {flowRight as compose} from 'lodash';
// Local Data
import UserContext from '../../userData/userData';

// Higher Order Component
// Loading UserData to React.ContextProvider

// GraphQL subscription instead of a signle query would allow the app strictly updating data any time
// Causing any consumer page to re-render during usage

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



