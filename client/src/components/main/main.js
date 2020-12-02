import React from 'react';
import {graphql} from 'react-apollo';
import {getStudentQuery} from "../../queries/loginqueries";

function Main (props) {


    function displayUserData() {
        const {student} = props.data

        return (
            <div>
<p>Name:{student.name}</p>
<p>Event:{student.event}</p>
<p>School Id:{student.school.id}</p>
<p>School Name:{student.school.name}</p>

            </div>
        )

    }

        return (
            <div>
                   {displayUserData()}

            </div>
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
})(Main)

