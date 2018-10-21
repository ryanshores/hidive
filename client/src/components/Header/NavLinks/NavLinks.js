import React from 'react';
import NavLink from './NavLink/NavLink';

const navLinks = (props) => {
	return (
		<div className="collapse navbar-collapse">
			<ul className="navbar-nav">
				<NavLink to='simulcasts'/>
				<NavLink to='dubs'/>
				<NavLink to='series'/>
				<NavLink to='movies'/>
				<NavLink to='free'/>
			</ul>
		</div>
	);
}
 
export default navLinks;