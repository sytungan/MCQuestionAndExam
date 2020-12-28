import React, { Component } from 'react';
import { ThemeProvider } from 'react-native-elements';
import RootNavigator from './src/navigation/RootNavigator';

export default class App extends Component {
    render() {
    return (
        <ThemeProvider useDark={false}>
        <RootNavigator />
        </ThemeProvider>
    );
    }
}