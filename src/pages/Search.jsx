import React from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Carregando from '../components/Carregando';
import AlbumCard from '../components/AlbumCard';
// import ListAlbuns from '../components/ListAlbuns';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      isButtonDisabled: true,
      valueInput: '',
      artist: '',
      isSearching: false,
      albuns: [],
    };

    this.validationSearch = this.validationSearch.bind(this);
    this.searchMusic = this.searchMusic.bind(this);
    this.htmlElements = this.htmlElements.bind(this);
    this.renderElements = this.renderElements.bind(this);
    this.callAPI = this.callAPI.bind(this);
  }

  validationSearch({ target }) {
    const { value } = target;
    const minCaracteres = 2;
    this.setState({ valueInput: value });
    if (value.length >= minCaracteres) {
      this.setState({ isButtonDisabled: false });
    } else {
      this.setState({ isButtonDisabled: true }); // sem este else, o disabled só funciona da primeira vez e fica com o valor fixo de false depois
    }
  }

  htmlElements() {
    const { isButtonDisabled, valueInput } = this.state;
    return (
      <form className="formSearch">
        <input
          type="text"
          value={ valueInput }
          placeholder="Nome do artista ou da banda"
          onChange={ this.validationSearch }
          data-testid="search-artist-input"
        />
        <button
          type="button"
          disabled={ isButtonDisabled }
          onClick={ this.searchMusic }
          data-testid="search-artist-button"
        >
          Pesquisar
        </button>
      </form>
    );
  }

  searchMusic() {
    this.setState(
      { isSearching: true }, // aqui ele já renderiza de novo antes de eecutar a função?
      this.callAPI,
    );
  }

  async callAPI() {
    const { valueInput } = this.state;
    const albunsAPI = await searchAlbumsAPI(valueInput);
    this.setState(
      {
        albuns: albunsAPI,
        isSearching: false,
        artist: valueInput,
        valueInput: '',
        isButtonDisabled: true,
      },
    );
  }

  renderElements() {
    const { albuns, artist } = this.state;
    // console.log('albuns', albuns);
    if (albuns.length === 0) {
      return (<h2>Nenhum álbum foi encontrado</h2>);
    } return (
      <section className="returnAlbunsAPI">
        <p>{`Resultado de álbuns de: ${artist}`}</p>
        <div className="returnAlbuns">
          <ul className="listOfAlbuns">
            {albuns.map((album) => (
              <li className="albunsSearch" key={ album.collectionId }>
                <AlbumCard album={ album } />
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  render() {
    const { isSearching, artist } = this.state;
    // const { isSearching, albuns, artist } = this.state;
    // const teste = searchAlbumsAPI('pink');
    // console.log('albuns Render', albuns)

    return (
      <div data-testid="page-search">
        <Header />
        {isSearching ? <Carregando /> : this.htmlElements()}
        {artist.length > 0 && this.renderElements()}
        {/* usei a expressão abaixo quando não estava conseguindo renderizar aqui */}
        {/* {artist.length > 0 && <ListAlbuns albuns={ albuns } artist={ artist } />} */}
      </div>
    );
  }
}

export default Search;
