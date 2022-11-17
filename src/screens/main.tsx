import React from 'react';
import realm from '../realm/realm';
import Login from '../screens/login/LoginScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import ToDo from '../screens/taskOnDisplay/DisplayScreen';

const Stack = createNativeStackNavigator();

const Main = () => {
  const {RealmProvider} = realm;
  return (
    <RealmProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="ToDo" component={ToDo} />
        </Stack.Navigator>
      </NavigationContainer>
    </RealmProvider>
  );
};

export default Main;