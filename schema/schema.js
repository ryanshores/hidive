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

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
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
        // return _.filter(db, { Name: args.name });
        // return db.filter(title => _.find(title, { Name: args.name }));
        return db.filter(title => title.Name.toLowerCase().indexOf(args.name.toLowerCase()) !== -1);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
