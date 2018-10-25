import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Row from './Row/Row';
import Banner from '../../components/Banner/Banner';

const bannerImages = {
	simulcasts: '//d10xkldqejj5hr.cloudfront.net/slides/2018/10/HIDIVE_HeaderImage_VISITOR_SimulcastSection_BloomIntoYou_1140x275_UpdatedEngLogo.jpg',
	dubs: '//d10xkldqejj5hr.cloudfront.net/slides/2018/10/HIDIVE_HeaderImage_VISITOR_DubSeriesSection_TadaNeverFallsinLove_1140x275.jpg',
	exclusive: '//d10xkldqejj5hr.cloudfront.net/slides/2018/09/HIDIVE_HeaderImage_VISITOR_Exclusives_TheBigO_1140x275.jpg',
	recent: '',
	trending: '//d10xkldqejj5hr.cloudfront.net/slides/2018/09/HIDIVE_HeaderImage_VISITOR_Trending_TadaNeverFallsinLove_1140x275.jpg',
	popular: '//d10xkldqejj5hr.cloudfront.net/slides/HIDIVE_HeaderImage_StreamYour_MostPopular_Made-in-Abyss_1140x275.jpg',
	movies: '//d10xkldqejj5hr.cloudfront.net/slides/HIDIVE_HeaderImage_StreamYour_MostPopular_Made-in-Abyss_1140x275.jpg',
	series: '//d10xkldqejj5hr.cloudfront.net/slides/2018/10/HIDIVE_HeaderImage_VISITOR_TVSeriesSection_Parasyte_1140x275_2.jpg',
};

class VideoList extends Component {
	state = {
		width: 0,
		height: 0,
		rows: 0,
		length: 0,
		showDetails: [],
		bannerImages,
	}

	componentDidMount() {
		this.updateWindowDimensions();
		window.addEventListener('resize', this.updateWindowDimensions);
	}

	componentDidUpdate() {
		this.updateWindowDimensions();
		window.addEventListener('resize', this.updateWindowDimensions);
	}
	
	componentWillUnmount() {
		window.removeEventListener('resize', this.updateWindowDimensions);
	}

	handleSetShowing = (index) => {
		const newArray = Array(this.state.rows).fill(false);
		newArray[index] = true;
		this.setState({showDetails: newArray});
	}

	handleCancelShowing = () => {
		const newArray = Array(this.state.rows).fill(false);
		this.setState({showDetails: newArray});
	}

	// Updates the window size dimensions and sets the number of videos to show in a row
	// Also closes and showing title details
	updateWindowDimensions() {
		const width = window.innerWidth;
		const height = window.innerHeight;
		const length = width >= 1000 ? 5 : width >= 600 ? 3 : 2;
		// On resize there is often no props or state so exit function without them
		if ( !this.props ) {
			return 
		}
		let rows = this.props.titles.length / length;
		rows = Math.ceil(rows);
		const showDetails = Array(rows).fill(false);
		if(rows !== this.state.rows) {
			this.setState({ 
					width,
					height,
					rows,
					length,
					showDetails
				});
			}
	}

	render() { 
		const { rows, length, showDetails, bannerImages } = this.state;
		const { titles, rowid } = this.props;
		let rowObjects = [];
		for( let i = 0; i < rows; i++) {
			rowObjects.push(
				<Row 
					key={i} // For react
					titles={titles.slice(i * length, ( i + 1 ) * length)} // list of titles for row
					showDetails={showDetails[i]} //Boolean to show
					setShowing={() => this.handleSetShowing(i)} // Function to set showing true
					cancelShowing={this.handleCancelShowing} // The function to set showing false
				/>
			)
		}
		return (
			<div className="List fadeIn">
				<Banner images={[bannerImages[rowid]]} />
				{rowObjects}
			</div>
		);
	}
}

VideoList.propTypes = {
	titles: PropTypes.array,
	rowid: PropTypes.string
}
 
export default VideoList;