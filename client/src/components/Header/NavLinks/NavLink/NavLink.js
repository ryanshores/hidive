import React from 'react';
import { NavLink } from 'react-router-dom';

const navLink = (props) => {
	return (
		<li className="nav-item active">
			<NavLink className="nav-link" to={props.to} >{props.title}</NavLink>
		</li>
);
}
 
export default navLink;