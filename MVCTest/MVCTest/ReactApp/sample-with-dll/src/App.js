import React from 'react';
import example from './img/example.png';
import logo from './logo.svg';
import './App.css'; 
import {TestComponent} from './TestComponent/TestComponent';
import {ReusableComponent} from 'mvc-dll/src/components/ReusableComponent'

function App() { 
  return (
    <div className="App">
      <header className="App-header">  

        <img src={example} className="App-logo" alt="logo" />  
        <img src={logo} className="App-logo" alt="logo" />  
        <p> 
        <ReusableComponent />
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
