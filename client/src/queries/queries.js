import { gql } from 'apollo-boost';

const getVideos = gql`
{
	titles {
		Name
		Id
		MasterArtUrl
		IsContinueWatching
		isSimulcast
		isDubed
		isExclusive
		isRecent
		isTrending
		isPopular
		ShowInfoTitle
	}
}
`;

const getTitleDetails = gql`
query($id: ID) {
	title(id: $id) {
		Id
		Name
		MediumSynopsis
		KeyArtUrl
		SeasonName
		InQueue
		IsFavorite
		FirstPremiereDate
		Rating
	}
}
`;

const videoSearch = gql`
query($name: String) {
	titleSearch(name: $name) {
		Id
		Name
	}
}
`;

export { getTitleDetails, getVideos, videoSearch };
