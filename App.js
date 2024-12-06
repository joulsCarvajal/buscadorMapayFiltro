import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from  '@react-navigation/native-stack';
import CityListScreen from './src/screens/CityListScreen';
import MapScreen from './src/screens/MapScreen';
import CityDetailScreen from './src/screens/CityDetailScreen';
import { Dimensions } from 'react-native';
import { useState, useEffect } from 'react';

const Stack = createNativeStackNavigator();

export default function App() {

  const [isLandscape, setIsLandscape] = useState(
    Dimensions.get('window').width > Dimensions.get('window').height
  );

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setIsLandscape(window.width > window.height);
    });

    return () => subscription.remove();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Cities" component={CityListScreen} />
        <Stack.Screen 
          name="Map" 
          component={MapScreen}
          options={{
            presentation: isLandscape ? 'modal' : 'card'
          }}
        />
        <Stack.Screen 
          name="CityDetail" 
          component={CityDetailScreen} 
          options={{ title: 'Detalles' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}