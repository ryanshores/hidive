import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Trial from '../../components/Trial/Trial';
import Banner from '../../components/Banner/Banner';
import Row from './Row/Row';

const homeRows = [
	{
		title: 'Simulcasts',
		identifier: 'simulcasts',
		id: 0,
	},
	{
		title: 'Dubs',
		identifier: 'dubs',
		id: 1,
	},
	{
		title: 'Exclusives',
		identifier: 'exclusive',
		id: 2,
	},
	{
		title: 'Recently Added',
		identifier: 'recent',
		id: 3,
	},
	{
		title: 'Trending',
		identifier: 'trending',
		id: 4,
	},
	{
		title: 'Popular',
		identifier: 'popular',
		id: 5,
	},
];

const bannerImages = [
	'http://d10xkldqejj5hr.cloudfront.net/slides/2018/10/HIDIVE_HOMEcarousel_FreeEPisode_HalloweenTheme_Hozuki21250x500.gif',
	'http://d10xkldqejj5hr.cloudfront.net/slides/2018/10/HIDIVE_HOMEcarousel_Haloween_20off_3.gif',
	'http://d10xkldqejj5hr.cloudfront.net/slides/2018/08/HIDIVE_HOMEcarousel_FreeeeAnime_1250x500.gif'
];

class HomeList extends Component {
	state = {
		showDetails: Array(6).fill(false),
		rows: homeRows,
		bannerImages: bannerImages
	}

	// receives the request to show title details
	// will close any other open title details
	handleSetShowing = (index) => {
		const newArray = Array(6).fill(false);
		newArray[index] = true;
		this.setState({showDetails: newArray});
	}

	// handles the user click to close title details
	handleCancelShowing = () => {
		const newArray = Array(6).fill(false);
		this.setState({showDetails: newArray});
	}

	render() { 
		const { titles } = this.props;
		const { showDetails, rows, bannerImages } = this.state;
		const rowObjects = rows.map(row => (
			<Row 
				key={row.identifier} // to make react happy
				infinite // to tell the row not to scroll
				name={row.title} // to give the row a title (optional)
				titles={titles[row.identifier]} // the titles to display in the row
				showDetails={showDetails[row.id]} // Boolean opening up the details window
				setShowing={() => this.handleSetShowing(row.id)} // The function to set showing true and hide others
				cancelShowing={this.handleCancelShowing} // The function to set showing false
				/> 
		))
		return (
			<div className="List fadeIn">
				<Trial />
				<Banner images={bannerImages}/>
				{rowObjects}
			</div>
		);
	}
}

HomeList.propTypes = {
	titles: PropTypes.object.isRequired
}
 
export default HomeList;