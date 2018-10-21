import React from 'react';
import NavLink from './NavLink/NavLink';

const navLinks = () => {
	return (
		<div className="collapse navbar-collapse" id="links">
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