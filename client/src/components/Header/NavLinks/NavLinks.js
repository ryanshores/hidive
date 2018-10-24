import React from 'react';

import NavLink from './NavLink/NavLink';
import Search from '../../../containers/Search/Search'

const navLinks = () => {
	return (
		<div className="collapse navbar-collapse" id="links">
			<ul className="navbar-nav">
				<NavLink title='simulcasts' to='/simulcasts'/>
				<NavLink title='dubs' to='/dubs'/>
				<NavLink title='movies' to='/movies'/>
				<NavLink title='series' to='/series'/>
			</ul>
			<Search />
		</div>
	);
}
 
export default navLinks;