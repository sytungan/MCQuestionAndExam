import React, { Component} from 'react';
import { ThemeProvider} from 'react-native-elements';
import RootNavigator from './src/navigation/RootNavigator';
import Quiz from './src/components/quiz/Quiz';
import Login from './src/components/login/Login';
import Exam from './src/components/exam/Exam';
import Contribute from './src/components/contributeQuestion/Contribute'
import { View , Text, SafeAreaView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/components/Home';


export default class App extends Component {
    render() {    
    const Stack = createStackNavigator();
    return (
        <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Exam" component={Exam} />
            <Stack.Screen name="Quiz" component={Quiz} />
            <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    );
    }
}