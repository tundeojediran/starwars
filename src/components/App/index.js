// libraries
import { connect } from 'react-redux';
import React, { Component } from 'react';

// custom components
import { appConstants } from '../../_constants';
import { commonActions } from '../../_actions';
import { appHelpers } from '../../_helpers';
import MovieDropDown from '../Dropdown'

// assets
import logo from './logo.svg';
import StarWarsLogo from '../../assets/img/star_wars_logo.svg';
import './App.css';
import { commonService } from '../../_services/common.service';

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      moviesTitles: null,
      openingCrawl: null
    }
  }

  componentDidMount() {
    // const { moviesTitles } = this.props;
    // if(moviesTitles) {
    //   this.setState({moviesTitles: moviesTitles})
    // }
    this.fetchmoviesTitles()
  }

  fetchmoviesTitles = () => {
    const { dispatch } = this.props;
    // dispatch(commonActions.fetchMovies())
    //   .then(() => {
    //     const { moviesTitles } = this.props;
    //     this.setState({moviesTitles: moviesTitles})
    //     // dispatch(apiActions.endRequest());
    //   }).catch(error => {
    //     let errorMessage = appHelpers.interpretErrorResponse(error);
    //     // this.notify(errorMessage, appConstants.NOTIFY_ERROR);
    //     this.setState({ contentError: errorMessage });
    //     // dispatch(apiActions.endRequest());
    //   });

    commonService.fetchAllMovies()
      .then((response) => {
        console.log(response.response.results)
        let moviesTitles = appHelpers.getMoviesTitles(response.response.results)
        this.setState({ moviesTitles: moviesTitles })
      }).catch((error) => {
        let errorMessage = appHelpers.interpretErrorResponse(error);
        console.log({ errorMessage })
      })
  }

  handleTitleChange = (movie) => {
    console.log(movie.value)
    if (movie) {
      this.fetchMovieDetails(movie.value);
    } else {
      this.setState({ openingCrawl: null })
    }
  }

  fetchMovieDetails = (url) => {
    console.log({ url })
    commonService.fetchMovieDetails(url)
      .then((response) => {
        this.setState({ openingCrawl: response.response.opening_crawl })
        console.log(response.response.opening_crawl)
      }).catch((error) => {
        let errorMessage = appHelpers.interpretErrorResponse(error);
        console.log({ errorMessage })
      })
  }


  render() {
    const { selectedTitle, moviesTitles, openingCrawl } = this.state;


    return (
      <div className="app-background">

        <div className="container">
          <MovieDropDown
            placeholder="Select a movie"
            labelKey="title"
            valueKey="url"
            data={moviesTitles}
            clearable={true}
            selectedValue={selectedTitle}
            onValueChange={(value) => this.handleTitleChange(value)}
          />
        </div>

        <header className="App-header">
          {!openingCrawl && <img src={StarWarsLogo} className="App-logo" alt="logo" />}
          {openingCrawl &&
            <div className="row text-center">
              <div className="col-md-8 crawl-text offset-2">
                <p className="">{openingCrawl}</p>
              </div>
            </div>}
        </header>

        <div className="row">
          <div className="col-12">
            <h3>Actors & Actresses</h3>
            
          </div>
        </div>
      </div>
    );
  }

}

function mapStateToProps(state, ownProps) {
  const { moviesTitles } = state;
  return {
    moviesTitles
  }
}

export default connect(mapStateToProps)(App);
