const graphql = require('graphql');
// Using lodash to search though JSON object
const _ = require('lodash');

// Importing json object from another file for now
const db = require('../database/database');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
} = graphql;

const TitleType = new GraphQLObjectType({
  name: 'Title',
  fields: () => ({
    Id: { type: GraphQLID },
    Name: { type: GraphQLString },
    ShortSynopsis: { type: GraphQLString },
    MediumSynopsis: { type: GraphQLString },
    LongSynopsis: { type: GraphQLString },
    KeyArtUrl: { type: GraphQLString },
    MasterArtUrl: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    row: {
      type: GraphQLList(TitleType),
      args: { row: { type: GraphQLString } },
      resolve(parent, args) {
        return _.filter(db, { [args.row]: true });
      },
    },
    title: {
      type: TitleType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // Need to fix args.id coming though as a string
        return _.find(db, { Id: _.toInteger(args.id) });
      },
    },
    titles: {
      type: GraphQLList(TitleType),
      resolve() {
        return db;
      },
    },
    // Not complete yet, returning only for full name
    titleSearch: {
      type: GraphQLList(TitleType),
      args: { name: { type: GraphQLString } },
      resolve(parent, args) {
        return _.filter(db, { Name: args.name });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
