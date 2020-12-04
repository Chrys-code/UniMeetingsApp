import React from 'react';
// Server Data
import {graphql} from 'react-apollo';
import {getStudentQuery} from "../../queries/loginqueries";
// Local Data
import UserContext from '../../userData/userData';

// Higher Order Component
// Loading UserData to React.ContextProvider

// GraphQL subscription instead of a signle query would allow the app strictly updating data any time
// Causing any consumer page to re-render during usage

function Main (props) {

    const { data, children } = props;

        return (
            <UserContext.Provider value={{...data}}>
                {data.loading ? <div>Loading page...</div> : children}
            </UserContext.Provider>
        )
    }

export default graphql(getStudentQuery, {
    options: (props)=>{
        return {
            variables: {
                id: props.id,
            }
        }
    }
}) (Main)



