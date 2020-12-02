import React from 'react';

//Server
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';

//Components
import Login from "./components/login/login";
import Navbar from "./components/navbar/navbar";

// Apollo client
const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql'
})


// App
function App() {
  return (
    <ApolloProvider client={client} >
    <div className="App">
    <Navbar />

    <Login />
    </div>
    </ApolloProvider>
  );
}

export default App;
