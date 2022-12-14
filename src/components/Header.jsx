import React from 'react';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      nameUser: '',
    };

    this.apiReturn = this.apiReturn.bind(this);
  }

  componentDidMount() {
    // console.log('didMount');
    this.apiReturn();
  }

  apiReturn() {
    getUser() // é uma promise
    // .then(response => console.log(response)) // retorna um objeto {name: 'bárbara', email: '', image: '', description: ''}
      .then((response) => this.setState({ nameUser: response.name }));
  }

  render() {
    const { nameUser } = this.state;
    // console.log('render');

    return (
      <header data-testid="header-component">
        {
          nameUser === ''
            ? <Carregando />
            : <p data-testid="header-user-name">{ nameUser }</p>
        }
      </header>
    );
  }
}

export default Header;
