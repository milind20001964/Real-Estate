import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListingScreen from './screens/ListingScreen';
import DetailsScreen from './screens/DetailsScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Listing">
        <Stack.Screen name="Listing" component={ListingScreen} options={{ title: 'Property Listings' }} />
        <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Property Details' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
