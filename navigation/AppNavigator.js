import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { NetworkContext } from '../context/NetworkProvider';
import MainTabNavigator from './MainTabNavigator';
import ToastMessage from '../components/secondary/ToastMessage';

const Stack = createStackNavigator();

function AppNavigator() {
  const networkContext = useContext(NetworkContext);

  return (
    <>
      {!networkContext.isConnected && <ToastMessage message="You're currently offline." />}
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Root" component={MainTabNavigator} />
      </Stack.Navigator>
    </>
  );
}
export default AppNavigator;
