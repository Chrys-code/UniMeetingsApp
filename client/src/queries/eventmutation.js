import {gql} from 'apollo-boost';

const addUserDate = gql`
mutation($id: ID, $date: String){
    addUserDate(id: $id, date: $date) {
            name
            userDate
    }
}
`

export {addUserDate};