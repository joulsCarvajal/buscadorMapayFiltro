import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function CityItem({ id, name, country, coord, isFavorite, onToggleFavorite }) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{name}, {country}</Text>
        <Text style={styles.subtitle}>
          {coord.lat.toFixed(6)}, {coord.lon.toFixed(6)}
        </Text>
      </View>
      <TouchableOpacity onPress={() => onToggleFavorite(id)}>
        <MaterialIcons 
          name={isFavorite ? "star" : "star-outline"}
          size={24} 
          color={isFavorite ? "#FFD700" : "#CCCCCC"} 
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    content: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
});