import { gql } from 'apollo-boost';

const getRowQuery = gql`
	query($rowString: String!) {
		row(row: $rowString) {
			Id
			Name
			MasterArtUrl
		}
	}
`;

export { getRowQuery };
