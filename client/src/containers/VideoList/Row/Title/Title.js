import React from 'react';
import './Title.css'

const title = ({ title, clicked, highlighted }) => {
	return (
		<div className="titleContainer">
			<div className='titleContent' onClick={clicked}>
				<Border highlighted={highlighted}/>
				<div className="imageContainer">
					<img src={title.MasterArtUrl} alt=""/>
				</div>
				{ 
					highlighted ? 
					null : 
					<HoverContainer title={title}/>
				}
			</div>
		</div>
	);
}

const HoverContainer = ({title}) => (
	<div className="hoverContainer">
		<div className="hoverContent">
			<div className="play">
				<i className="fas fa-play"></i>
			</div>
			<div className="title">
				<p>{title.Name}</p>
			</div>
			<div className="details">
				<i className="fas fa-angle-down"></i>
			</div>
			</div>
	</div>
);

const Border = ({highlighted}) => (
	<div className={highlighted ? 'borderHighlight' : null}></div>
);
 
export default title;