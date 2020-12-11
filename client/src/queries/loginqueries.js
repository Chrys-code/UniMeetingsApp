
import {gql} from 'apollo-boost';

// data about user school for the application

// Login: load schools to chose
const getSchoolsQuery = gql`
query{
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

export {getSchoolsQuery, getStudentQuery};