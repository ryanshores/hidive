import React from 'react';
import Slider from 'react-slick';
import './Banner.css';

const banner = () => {
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

  return (
    <div className="Banner">
      <Slider {...settings}>
        <img className="img-fluid" src="http://d10xkldqejj5hr.cloudfront.net/slides/2018/10/HIDIVE_HOMEcarousel_FreeEPisode_HalloweenTheme_Hozuki21250x500.gif" alt="banner-1" />
        <img className="img-fluid" src="http://d10xkldqejj5hr.cloudfront.net/slides/2018/10/HIDIVE_HOMEcarousel_Haloween_20off_3.gif" alt="banner-1" />
        <img className="img-fluid" src="http://d10xkldqejj5hr.cloudfront.net/slides/2018/08/HIDIVE_HOMEcarousel_FreeeeAnime_1250x500.gif" alt="banner-1" />
      </Slider>
    </div>
  );
};

export default banner;
