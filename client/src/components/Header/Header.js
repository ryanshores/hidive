import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'

import NavLinks from './NavLinks/NavLinks';

const header = () => {
	return (
		<nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
			<div className="container-fluid">
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#links">
					<span className="navbar-toggler-icon"></span>
				</button>
				<Link className="navbar-brand" to='/'>
					<img src="http://d10xkldqejj5hr.cloudfront.net/content/images/HIDIVE_logo.svg" alt="HiDive" width="140" />
				</Link>
				<NavLinks />
			</div>
		</nav>
	);
}
 
export default header;