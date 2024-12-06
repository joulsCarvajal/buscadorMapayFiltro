import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function CityItem({
  id,
  name,
  country,
  coord,
  isFavorite,
  onToggleFavorite,
  onPress,
  navigation
}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.content} onPress={onPress}>
        <Text style={styles.title}>
          {name}, {country}
        </Text>
        <Text style={styles.subtitle}>
          {coord.lat.toFixed(6)}, {coord.lon.toFixed(6)}
        </Text>
      </TouchableOpacity>
      <View style={styles.actions}>
        <TouchableOpacity 
          onPress={() => onToggleFavorite(id)}
        >
          <MaterialIcons
            name={isFavorite ? "star" : "star-outline"}
            size={24}
            color={isFavorite ? "#FFD700" : "#CCCCCC"}
          />
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => navigation.navigate('CityDetail', { 
            city: { id, name, country, coord },
            isFavorite,
            onToggleFavorite
          })}
          style={styles.infoButton}
        >
          <MaterialIcons name="info" size={24} color="#666" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    alignItems: "center",
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionButton: {
    padding: 4,
    marginLeft: 8,
  },
});
