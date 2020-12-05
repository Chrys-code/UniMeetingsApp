
import {gql} from 'apollo-boost';


const getSchoolsQuery = gql`
 {
    schools {
        id
        name
    }
}
`

const getStudentQuery = gql`
query($id: ID){
    student(id: $id) {
        id
        name
        userDate
        event {
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