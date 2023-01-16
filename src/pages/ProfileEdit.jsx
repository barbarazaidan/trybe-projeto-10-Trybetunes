import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Carregando from '../components/Carregando';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  state = {
    isCallingAPI: true,
    isButtonDisable: true,
    description: '',
    email: '',
    image: '',
    name: '',
  };

  componentDidMount() {
    this.userInfo();
  }

  userInfo = async () => {
    const user = await getUser();
    // console.log(user); // retorna um objeto
    const { description, email, image, name } = user;
    this.setState(
      {
        description,
        email,
        image,
        name,
        isCallingAPI: false,
      },
      () => this.validationinputs(), // esta função precisa aparecer aqui também para fazer a validação assim que o usuário entra na página, quando não tinha ela o item 6 do test quebrava
    );
  };

  validationinputs = () => {
    const { description, email, image, name } = this.state;
    const emailValidationRegex = /\S+@+\w+\.+[c]+[o]+[m]/;
    // \S: qualquer caracter que não é espaço em branco; +: adiciona uma nova análise à expressão anterior; \@: o @; \w: qualquer caracter de a ate z, de 0 até 9 e também _; \.: o ponto; [c]+ : a letra "c" e assim por diante
    if (
      description.length > 0
      && image.length > 0
      && name.length > 0
      && emailValidationRegex.test(email) // o método test() busca por uma correspondência entre uma expressão regular e uma string, retornando true ou false
    ) {
      this.setState({ isButtonDisable: false });
      // console.log('oi!');
    } else {
      // console.log('não deu');
      this.setState({ isButtonDisable: true });
    }
  };

  inputChange = ({ target }) => {
    const { value, name } = target;
    // console.log(target, name);
    this.setState(
      { [name]: value },
      () => this.validationinputs(),
    );
  };

  sendInformations = async () => {
    const { history } = this.props;
    const { name, image, email, description } = this.state;
    const newInfo = {
      description,
      email,
      image,
      name,
    };
    await updateUser(newInfo);
    history.push('/profile');
  };

  clickButton = () => {
    this.setState(
      { isCallingAPI: true },
      () => (this.sendInformations()),
    );
  };

  // A função abaixo também funciona, só estava testando diferentes formas de fazer dar certo
  // clickButton = async () => {
  //   const { history: { push } } = this.props;
  //   const { name, image, email, description } = this.state;
  //   const newInfo = {
  //     description,
  //     email,
  //     image,
  //     name,
  //   };
  //   this.setState(
  //     { isCallingAPI: true },
  //     () => {
  //       updateUser(newInfo)
  //         .then(() => (push('/profile')));
  //     },
  //   );
  // };

  render() {
    const { isCallingAPI, image, isButtonDisable, name, description, email } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        { isCallingAPI && <Carregando /> }
        {/* operador ternário com condição única, ou seja, se isCallingAPI for verdadeiro, gera <Carregando />, do contrário não faz nada */ }
        <form className="formEditProfile">
          <div className="formEditFoto">
            <img
              src={ image }
              alt="foto do usuário"
            />
            <label htmlFor="image-edit" className="labelInputsFoto">
              <input
                type="text"
                name="image"
                value={ image }
                placeholder="Insira a url da nova foto"
                onChange={ this.inputChange }
                data-testid="edit-input-image"
                id="image-edit"
              />
            </label>
          </div>
          <label htmlFor="name-edit" className="labelInputsForm">
            Nome
            <p className="tagPEditeProfile">Fique livre para editar seu nome</p>
            <input
              type="text"
              value={ name }
              name="name"
              onChange={ this.inputChange }
              data-testid="edit-input-name"
              id="name-edit"
            />
          </label>
          <label htmlFor="email-edit" className="labelInputsForm">
            Email
            <p className="tagPEditeProfile">Use seu melhor email</p>
            <input
              type="email"
              value={ email }
              name="email"
              onChange={ this.inputChange }
              data-testid="edit-input-email"
              id="email-edit"
            />
          </label>
          <label htmlFor="textArea-edit" className="labelInputsForm">
            Descrição
            <p className="tagPEditeProfile">Escreva ou ajuste o seu perfil</p>
            <textarea
              name="description"
              value={ description }
              rows="5"
              onChange={ this.inputChange }
              data-testid="edit-input-description"
              id="textArea-edit"
            />
          </label>
          <button
            type="button"
            data-testid="edit-button-save"
            id="buttonProfileEdit"
            disabled={ isButtonDisable }
            onClick={ this.clickButton }
          >
            Salvar
          </button>
        </form>
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default ProfileEdit;
