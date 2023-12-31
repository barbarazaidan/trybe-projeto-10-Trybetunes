import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.favoriteSong = this.favoriteSong.bind(this);
    this.renderElements = this.renderElements.bind(this);

    this.state = {
      isFavorite: false,
      isCallingAPI: false,
      // favorites: [],
    };
  }

  componentDidMount() {
    const { favoritesSongs, song } = this.props;
    // console.log('favoritesSongs', favoritesSongs);
    // console.log('song', song);
    const response = favoritesSongs.some((music) => music.trackId === song.trackId);
    this.setState({ isFavorite: response });
  }

  async favoriteSong(event) {
    const { song, listNewfavoritesSongs } = this.props;
    const { target: { checked } } = event;
    // console.log(event);
    this.setState(
      { isFavorite: checked, isCallingAPI: true },
    );
    if (checked) {
      await addSong(song);
      this.setState({ isCallingAPI: false });
    } else {
      await removeSong(song);
      const newFavorites = await getFavoriteSongs();
      // console.log(newFavorites);
      this.setState({ isCallingAPI: false });
      listNewfavoritesSongs(newFavorites);
    }
  }

  renderElements() {
    const { song } = this.props;
    const { trackName, previewUrl, trackId } = song;
    const { isFavorite } = this.state;
    return (
      <>
        <p>{ trackName }</p>
        <div className="songAndFavorite">
          <audio src={ previewUrl } controls data-testid="audio-component">
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
            .
          </audio>
          <label htmlFor="favoriteSong">
            Favorita
            <input
              type="checkbox"
              id="favoriteSong"
              data-testid={ `checkbox-music-${trackId}` }
              checked={ isFavorite }
              onChange={ this.favoriteSong }
            />
          </label>
        </div>
      </>
    );
  }

  render() {
    const { isCallingAPI } = this.state;

    return (
      <div className="liListOfSongs">
        { isCallingAPI ? <Carregando /> : this.renderElements() }
      </div>
    );
  }
}

MusicCard.propTypes = {
  song: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
  favoritesSongs: PropTypes.arrayOf(PropTypes.shape({
    trackId: PropTypes.number,
  })).isRequired,
  listNewfavoritesSongs: PropTypes.func.isRequired,
};

export default MusicCard;
