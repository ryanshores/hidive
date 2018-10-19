// Require packages
const express = require('express');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');

// Server variables
const app = express();
const PORT = process.env.port || 4000;

// My inports
const schema = require('./schema/schema');

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
