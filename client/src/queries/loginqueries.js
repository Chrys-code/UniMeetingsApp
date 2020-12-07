
import {gql} from 'apollo-boost';

// Kickstart data about user and their school for the application
// Mutationqueries are placed within the app

// Login: load schools to chose
const getSchoolsQuery = gql`
 {
    schools {
        id
        name
    }
}
`
// Upon login: Load student and their school
const getStudentQuery = gql`
query($id: ID){
    student(id: $id) {
        id
        name
        userDate
        event {
            id
            location
            date
        }
        school {
            id
            name
        }
    }
}
`

// Based on student id, get school and students within school
const getSchoolOfStudentQuery = gql`
query($id: ID){
    school(id: $id) {
            id
            name
            students {
                id
                name
                userDate
              event {
                date
              }
            }
    }
}
`

export {getSchoolsQuery, getStudentQuery, getSchoolOfStudentQuery};