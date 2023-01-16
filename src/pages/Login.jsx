import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Carregando from '../components/Carregando';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      isButtonDisable: true,
      name: '',
      isLogged: false,
    };

    this.validationLogin = this.validationLogin.bind(this);
    this.saveLogin = this.saveLogin.bind(this);
    this.loginScreen = this.loginScreen.bind(this);
  }

  loginScreen() {
    const { isButtonDisable } = this.state;
    return (
      <div className="login">
        <img className="logoLogin" src="https://imagensemoldes.com.br/wp-content/uploads/2020/03/Headphone-m%C3%ADsica-png-Gr%C3%A1tis-1024x1024.png" alt="logo" />
        <form className="formLogin">
          <input
            type="text"
            data-testid="login-name-input"
            placeholder="Digite seu nome"
            onChange={ this.validationLogin }
          />
          <button
            type="button"
            disabled={ isButtonDisable }
            onClick={ this.saveLogin }
            data-testid="login-submit-button"
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }

  validationLogin({ target }) {
    // console.log(target.value);
    const { value } = target;
    const valueMin = 3;
    if (value.length >= valueMin) {
      this.setState({ isButtonDisable: false, name: value });
    }
  }

  saveLogin() {
    const { history } = this.props;
    const { push } = history;
    const { name } = this.state;
    // console.log(history);
    // console.log(createUser({ name })); // retorna uma promise
    this.setState( // mudo o estado e aí sim executo a função que salva o nome da pessoa
      { isLogged: true },
      () => {
        createUser({ name })
          .then(() => push('/search')); // na sequência, faço o redirecionamento de rota
      },
    );
  }

  render() {
    const { isLogged } = this.state;
    // console.log(isLogged);
    // console.log(this.props);

    return (
      <div className="telaLogin" data-testid="page-login">
        { isLogged ? <Carregando /> : this.loginScreen() }
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
