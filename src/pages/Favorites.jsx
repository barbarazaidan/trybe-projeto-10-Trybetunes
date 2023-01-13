import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Carregando from '../components/Carregando';
import MusicCard from '../components/MusicCard';

class Favorites extends React.Component {
  state = {
    isCallingAPI: true,
    favoriteSongs: [],
  };

  componentDidMount() {
    this.listFavoritesSongs();
  }

  // componentDidUpdate() {
  //   this.listFavoritesSongs();
  //   // console.log('didUpdate');
  // }

  listFavoritesSongs = async () => {
    const favoriteSongs = await getFavoriteSongs();
    // console.log(favoriteSongs);
    this.setState({ favoriteSongs, isCallingAPI: false });
  };

  listNewfavoritesSongs = (newFavorites) => {
    this.setState({ favoriteSongs: newFavorites });
  };

  render() {
    const { isCallingAPI, favoriteSongs } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        { isCallingAPI && <Carregando /> }
        <ul className="favoriteSongs">
          {favoriteSongs.map((song) => (
            <li key={ song.trackId }>
              <MusicCard
                song={ song }
                favoritesSongs={ favoriteSongs }
                listNewfavoritesSongs={ this.listNewfavoritesSongs }
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Favorites;
