import React, { Component } from 'react';
import Slider from 'react-slick';
import './Row.css';

import Title from './Title/Title';
import TitleDetails from './TitleDetails/TitleDetails';

class Row extends Component {
	state = {
		titleId: null
	}

	setShowTitleDetails(titleId) {
		// set state with clicked title id
		this.setState({ titleId });
		// tell parent that we are showing title
		this.props.setShowing();
	}

	render() { 
		const { name, titles, showDetails, cancelShowing } = this.props;
		const { titleId } = this.state;

		const titlesObjects = titles.map(title => (
			<Title 
				key={title.Id} 
				title={title} 
				highlighted={ titleId === title.Id && showDetails }
				clicked={() => this.setShowTitleDetails(title.Id)} />
		))

		return (
			<div className="Row">
				<h2>{name}</h2>
				<Slider {...getSlickSettings(this.props)}>
					{titlesObjects}
				</Slider>
				{ 
					showDetails ?
					<TitleDetails 
						titleId={titleId} // pass the title id for the grapgql query
						cancel={cancelShowing} // Function to set showing to false
						/> :
					null
				}
			</div>
		);
	}
}

const getSlickSettings = (props) => ({
	customPaging: () => <div className="slick-slider-icon" />,
	dots: true,
	infinite: props.infinite,
	speed: 500,
	slidesToShow: 5,
	slidesToScroll: 5,
	initialSlide: 0,
	responsive: [
		{
			breakpoint: 1000,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 3,
				initialSlide: 0,
			}
		},
		{
			breakpoint: 600,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 2,
				initialSlide: 0,
				dots: false,
			}
		},
	]
})
 
export default Row;