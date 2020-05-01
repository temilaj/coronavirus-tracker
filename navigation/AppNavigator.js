import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MainTabNavigator from './MainTabNavigator';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen name="Root" component={MainTabNavigator} />
      </Stack.Navigator>
    </>
  );
}
export default AppNavigator;
