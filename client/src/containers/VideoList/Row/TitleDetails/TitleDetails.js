import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import moment from 'moment';
import './TitleDetails.css';

import { getTitleDetails } from '../../../../queries/queries';

class TitleDetails extends Component {
	state = {
		title: {},
		classes: 'fadeIn'
	}

	componentWillMount() {
		this.setTitleToState();

	}
	
	componentDidUpdate() {
		this.setTitleToState();
	}

	handleAddToQueue = () => {
		const title = {
			...this.state.title,
			ContinueWatching: {...this.state.title.ContinueWatching},
			InQueue: true
		};
		console.log({title});
		this.setState({title});
	}
	
	handleAddToFavorites = () => {
		const title = {
			...this.state.title,
			ContinueWatching: {...this.state.title.ContinueWatching},
			IsFavorite: true
		};
		console.log({title});
		this.setState({title})
	}
	
	setTitleToState = () => {
		const { data } = this.props;
		if( data.loading || !data.title || ( data.title.Id === this.state.title.Id ) ) return;
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
						<Center 
							title={title} 
							cancel={this.closeDetailsHandler} 
							addToQueue={this.handleAddToQueue} 
							addToFavorite={this.handleAddToFavorites}/>
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

const Center = ({ title, cancel, addToQueue, addToFavorite }) => (
	<div className="centerContainer">
		<LeftSide title={title} addToQueue={addToQueue} addToFavorite={addToFavorite}/>
		<RightSide cancel={cancel}/>
	</div>
);

const LeftSide = ({ title, addToQueue, addToFavorite }) => (
	<div className="leftContainer">
		<h1>{title.Name}</h1>
		<p>{title.SeasonName}</p>
		<Actions 
			queued={title.InQueue} 
			favorited={title.IsFavorite} 
			addToQueue={addToQueue} 
			addToFavorite={addToFavorite}/>
		<Synopsis synopsis={title.MediumSynopsis}/>
		<DateComponent date={title.FirstPremiereDate} />
		<p>Rating: {title.Rating}</p>

	</div>
);

const Actions = ({queued, favorited, addToQueue, addToFavorite}) => (
	<div className='actions'>
		<button className="btn btn-info btn-sm" onClick={addToQueue}>
			{ queued ? <i className="fas fa-check"></i> : 
			<i className="fas fa-plus-circle"></i> }
			Queue
		</button>
		<button className="btn btn-info btn-sm" onClick={addToFavorite}>
			{ favorited ? <i className="fas fa-check"></i> :
			<i className="fas fa-heart"></i>
			}
			Favorite
		</button>
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