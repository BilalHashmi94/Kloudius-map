import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {useSelector} from 'react-redux';
// import {RootState} from './src/store'; // Update this path based on your store setup
import Home from '../screens/Home';

const Stack = createNativeStackNavigator();

const UserStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

const AppNavigation: React.FC = () => {
  return (
    <>
      <NavigationContainer
        // ref={ref => NavigationService.setTopLevelNavigator(ref)}
        >
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName="UserStack">
          <Stack.Screen name="UserStack" component={UserStack} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default AppNavigation;
