// import React from 'react';
// import { Redirect, Route, Switch } from 'react-router-dom';
// import Album from '../pages/Album';
// import Favorites from '../pages/Favorites';
// import Login from '../pages/Login';
// import NotFound from '../pages/NotFound';
// import Profile from '../pages/Profile';
// import ProfileEdit from '../pages/ProfileEdit';
// import Search from '../pages/Search';

// class Conteudo extends React.Component {
//   constructor() {
//     super();
//   }

//   render() {
//     const { isLogged } = this.state;
//     return (
//       <main>
//         <Switch>
//           <Route path="/search" component={ Search } />
//           <Route path="/favorites" component={ Favorites } />
//           <Route path="/profile/edit" component={ ProfileEdit } />
//           <Route path="/profile" component={ Profile } />
//           <Route path="/album/:id" component={ Album } />
//           <Route exact path="/" render={ (props) => <Login { ...props } /> } />
//           <Route path="*" component={ NotFound } />
//         </Switch>
//       </main>
//     );
//   }
// }

// export default Conteudo;
