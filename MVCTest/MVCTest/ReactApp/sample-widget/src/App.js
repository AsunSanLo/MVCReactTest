import React from 'react';
import example from './img/example.png';
import {ReactComponent as Prueba} from './logo.svg';
import logo from './logo.svg';
import './App.css'; 
import {TestComponent} from './TestComponent/TestComponent';

function App() { 

  return (
    <div className="App">
      <header className="App-header">  
        <p> 

        <TestComponent name="Asun" />
          THIS IS MY NEW REACT APP - HELLO ASUN :)
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        
          Learn React
        </a>
        <div>Here I'm testing the different ways to use images. You should see 3 images</div>
        
        <img src={example} className="App-logo" alt="logo" />  
        <img src={logo} className="App-logo" alt="logo" />  
        <Prueba className="App-logo"></Prueba>
      </header>
    </div>
  );
}

export default App;
