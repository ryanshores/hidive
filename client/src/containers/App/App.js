import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import './App.css';

import Header from '../../components/Header/Header';
import Trial from '../../components/Trial/Trial';
import Banner from '../../components/Banner/Banner';
import Home from '../Home/Home';

// apollo client setup
const client = new ApolloClient({
  cache: new InMemoryCache(),
});

const App = () => (
  <ApolloProvider client={client}>
    <Router className="Router">
      <div className="App">
        <Header />
        <div className="container-fluid">
          <div className="content">
            <Trial />
            <Banner />
            <Route path="/" component={Home} />
          </div>
        </div>
      </div>
    </Router>
  </ApolloProvider>
);

export default App;
