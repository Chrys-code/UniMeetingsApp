import {gql} from 'apollo-boost';

const getSchoolOfStudentQuery = gql`
query($id: ID){
    school(id: $id) {
            name
            students {
                name
              event {
                date
              }
            }
    }
}
`

export {getSchoolOfStudentQuery};