import {gql} from 'apollo-boost';

const addEventMutation = gql`
mutation($creator: creator, $location: location, $date: date, $students: students){
    addEvent(creator: $creator, location:$location, date: $date, students: $students){
      id 
    }
    }
`

/*
mutation($creator: creator, $location: location, $date: date, $students: students){
    addEvent(creator: $creator, location:$location, date: $date, students: $students){
      id
      creator
      location
      date
      students {
        name
      }
    }
    }
*/
export {addEventMutation};