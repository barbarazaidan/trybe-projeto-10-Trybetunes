import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { song } = this.props;
    // console.log(song);
    const { trackName, previewUrl } = song;
    return (
      <>
        <p>{ trackName }</p>
        <audio src={ previewUrl } controls data-testid="audio-component">
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
      </>
    );
  }
}

MusicCard.propTypes = {
  song: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
  }).isRequired,
};

export default MusicCard;
