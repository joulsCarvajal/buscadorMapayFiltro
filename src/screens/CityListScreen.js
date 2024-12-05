import { useState, useMemo, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import SearchBar from '../components/SearchBar'
import CityList from '../components/CityList'

const CITIES_URL = "https://gist.githubusercontent.com/hernan-uala/dce8843a8edbe0b0018b32e137bc2b3a/raw/0996accf70cb0ca0e16f9a99e0ee185fafca7af1/cities.json"

export default function CityListScreen() {
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
  
    useEffect(() => {
      fetchCities();
    }, []);

    const fetchCities = async () => {
      try {
        const response = await fetch(CITIES_URL)
        const data = await response.json();
        setCities(data);
      } catch (error) {
        console.error('Error fetching cities', error);
      } finally {
        setLoading(false);
      }
    }

    const filteredCities = useMemo(() => {
        if (!searchQuery) return cities;
        const query = searchQuery.toLowerCase();
        return cities.filter(city => 
          city.name.toLowerCase().startsWith(query)
        );
      }, [searchQuery, cities]);

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
          />
          <CityList data={filteredCities} />
        </View>
      );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    centered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }
  });