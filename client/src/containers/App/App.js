import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { graphql } from 'react-apollo';
import './App.css';

import { getVideos } from '../../queries/queries';

import Header from '../../components/Header/Header';
import HomeList from '../VideoList/HomeList';
import VideoList from '../VideoList/VideoList';

class App extends Component {
  state = {
    titles: []
  }

  // Checks if the props have changed and if the title object exists
  componentDidUpdate(prevProps) {
    if(this.props.data !== prevProps.data){
      if(this.props.data.titles) {
        this.setState({titles: this.props.data.titles})
      }
    }
  }

  render() { 
    const { titles } = this.state;
    const titlesObject = setupTitlesObject(titles);
    return (
      <Router className="Router">
        <div className="App">
          <Header />
          <Content titlesObject={titlesObject}/>
        </div>
      </Router>
    );
  }
}

const Content = ({titlesObject}) => {
  const keys = titlesKeys(titlesObject);
  const Routes = keys.map(key => (
    <Route 
      key={key}
      path={'/' + key} 
      render={() => <VideoList rowid={key} titles={titlesObject[key]}/>} />
  ));
  return (
    <div className="container-fluid fadeIn">
      <div className="content">
        <Route exact path='/' render={() => <HomeList titles={titlesObject}/>}/>
        { Routes }
      </div>
    </div>
  )
};

const titlesKeys = (titlesObejct) => Object.keys(titlesObejct);

const setupTitlesObject = (titles) => ({
  simulcasts: titles.filter(title => title.isSimulcast),
  dubs: titles.filter(title => title.isDubed),
  exclusive: titles.filter(title => title.isExclusive),
  recent: titles.filter(title => title.isRecent),
  trending: titles.filter(title => title.isTrending),
  popular: titles.filter(title => title.isPopular),
  movies: titles.filter(title => {
    if(
      title.ShowInfoTitle.indexOf('Theatrical') === 0 ||
      title.ShowInfoTitle.indexOf('OVA') === 0 ||
      title.ShowInfoTitle.indexOf('Special') === 0
    ) {
      return true
    } else {
      return false
    }
  }),
  series: titles.filter(title => {
    if(
      title.ShowInfoTitle.indexOf('Season') === 0 ||
      title.ShowInfoTitle.indexOf('Shorts') === 0 ||
      title.ShowInfoTitle.indexOf('Knight') === 0 ||
      title.ShowInfoTitle.indexOf('Rondo') === 0
    ) {
      return true
    } else {
      return false
    }
  }),
  continueWatching: titles.filter(title => title.IsContinueWatching),
})
 
export default graphql(getVideos)(App);