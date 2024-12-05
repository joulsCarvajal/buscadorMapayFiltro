import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from  '@react-navigation/native-stack';
import CityListScreen from './src/screens/CityListScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Cities" component={CityListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}