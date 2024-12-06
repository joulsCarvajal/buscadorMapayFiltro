import { useState, useMemo, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import SearchBar from "../components/SearchBar";
import CityList from "../components/CityList";
import { CitySearchIndex } from "../utils/searchIndex";
import { getFavorites, toggleFavorite } from "../utils/storage";

const CITIES_URL =
  "https://gist.githubusercontent.com/hernan-uala/dce8843a8edbe0b0018b32e137bc2b3a/raw/0996accf70cb0ca0e16f9a99e0ee185fafca7af1/cities.json";

export default function CityListScreen() {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchIndex, setSearchIndex] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  useEffect(() => {
    fetchCities();
    loadFavorites();
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

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
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
      />
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
});
