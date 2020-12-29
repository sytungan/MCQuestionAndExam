import React, { Component } from 'react';
import { ThemeProvider, Header } from 'react-native-elements';
import RootNavigator from './src/navigation/RootNavigator';
import Quiz from './src/components/quiz/Quiz';

export default class App extends Component {
    render() {
    return (
        <ThemeProvider useDark={false}>
        {/* <Header
        leftComponent={{ icon: 'menu', color: '#fff' }}
        centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
        rightComponent={{ icon: 'home', color: '#fff' }}
        /> */}
        <Quiz/>
        {/* <RootNavigator /> */}
        </ThemeProvider>
    );
    }
}