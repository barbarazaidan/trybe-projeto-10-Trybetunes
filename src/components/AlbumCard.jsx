import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class AlbumCard extends React.Component {
  render() {
    const { album: {
      collectionName,
      artistName,
      artworkUrl100,
      collectionId,
    } } = this.props;
    return (
      <>
        <img src={ artworkUrl100 } alt={ `Capa do álbum ${collectionName}` } />
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          { collectionName }
        </Link>
        <p>{ artistName }</p>
      </>
    );
  }
}

AlbumCard.propTypes = {
  album: PropTypes.shape({
    collectionId: PropTypes.number,
    collectionName: PropTypes.string,
    artistName: PropTypes.string,
    artworkUrl100: PropTypes.string,
  }).isRequired,
};

export default AlbumCard;
