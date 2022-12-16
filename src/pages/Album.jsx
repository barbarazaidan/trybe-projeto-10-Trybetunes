import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Carregando from '../components/Carregando';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();

    this.renderElements = this.renderElements.bind(this);
    this.createCardSong = this.createCardSong.bind(this);
    // this.getFavorites = this.getFavorites.bind(this);

    this.state = {
      listOfSongs: [],
      favoritesSongs: [],
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
    const musicsWithFavorites = await getFavoriteSongs();
    //   console.log(musicsWithFavorites);

    this.setState(
      { isSearching: false, listOfSongs: musics, favoritesSongs: musicsWithFavorites },
    );
  }

  createCardSong(song) {
    return (
      <li key={ song.trackId }>
        <MusicCard song={ song } checked="true" />
      </li>
    );
  }

  renderElements() {
    const { listOfSongs, favoritesSongs } = this.state; // array de objetos
    const { artworkUrl60, artistName, collectionName } = listOfSongs[0];

    // const firstElementArray = listOfSongs.shift(); // o método shift() pega o primeiro elemento do array e o retorna. Ele também modifica o array original, eliminando o primeiro elemento. Tal método deu erro nos testes, talvez por modificar o estado listOfSongs.
    // console.log('firstElementArray', firstElementArray);
    // const { artworkUrl60, artistName, collectionName } = firstElementArray;

    //   return (
    //     <section className="boxArtistMusics">
    //       <div className="albumInfo">
    //         <img src={ artworkUrl60 } alt={ `Capa do álbum ${collectionName}` } />
    //         <p data-testid="artist-name">{ artistName }</p>
    //         <p data-testid="album-name">{ collectionName }</p>
    //       </div>
    //       <ul className="listOfSongs">
    //         { isFavoriteSongs
    //           ? favoritesSongs.map((song) => (
    //             this.createCardSong(song)
    //           ))
    //           : listOfSongs.slice(1).map((song) => (
    //             // o slice(1) retorna uma cópia do array do array original sem o primeiro elemento
    //             <li key={ song.trackId }>
    //               <MusicCard song={ song } checked={ true }/>
    //             </li>
    //           ))
    //         }
    //       </ul>
    //     </section>
    //   );
    // }

    return (
      <section className="boxArtistMusics">
        <div className="albumInfo">
          <img src={ artworkUrl60 } alt={ `Capa do álbum ${collectionName}` } />
          <p data-testid="artist-name">{artistName}</p>
          <p data-testid="album-name">{collectionName}</p>
        </div>
        <ul className="listOfSongs">
          {listOfSongs.slice(1).map((song) => (
            // o slice(1) retorna uma cópia do array do array original sem o primeiro elemento
            <li key={ song.trackId }>
              <MusicCard song={ song } favoritesSongs={ favoritesSongs } />
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
