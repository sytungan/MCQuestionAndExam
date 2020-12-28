import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ThemeContext } from 'react-native-elements';
import DrawerNavigator from './DrawerNavigator';

import CheckNee from '../containers/test';
import Login from '../components/login/Login';

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
        <Drawer.Screen name="Avatars" component={CheckNee} />
        <Drawer.Screen name="Login" component={Login} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigator;