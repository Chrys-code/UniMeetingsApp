
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
        name
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