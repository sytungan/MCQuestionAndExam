import React, { Component } from 'react';
import { ThemeProvider } from 'react-native-elements';
import RootNavigator from './src/navigation/RootNavigator';
import Login from './src/components/login/Login'
import { View , Text } from 'react-native';
export default class App extends Component {
    render() {
    return (
        <ThemeProvider useDark={false}>
        {/* <RootNavigator />  */}
         <Login/> 
        
         </ThemeProvider> 
       
    );
    }
}