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
  GraphQLBoolean,
} = graphql;

// Title Object - defines what can be returned from title query
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
    IsContinueWatching: { type: GraphQLBoolean },
    IsFavorite: { type: GraphQLBoolean },
    InQueue: { type: GraphQLBoolean },
    isSimulcast: { type: GraphQLBoolean },
    isDubed: { type: GraphQLBoolean },
    isExclusive: { type: GraphQLBoolean },
    isRecent: { type: GraphQLBoolean },
    isTrending: { type: GraphQLBoolean },
    isGaiden: { type: GraphQLBoolean },
    isPopular: { type: GraphQLBoolean },
    ShowInfoTitle: { type: GraphQLString },
    SeasonName: { type: GraphQLString },
    FirstPremiereDate: { type: GraphQLString },
    Rating: { type: GraphQLString },
  }),
});

// Root Object - defines what queries can be requested
// Handles finding the requested object and points to the title object to parse
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    title: {
      type: TitleType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // args.id coming though as a string
        return _.find(db, { Id: _.toInteger(args.id) });
      },
    },
    titles: {
      type: GraphQLList(TitleType),
      resolve() {
        // returns all titles
        return db;
      },
    },
    titleSearch: {
      type: GraphQLList(TitleType),
      args: { name: { type: GraphQLString } },
      resolve(parent, args) {
        // Searches for args.name in title.Name
        return db.filter(title => title.Name.toLowerCase().indexOf(args.name.toLowerCase()) !== -1);
      },
    },
  },
});

// Attaches the RootQuery to GraphQL
module.exports = new GraphQLSchema({
  query: RootQuery,
});
