import { useState, useMemo } from "react";
import { View, StyleSheet } from "react-native";
import SearchBar from '../components/SearchBar'
import CityList from '../components/CityList'

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
      },
      {
        "_id": 3,
        "name": "Colombia",
        "country": "COL",
        "coord": { "lat": 52.520408, "lon": 13.403954 }
      },
      {
        "_id": 4,
        "name": "España",
        "country": "ESP",
        "coord": { "lat": 52.525008, "lon": 12.404954 }
      },
      {
        "_id": 5,
        "name": "Dinamarca",
        "country": "DIN",
        "coord": { "lat": 52.520004, "lon": 13.405954 }
      },{
        "_id": 6,
        "name": "Rusia",
        "country": "RUS",
        "coord": { "lat": 52.521008, "lon": 13.4049454 }
      },{
        "_id": 7,
        "name": "Bélgica",
        "country": "BEL",
        "coord": { "lat": 52.520008, "lon": 13.404914 }
      },
      {
        "_id": 8,
        "name": "Italia",
        "country": "ITA",
        "coord": { "lat": 52.524008, "lon": 13.404554 }
      },
      {
        "_id": 9,
        "name": "Estados Unidos",
        "country": "EEUU",
        "coord": { "lat": 52.524008, "lon": 13.404554 }
      },
      {
        "_id": 10,
        "name": "México",
        "country": "MEX",
        "coord": { "lat": 52.524008, "lon": 13.404554 }
      }
    ];
  
    const filteredCities = useMemo(() => {
        if (!searchQuery) return testData;
        const query = searchQuery.toLowerCase();
        return testData.filter(city => 
          city.name.toLowerCase().startsWith(query)
        );
      }, [searchQuery, testData]);
    
      return (
        <View style={styles.container}>
          <SearchBar 
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search cities..."
          />
          <CityList data={filteredCities} />
        </View>
      );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    }
  });