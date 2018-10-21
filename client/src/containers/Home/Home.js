import React from 'react';

import Row from './Row/Row';

const home = () => {
	return (
		<div>
			<Row rowTitle="Continue Watching" rowIdentifier="IsContinueWatching"/>
			<Row rowTitle="My Queue" rowIdentifier="InQueue"/>
			<Row rowTitle="Simulcasts" rowIdentifier="isSimulcast"/>
			<Row rowTitle="Dubs" rowIdentifier="isDubed"/>
			<Row rowTitle="Exclusives" rowIdentifier="isExclusive"/>
			<Row rowTitle="Recently Added" rowIdentifier="isRecent"/>
			<Row rowTitle="Trending Now" rowIdentifier="isTrending"/>
			<Row rowTitle="Like Saiyuki Gaiden" rowIdentifier="isGaiden"/>
			<Row rowTitle="Most Popular" rowIdentifier="isPopular"/>
		</div>
	);
}
 
export default home;