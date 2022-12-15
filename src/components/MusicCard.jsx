import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.favoriteSong = this.favoriteSong.bind(this);
    this.renderElements = this.renderElements.bind(this);
    // this.callingAddSong = this.callingAddSong.bind(this);

    this.state = {
      isFavorite: false,
      isCallingAPI: false,
      // favoritesSongs: [],
    };
  }

  async favoriteSong(event) {
    const { song } = this.props;
    const { target: { checked } } = event;
    this.setState(
      { isFavorite: checked, isCallingAPI: true },
    );
    await addSong(song);
    this.setState({ isCallingAPI: false });
  }

  // favoriteSong(event) {
  //   const { target: { checked } } = event;
  //   this.setState(
  //     { isFavorite: checked, isCallingAPI: true },
  //   );
  //   this.callingAddSong();
  // }

  // callingAddSong() {
  //   const { song } = this.props;
  //   // const savesong = await addSong(song);
  //   // console.log(savesong);
  //   addSong(song)
  //     .then(this.setState({ isCallingAPI: false }));
  // }

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
              name="favoriteSong"
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
};

export default MusicCard;
