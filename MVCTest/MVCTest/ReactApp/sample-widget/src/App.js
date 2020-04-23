import React from 'react';
import example from './img/example.png';
import {ReactComponent as Prueba} from './logo.svg';
import logo from './logo.svg';
import './App.css'; 
import {TestComponent} from './TestComponent/TestComponent';
import {ReusableComponent} from 'mvc-dll/src/components/ReusableComponent';

function App() { 
  return (
    <div className="App">
      <header className="App-header">  
        <ReusableComponent />
        <img src={example} className="App-logo" alt="logo" />  
        <img src={logo} className="App-logo" alt="logo" />  
        <Prueba className="App-logo"></Prueba>
        <p> 

        <TestComponent name="Asun" />
          THIS IS MY NEW REACT APP - HELLO AGAIN :)
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
