import React from 'react';
import './App.css';
import Board from './Board';
import Game from './Game';

class App extends React.Component {
  constructor() {
    super();


  }

  render() {
     
    return (
      <div>
      
        <Board/>

      </div>
    );
  }
}

export default App;
