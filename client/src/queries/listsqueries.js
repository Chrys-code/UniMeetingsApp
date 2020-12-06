import {gql} from 'apollo-boost';

const getSchoolOfStudentQuery = gql`
query($id: ID){
    school(id: $id) {
            name
            students {
                name
                userDate
              event {
                date
              }
            }
    }
}
`

export {getSchoolOfStudentQuery};