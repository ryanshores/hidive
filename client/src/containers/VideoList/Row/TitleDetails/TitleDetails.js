import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import moment from 'moment';
import './TitleDetails.css';

import { getTitleDetails } from '../../../../queries/queries';

class TitleDetails extends Component {
	state = {
		title: {},
		exampleTitle: {
			FirstPremiereDate: "2018-07-03T15:00:00",
			Id: "862",
			InQueue: false,
			IsFavorite: false,
			KeyArtUrl: "//d10xkldqejj5hr.cloudfront.net/titles/TNM/TNM_01_KEY_1200x450.jpg",
			MediumSynopsis: "The masses are suffering under the rule of the tyrannical World Empire, and the only ones who can stand against the regime and fight for freedom are a ragtag resistance group armed only with antique guns.",
			Name: "The Thousand Musketeers",
			SeasonName: "Season 1",
		},
		classes: 'fadeIn'
	}

	componentWillMount() {
		this.setTitleToState();

	}
	
	componentDidUpdate() {
		this.setTitleToState();
	}

	setTitleToState = () => {
		const { data } = this.props;
		if( data.loading || !data.title || ( data.title === this.state.title ) ) return;
		this.setState({
			title: data.title,
			classes: 'fadeIn'
		});
	}

	closeDetailsHandler = () => {
		// set slideclose for transition
		this.setState({ classes: 'fadeOut'})
		setTimeout(() => {
			this.props.cancel();
		}, 1000)
	}
	
	render() { 
		const { title, classes } = this.state;
		return (
			<div className='titleDetails'>
				<div className="detailsContainer">
					<div className={classes}>
						<BackgroundImage imageURL={title.KeyArtUrl} altText={title.Name} />
						<Center title={title} cancel={this.closeDetailsHandler} />
					</div>
				</div>
			</div>
		);
	}
}

const BackgroundImage = ({imageURL, altText}) => (
	<div className="imageContainer">
		<img src={imageURL} alt={altText}/>
	</div>
);

const Center = ({ title, cancel }) => (
	<div className="centerContainer">
		<LeftSide title={title}/>
		<RightSide cancel={cancel}/>
	</div>
);

const LeftSide = ({ title }) => (
	<div className="leftContainer">
		<h1>{title.Name}</h1>
		<p>{title.SeasonName}</p>
		<Actions />
		<Synopsis synopsis={title.MediumSynopsis}/>
		<DateComponent date={title.FirstPremiereDate} />
		<p>Rating: {title.Rating}</p>

	</div>
);

const Actions = () => (
	<div className='actions'>
		<button className="btn btn-primary btn-sm"><i class="fas fa-plus-circle"></i> Queue</button>
		<button className="btn btn-primary btn-sm"><i class="fas fa-heart"></i> Favorite</button>
	</div>
)

const Synopsis = ({synopsis}) => (
	<div className="synopsis">{synopsis}</div>
)

const DateComponent = ({date}) => {
	const date1 = moment(date).format("MMMM Do YYYY");
	return (
		<div className="date">
			<p>Original Premiere: {date1}</p>
		</div>
	)
}

const RightSide = ({cancel}) => (
	<div className="rightContainer">
		<div className="exitButton">
			<i onClick={cancel} className="fas fa-times"></i>
		</div>
		<div className="playButton">
			<i className="fas fa-play"></i>
		</div>
	</div>
);

const options = {
	options: props => {
		return {
			variables: {
				id: props.titleId
			}
		}
	}
};
 
export default graphql(getTitleDetails, options)(TitleDetails);