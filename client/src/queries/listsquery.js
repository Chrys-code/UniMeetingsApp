import {gql} from 'apollo-boost';

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
                id
                date
              }
            }
    }
}
`
export {getSchoolOfStudentQuery};