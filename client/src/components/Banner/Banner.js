import React from 'react';
import Slider from 'react-slick';
import './Banner.css';

const banner = ({images}) => {
  const settings = {
    customPaging: () => <div className="slick-slider-icon" />,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false
  };

  const imageItems = images.map(image => <img className="img-fluid" key={image} src={image} alt="banner" />)

  return (
    <div className="Banner">
      <Slider {...settings}>
        {imageItems}
      </Slider>
    </div>
  );
};

export default banner;
