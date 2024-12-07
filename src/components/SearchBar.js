import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function SearchBar({
  value,
  onChangeText,
  showOnlyFavorites,
  onToggleFavorites,
}) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder="Search cities..."
        placeholderTextColor="#666"
      />
      <TouchableOpacity 
        onPress={() => onToggleFavorites()}
        style={styles.favoriteButton}
      >
        <MaterialIcons
          name="star"
          size={24}
          color={showOnlyFavorites ? "#FFD700" : "#CCCCCC"}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 16,
    gap: 8,
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 16
  },
  favoriteButton: {
    padding: 8,
  }
});
