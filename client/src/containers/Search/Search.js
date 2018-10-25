import React, { Component } from 'react';
import { Query } from 'react-apollo';
import './Search.css';

import { videoSearch } from '../../queries/queries';

class Search extends Component {
	state = { 
		search: '',
		searchQuery: '',
		results: []
	}

	handleInputChange = event => {
		this.setState({[event.target.name]: event.target.value});
		this.setQueryValue();
	}

	// Delays the setting of the query value
	// This delays the search but reduces amount of server requests
	setQueryValue = () => {
		let timeout;
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			this.setState({searchQuery: this.state.search})
		}, 1000);
	};

	handleSubmit = event => event.preventDefault();

	render() { 
		const { search, searchQuery } = this.state;
		const showQuery = !!searchQuery.length;
		return (
			<div className='searchContainer ml-auto'>
				<SearchForm change={this.handleInputChange} search={search} submit={this.handleSubmit}/>
				{
					showQuery ?
					<SearchQuery query={searchQuery}/> : null
				}
			</div>
		);
	}
}

const SearchForm = ({change, search, submit}) => (
	<form className="form-inline my-2 my-lg-0" onSubmit={submit}>
		<input 
			className="form-control mr-sm-2" 
			onChange={change}
			type="search" 
			value={search}
			name='search'
			placeholder="Search" 
			aria-label="Search" />
	</form>
);

const SearchQuery = ({query}) => (
	<Query
		query={videoSearch}
		variables={{name: query}}
	>
		{({ loading, error, data }) => {
			if (loading) return null;
			if (error) return `Error!: ${error}`;
			console.log(data);
			return <SearchResults titles={data.titleSearch} />
		}}
	</Query>
);

const SearchResults = ({titles}) => {
	const results = titles.map(title => <Result key={title.Id} name={title.Name} />)
	return (
		<ul className='searchList'>
			{results}
		</ul>
	);
};

const Result = ({name}) => {
	return (
		<li className='searchResult'>{name}</li>
	);
}
 
export default Search;