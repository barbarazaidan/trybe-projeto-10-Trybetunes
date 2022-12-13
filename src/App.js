import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Conteudo from './components/Conteudo';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Conteudo />
      </BrowserRouter>
    );
  }
}

export default App;
