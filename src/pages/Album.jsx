import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Carregando from '../components/Carregando';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();

    this.renderElements = this.renderElements.bind(this);

    this.state = {
      listOfSongs: [],
      isSearching: true,
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    // console.log(match);
    const { params } = match; // params é a chave de um objeto {id: 'numero'}
    // console.log(getMusics(params.id)); // retorna uma promise;
    const musics = await getMusics(params.id);
    // console.log('musics', musics);
    this.setState(
      { isSearching: false, listOfSongs: musics },
    );
  }

  renderElements() {
    const { listOfSongs } = this.state; // array de objetos
    console.log('listofsongs', listOfSongs);
    const { artworkUrl60, artistName, collectionName } = listOfSongs[0];

    // const firstElementArray = listOfSongs.shift(); // o método shift() pega o primeiro elemento do array e o retorna. Ele também modifica o array original, eliminando o primeiro elemento. Tal método deu erro nos testes, talvez por modificar o estado listOfSongs.
    // console.log('firstElementArray', firstElementArray);
    // const { artworkUrl60, artistName, collectionName } = firstElementArray;

    return (
      <section className="boxArtistMusics">
        <div className="albumInfo">
          <img src={ artworkUrl60 } alt={ `Capa do álbum ${collectionName}` } />
          <p data-testid="artist-name">{ artistName }</p>
          <p data-testid="album-name">{ collectionName }</p>
        </div>
        <ul className="listOfSongs">
          { /* o slice(1) retorna uma cópia do array do array original sem o primeiro elemento */ }
          {listOfSongs.slice(1).map((song) => (
            <li key={ song.trackId }>
              <MusicCard song={ song } />
            </li>
          ))}
        </ul>
      </section>
    );
  }

  render() {
    const { isSearching, listOfSongs } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        {isSearching && <Carregando />}
        {listOfSongs.length > 0 && this.renderElements()}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
