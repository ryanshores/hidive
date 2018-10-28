import React from 'react';
import { create as render } from 'react-test-renderer';
import '../../setupTest';
import { MockedProvider } from 'react-apollo/test-utils';

import { getTitles } from '../../queries/queries'
import App from './App';

const mocks = [
	{
		request: {
			query: getTitles
		},
		result: {
			data: {
				titles: [
					{
						Id: "802",
						IsContinueWatching: true,
						MasterArtUrl: "//d10xkldqejj5hr.cloudfront.net/titles/YYP/YYP_01_MASTER_300x169.jpg",
						Name: "Yona Yona Penguin",
						ShowInfoTitle: "Theatrical | G",
						isDubed: true,
						isExclusive: true,
						isPopular: false,
						isRecent: true,
						isSimulcast: false,
						isTrending: false,
						__typename: "Title",
					}
				]
			}
		}
	},
]

it('renders without crashing', () => {
	const component = render(
		<MockedProvider mocks={mocks} addTypename={false}>
			<App />
		</MockedProvider>
	);
	const snap = component.toJSON();
	expect(snap).toMatchSnapshot();
})