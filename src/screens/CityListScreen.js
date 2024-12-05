import { useState, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { filterCities, sortCities } from "../utils/cityDataUtils";
import CityList from '../components/CityList'
import SearchBar from '../components/SearchBar'

export default function CityListScreen() {
    const [searchQuery, setSearchQuery] = useState('');
    const testData = [
      {
        "_id": 1,
        "name": "Amsterdam",
        "country": "NL",
        "coord": { "lat": 52.374031, "lon": 4.88969 }
      },
      {
        "_id": 2,
        "name": "Berlin",
        "country": "DE",
        "coord": { "lat": 52.520008, "lon": 13.404954 }
      }
    ];
  
    return (
      <View style={styles.container}>
        <SearchBar 
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <CityList data={testData} />
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    }
  });