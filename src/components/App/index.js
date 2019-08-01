// libraries
import { connect } from 'react-redux';
import React, { Component } from 'react';

// custom components
// import { appConstants, commonConstants } from '../../_constants';
// import { appActions, fetchCharacters } from '../../_actions';
import { appHelpers } from '../../_helpers';
import DropDown from '../Dropdown'
import CharactersTable from '../Table'

// assets
// import StarWarsLogo from '../../assets/img/star_wars_logo.svg';
import StarWarsLogo from '../../assets/img/star-wars-logo.png';
import './App.css';
import { commonService } from '../../_services/common.service';

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      moviesTitles: null,
      openingCrawl: null,
      charactersUrls: null,
      movieCharacters: null,
      genderList: null,
      selectedGender: null
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
    // const { dispatch } = this.props;
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
        let moviesTitles = appHelpers.getMoviesTitles(response.response.results)
        this.setState({ moviesTitles: moviesTitles })
      }).catch((error) => {
        let errorMessage = appHelpers.interpretErrorResponse(error);
        console.log({ errorMessage })
      })
  }

  handleTitleChange = (movie) => {
    if (movie) {
      this.fetchMovieDetails(movie.value);
    } else {
      this.setState({ openingCrawl: null })
    }
  }

  handleGenderChange = (gender) => {
    const { selectedTitle } = this.state;
    if (gender) {
      this.filterCharacters(gender.value);
    } else {
      this.fetchMovieDetails(selectedTitle)
    }
  }

  filterCharacters = (gender) => {
    const { characters } = this.props;
    let filteredCharacters = characters.filter(character => character.gender === gender);

    this.setState({movieCharacters: filteredCharacters})
  }

  fetchMovieDetails = (url) => {
    commonService.fetchMovieDetails(url)
      .then((response) => {
        this.setState({ openingCrawl: response.response.opening_crawl })
        this.fetchMovieCharacters(response.response.characters)
      }).catch((error) => {
        let errorMessage = appHelpers.interpretErrorResponse(error);
        console.log({ errorMessage })
      })
  }

  fetchMovieCharacters = async (urls) => {
    // const { dispatch } = this.props
    try {
      let data = await Promise.all(
        urls.map(
          url =>
            fetch(url).then(
              (response) => response.json()
            )));
      let genderList = appHelpers.filterGenderList(data);
      this.setState({ movieCharacters: data, genderList: genderList })
      // dispatch(fetchCharacters(data))

    } catch (error) {
      console.log(error)

      throw (error)
    }

  }


  render() {
    const { selectedTitle, moviesTitles, openingCrawl, movieCharacters,
      genderList, selectedGender } = this.state;


    return (
      <div className="app-background">

        <div className="container">
          <DropDown
            placeholder="Select a movie"
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

        <div className="container">
          <div className="row">
            <div className="col-8">
              <h3 className="text-white">List of Characters</h3>
            </div>
            <div className="col-4">
              <DropDown
                placeholder="Filter by gender"
                data={genderList}
                clearable={true}
                selectedValue={selectedGender}
                onValueChange={(value) => this.handleGenderChange(value)} />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              {movieCharacters &&
                <CharactersTable
                  data={movieCharacters}
                />
              }
            </div>
          </div>
        </div>

      </div>
    );
  }

}

function mapStateToProps(state, ownProps) {
  const { moviesTitles, characters } = state;
  return {
    moviesTitles,
    characters
  }
}

export default connect(mapStateToProps)(App);
