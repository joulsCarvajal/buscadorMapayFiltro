import AsyncStorage from "@react-native-async-storage/async-storage";

const FAVORITES_KEY = "favorites";

export const getFavorites = async () => {
  try {
    const favs = await AsyncStorage.getItem(FAVORITES_KEY);
    return favs ? JSON.parse(favs) : [];
  } catch {
    return [];
  }
};

export const toggleFavorite = async (cityId) => {
  try {
    const favs = await getFavorites();
    const cityIdString = cityId.toString();
    const newFavs = favs.includes(cityIdString)
      ? favs.filter(id => id !== cityIdString)
      : [...favs, cityIdString];
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavs));
    return newFavs;
  } catch (error) {
    console.error("Error in toggleFavorite:", error);
    return [];
  }
};
