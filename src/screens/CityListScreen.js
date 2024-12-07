import { useState, useMemo, useEffect } from "react";
import MapView, { Marker } from 'react-native-maps';
import { View, StyleSheet, ActivityIndicator, useWindowDimensions, Dimensions } from "react-native";
import SearchBar from "../components/SearchBar";
import CityList from "../components/CityList";
import { CitySearchIndex } from "../utils/searchIndex";
import { getFavorites, toggleFavorite } from "../utils/storage";

const CITIES_URL =
  "https://gist.githubusercontent.com/hernan-uala/dce8843a8edbe0b0018b32e137bc2b3a/raw/0996accf70cb0ca0e16f9a99e0ee185fafca7af1/cities.json";

export default function CityListScreen({ navigation }) {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchIndex, setSearchIndex] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const { width, height } = useWindowDimensions();
  const [isLandscape, setIsLandscape] = useState(width > height);
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    fetchCities();
    loadFavorites();

    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setIsLandscape(window.width > window.height);
    });

  }, []);

  const loadFavorites = async () => {
    const favs = await getFavorites();
    setFavorites(new Set(favs));
  };

  const fetchCities = async () => {
    try {
      const response = await fetch(CITIES_URL);
      const data = await response.json();
      setCities(data);
      setSearchIndex(new CitySearchIndex(data));
    } catch (error) {
      console.error("Error fetching cities", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavorite = async (cityId) => {
    try {
      const newFavs = await toggleFavorite(cityId);
      setFavorites(new Set(newFavs));
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const filteredCities = useMemo(() => {
    let results = searchIndex ? searchIndex.search(searchQuery) : cities;

    if (showOnlyFavorites) {
      results = results.filter(city => {
        const cityId = city._id.toString();
        return Array.from(favorites).includes(cityId);
      });
    }

    return results;
  }, [searchIndex, searchQuery, showOnlyFavorites, favorites, cities]);

  const handleCityPress = (city) => {
    if (isLandscape) {
      setSelectedCity(city);
    } else {
      navigation.navigate('Map', { 
        city: city,
        isFavorite: favorites.has(city._id.toString()),
        onToggleFavorite: handleToggleFavorite
      });
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isLandscape ? (
        <View style={styles.landscapeContainer}>
          <View style={styles.listContainerLandscape}>
            <SearchBar 
              value={searchQuery}
              onChangeText={setSearchQuery}
              showOnlyFavorites={showOnlyFavorites}
              onToggleFavorites={() => setShowOnlyFavorites(!showOnlyFavorites)}
            />
            <CityList 
              data={filteredCities}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              navigation={navigation}
              onPress={handleCityPress}
            />
          </View>
          <View style={styles.mapContainerLandscape}>
            <MapView
              style={styles.map}
              region={selectedCity ? {
                latitude: selectedCity.coord.lat,
                longitude: selectedCity.coord.lon,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              } : null}
            >
              {selectedCity && (
                <Marker
                  coordinate={{
                    latitude: selectedCity.coord.lat,
                    longitude: selectedCity.coord.lon,
                  }}
                  title={selectedCity.name}
                />
              )}
            </MapView>
          </View>
        </View>
      ) : (
        <View style={styles.portraitContainer}>
          <SearchBar 
            value={searchQuery}
            onChangeText={setSearchQuery}
            showOnlyFavorites={showOnlyFavorites}
            onToggleFavorites={() => setShowOnlyFavorites(!showOnlyFavorites)}
          />
          <CityList 
            data={filteredCities}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            navigation={navigation}
            onPress={handleCityPress}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  portraitContainer: {
    flex: 1,
  },
  landscapeContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  listContainerLandscape: {
    width: '50%',
    borderRightWidth: 1,
    borderRightColor: '#eee',
  },
  mapContainerLandscape: {
    width: '50%',
  },
  map: {
    flex: 1,
  }
});

