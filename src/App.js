import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { GlobalProvider } from './context/Provider';
import HomeScreen from './screens/HomeScreen';
import RequestScreen from './screens/RequestScreen';
import SmartConfig from './screens/SmartConfig';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <GlobalProvider>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="RequestScreen" component={RequestScreen} />
                    <Stack.Screen name="SmartConfig" component={SmartConfig} />
                </Stack.Navigator>
            </NavigationContainer>
        </GlobalProvider>
    );
}
