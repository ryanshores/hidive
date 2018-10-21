import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import Slider from 'react-slick';

import { getRowQuery } from '../../../queries/queries';
import './Row.css'

const settings = {
  customPaging: () => <div className="slick-slider-icon" />,
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
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
};

class Row extends Component {
  state = {
    titles: []
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(this.props.data !== prevProps.data){
      if(this.props.data.row) {
        this.setState({titles: this.props.data.row})
      }
    }
  }

  render() {

    const titles = this.state.titles.map(title => (
      <div key={title.Id} className="titleContainer">
        <div className="titlePreview">
          <h4>{title.Name}</h4>
          <img src={title.MasterArtUrl} alt={title.Name}/>
        </div>
      </div>
    ))

    return (
      <div className="section">
        <h2>{this.props.rowTitle}</h2>
        <Slider {...settings}>
          {titles}
        </Slider>
      </div>
    );
  }
}
 
export default graphql(getRowQuery, {
	options: props => {
		return {
			variables: {
				rowString: props.rowIdentifier
			}
		}
	}
})(Row);
