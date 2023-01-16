import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Carregando from '../components/Carregando';

class Profile extends React.Component {
  state = {
    isCallingApi: true,
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
    this.setState({
      description,
      email,
      image,
      name,
      isCallingApi: false,
    });
  };

  render() {
    const { isCallingApi, description, email, image, name } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        { isCallingApi
          ? <Carregando />
          : (
            <section className="profileInfo">
              <div className="imageELink">
                <img
                  data-testid="profile-image"
                  src={ image }
                  alt="foto do usuário"
                />
                <Link to="/profile/edit">
                  <p>Editar perfil</p>
                </Link>
              </div>
              <h3>Nome</h3>
              <p>{ name }</p>
              <h3>Email</h3>
              <p>{ email }</p>
              <h3>Descrição</h3>
              <p>{ description }</p>
            </section>
          )}
      </div>
    );
  }
}

export default Profile;
