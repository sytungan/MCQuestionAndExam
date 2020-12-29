import React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Quiz from './quiz/Quiz';
import Contribute  from './contributeQuestion/Contribute'; 
import Exam  from './exam/Exam';

const Tab = createBottomTabNavigator();
const Home = ({navigation}) => {
  return (
      <Tab.Navigator>
        <Tab.Screen name="Quiz" component={Quiz} />
        <Tab.Screen name="Contribute" component={Contribute} />
        <Tab.Screen name="Exam" component={Exam} />
      </Tab.Navigator>

  );
}
export default Home