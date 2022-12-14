import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      isButtonDisabled: true,
    };

    this.validationSearch = this.validationSearch.bind(this);
  }

  validationSearch({ target }) {
    const { value } = target;
    const minCaracteres = 2;
    if (value.length >= minCaracteres) {
      this.setState({ isButtonDisabled: false });
    }
  }

  render() {
    const { isButtonDisabled } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <form className="formSearch">
          <input
            type="text"
            placeholder="Nome do artista ou da banda"
            onChange={ this.validationSearch }
            data-testid="search-artist-input"
          />
          <button
            type="button"
            disabled={ isButtonDisabled }
            data-testid="search-artist-button"
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
