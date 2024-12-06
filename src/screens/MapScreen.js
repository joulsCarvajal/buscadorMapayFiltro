import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    map: {
      width: '100%',
      height: '100%',
    },
  });

  export default function MapScreen({ route }) {
    const { city } = route.params;
  
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: city.coord.lat,
            longitude: city.coord.lon,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: city.coord.lat,
              longitude: city.coord.lon,
            }}
            title={city.name}
            description={`${city.name}, ${city.country}`}
          />
        </MapView>
      </View>
    );
  }