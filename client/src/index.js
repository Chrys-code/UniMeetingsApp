import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import {BrowserRouter as Router} from 'react-router-dom'


const client = new ApolloClient({
  uri: 'https://unimeetingsapp.herokuapp.com/graphql'
})
// replace uri with localhost if in development mode
// dev: http://localhost:8080/graphql
ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client} >
      <Router>
        <App />
      </Router>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('app')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
