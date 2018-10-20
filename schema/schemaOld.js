const graphql = require('graphql');
// Using lodash to search though JSON object
const _ = require('lodash');

// Importing json object from another file for now
const db = require('../database/dashboard');

const titleRows = db.Data.TitleRows;

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLInt,
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

const TitleRowType = new GraphQLObjectType({
  name: 'TitleRow',
  fields: () => ({
    Name: { type: GraphQLString },
    Titles: {
      type: new GraphQLList(TitleType),
      args: { number: { type: GraphQLInt } },
      resolve(parent, args) {
        return parent.Titles;
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    row: {
      type: TitleRowType,
      args: { row: { type: GraphQLString } },
      resolve(parent, args) {
        return _.find(titleRows, { Name: args.row });
      },
    },
    title: {
      type: TitleType,
      args: {
        row: { type: GraphQLString },
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        const row = _.find(titleRows, { Name: args.row });
        return _.find(row.Titles, { Id: args.id });
      },
    },
    titles: {
      type: TitleType,
      args: {},
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
