import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ThemeContext } from 'react-native-elements';
import DrawerNavigator from './DrawerNavigator';
import Contribute from '../components/contributeQuestion/Contribute';
import Quiz from '../components/quiz/Quiz';
import { Header } from '../components/header';

const Drawer = createDrawerNavigator();

function RootNavigator() {
  const { theme } = useContext(ThemeContext);
  return (
    <NavigationContainer theme={{ colors: { background: theme.colors.white } }}>
      <Drawer.Navigator
        drawerContent={DrawerNavigator}
        drawerContentOptions={{
          activeTintColor: theme.colors.secondary,
          activeBackgroundColor: 'transparent',
          inactiveTintColor: theme.colors.grey0,
          inactiveBackgroundColor: 'transparent',
          backgroundColor: theme.colors.grey4,
          labelStyle: {
            fontSize: 15,
            marginLeft: 0,
          },
        }}
      >
        <Drawer.Screen name="Contribute" component={Contribute} />
        <Drawer.Screen name="Quiz" component={Quiz} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigator;