const _ = require("lodash");

const oldDb = require('./dashboard');

// return an array of all video objects
const allVideos = oldDb.Data.TitleRows.reduce((accu, next) => {
	return accu.concat(next.Titles);
}, []);

// returns an array of all video objects without duplicates based on id
let newDb = allVideos.reduce((accu, next) => {
	// if next is in accu dont add it to accu
	if(!!_.find(accu, {Id: next.Id})) {
		// is dup: dont return
		return accu;
	} else {
		return accu.concat(next);
	}
}, []);

// Define Arrays to look though
// Simulcasts
const simulcasts = _.find(oldDb.Data.TitleRows, {Name: "Simulcasts"}).Titles.map(simulcast => simulcast.Id);
// Dubs
const dubs = _.find(oldDb.Data.TitleRows, {Name: "Dubs"}).Titles.map(simulcast => simulcast.Id);
// Exclusives
const exclusives = _.find(oldDb.Data.TitleRows, {Name: "Exclusives"}).Titles.map(simulcast => simulcast.Id);
// Recently Added - Alt: do based on date added
const recents = _.find(oldDb.Data.TitleRows, {Name: "Recently Added"}).Titles.map(simulcast => simulcast.Id);
// Trending Now - Alt: use demand to decide trending
const trending = _.find(oldDb.Data.TitleRows, {Name: "Trending Now"}).Titles.map(simulcast => simulcast.Id);
// Like Saiyuki Gaiden  = Alt: undecided how to link videos... use watching pattern of other viewers
const gaiden = _.find(oldDb.Data.TitleRows, {Name: "Like Saiyuki Gaiden"}).Titles.map(simulcast => simulcast.Id);
// Most Popular = Alt: use number of views
const popular = _.find(oldDb.Data.TitleRows, {Name: "Most Popular"}).Titles.map(simulcast => simulcast.Id);

// Use those arrays to assign true of false
newDb = newDb.map(title => {
	// Check if this title shows up in the different rows
	title.isSimulcast = !!(_.indexOf(simulcasts, title.Id) + 1);
	title.isDubed = !!(_.indexOf(dubs, title.Id) + 1);
	title.isExclusive = !!(_.indexOf(exclusives, title.Id) + 1);
	title.isRecent = !!(_.indexOf(recents, title.Id) + 1);
	title.isTrending = !!(_.indexOf(trending, title.Id) + 1);
	title.isGaiden = !!(_.indexOf(gaiden, title.Id) + 1);
	title.isPopular = !!(_.indexOf(popular, title.Id) + 1);
	return title;
})

module.exports = newDb;