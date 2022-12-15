import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class AlbumCard extends React.Component {
  render() {
    const { albuns, artist } = this.props;
    console.log(albuns);
    return (
      <div>
        {
          albuns.length === 0
            ? <p>Nenhum álbum foi encontrado</p>
            : (
              <section className="returnAlbunsAPI">
                <p>{`Resultado de álbuns de: ${artist}`}</p>
                <div className="returnAlbuns">
                  <ul className="listaDeAlbuns">
                    {albuns.map(({ collectionId, collectionName }) => (
                      <li key={ collectionId }>
                        <Link
                          to={ `/album/${collectionId}` }
                          data-testid={ `link-to-album-${collectionId}` }
                        >
                          {collectionName}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            )
        }
      </div>
    );
  }
}

AlbumCard.propTypes = {
  albuns: PropTypes.arrayOf(PropTypes.shape({
    collectionId: PropTypes.number,
    collectionName: PropTypes.string,
  })).isRequired,
  artist: PropTypes.string.isRequired,
};

export default AlbumCard;
