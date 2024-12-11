import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import { useState, useEffect } from "react";
import { useWindowDimensions } from "react-native";
import { getFavorites, toggleFavorite } from "../utils/storage";

export default function CityDetailScreen({ route, navigation }) {
  const { width, height } = useWindowDimensions();
  const [isLandscape, setIsLandscape] = useState(width > height);

  const { city } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsLandscape(width > height);
  }, [width, height]);

  useEffect(() => {
    const checkFavorite = async () => {
      try {
        const favs = await getFavorites();
        setIsFavorite(favs.includes(city.id.toString()));
      } catch (error) {
        console.error("Error checking favorites:", error);
      }
    };

    checkFavorite();
  }, [city.id]);

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setIsLandscape(window.width > window.height);
    });

    return () => subscription.remove();
  }, []);

  const handleToggleFavorite = async () => {
    const newFavs = await toggleFavorite(city.id);
    setIsFavorite(newFavs.includes(city.id.toString()));
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.mapContainer,
          isLandscape ? styles.mapLandscape : styles.mapPortrait,
        ]}
        testID="map-container"
      >
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
          />
        </MapView>
      </View>

      <View
        style={[
          styles.infoContainer,
          isLandscape ? styles.infoLandscape : styles.infoPortrait,
        ]}
      >
        <View
          style={styles.headerContainer}
          testID="header-container"
        >
          <Text style={styles.title}>
            {city.name}, {city.country}
          </Text>
          <TouchableOpacity
            onPress={handleToggleFavorite}
            testID="favorite-button"
          >
            <MaterialIcons
              testID="favorite-icon"
              name={isFavorite ? "star" : "star-outline"}
              size={24}
              color="#FFD700"
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.subtitle}>Coordenadas</Text>
        <Text style={styles.coordinates}>Latitud: {city.coord.lat}</Text>
        <Text style={styles.coordinates}>Longitud: {city.coord.lon}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  mapContainer: {
    flex: 1,
  },
  mapPortrait: {
    height: "40%",
  },
  mapLandscape: {
    width: "50%",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
  },
  map: {
    flex: 1,
  },
  infoContainer: {
    padding: 16,
  },
  infoPortrait: {
    height: "60%",
  },
  infoLandscape: {
    width: "50%",
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 8,
  },
  coordinates: {
    fontSize: 16,
    color: "#666",
    marginBottom: 4,
  },
});
