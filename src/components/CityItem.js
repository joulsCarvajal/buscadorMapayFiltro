import { View, Text, StyleSheet} from 'react-native';

export default function CityItem({ name, country, coord }) {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.tittle}>{" "}{name}, {country}</Text>
      </View>
      <Text style={styles.subtitle}>
        {coord.lat.toFixed(6)}, {coord.lon.toFixed(6)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    tittle: {
        fontSize: 16,
        fontWeight: '500',
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
});