import { TextInput, StyleSheet } from "react-native";

export default function SearchBar({ value, onChangeText }) {
    return (
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder="Search cities..."
        placeholderTextColor="#666"
      />
    );
  }

  const styles = StyleSheet.create({
    input: {
      height: 50,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      paddingHorizontal: 16,
      margin: 16,
      fontSize: 16,
    }
  });