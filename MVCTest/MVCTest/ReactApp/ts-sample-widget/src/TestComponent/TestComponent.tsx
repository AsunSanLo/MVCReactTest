import React from 'react';
export interface ITestComponentProps {
    name: string;
}

export const TestComponent = (props: ITestComponentProps ) => {
    return <div>Hello {props.name}!!</div>
};