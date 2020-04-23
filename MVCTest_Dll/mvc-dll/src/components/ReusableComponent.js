import * as React from 'react';
import {AnotherComponent} from './AnotherComponent'
import './styles.scss'
export class ReusableComponent extends React.Component {
    render() {
        return <div className="reusable-component">Hello, I'm a reusable component
    Helllo
            <AnotherComponent />
        </div>;
    }
}