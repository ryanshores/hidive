import React from 'react';
import { NavLink } from 'react-router-dom';
import _ from 'lodash';

const navLink = (props) => {
	return (
		<li className="nav-item active">
			<NavLink className="nav-link" to={props.to} >{_.capitalize(props.to)}</NavLink>
		</li>
);
}
 
export default navLink;