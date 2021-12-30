import {
  createNativeStackNavigator,
  NavigationContainer,
} from '@react-navigation/native';
import React from 'react';
import {StyleSheet} from 'react-native';
import {GlobalProvider} from './context/Provider';
import HomeScreen from './screens/HomeScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <GlobalProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalProvider>
  );
};

export default App;
