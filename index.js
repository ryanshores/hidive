// Require packages
require('dotenv').config();
const express = require('express');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
const path = require('path');

// Server variables
const app = express();
const PORT = process.env.PORT || 4000;

// Imports
const schema = require('./schema/schema');
const db = require('./database/database');

if (process.env.NODE_ENV === 'dev') {
  // Exposes the entire db object for dev
  app.get('/', (req, res) => res.json(db));
}

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}


// Using cors to allow for the client side to make cross origin requests
app.use(cors());

// This sets up the grapgql server to provide API access to the schema
app.use('/graphql', graphqlHTTP({
  schema,
  // This allows front end to see the server functions easily
  // Checkout http://localhost:4000/graohql
  graphiql: true,
}));

app.listen(PORT, () => console.log(`Server is started on port: ${PORT}`));
