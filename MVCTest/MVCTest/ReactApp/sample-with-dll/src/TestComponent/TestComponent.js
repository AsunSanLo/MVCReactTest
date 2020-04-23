import * as React from 'react';
import './TestComponent.scss';
export const TestComponent = (props) => (<div>
    <span className="text"> Hello! I'm a test component. My name is {props.name}</span>
    <div className="App-new-logo"></div>  
</div>);