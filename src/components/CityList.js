import { VirtualizedList } from "react-native";
import { useState } from "react";
import CityItem from './CityItem';

export default function CityList({ data, favorites, onToggleFavorite, navigation }) {
  const getItem = (data, index) => data[index];

  return (
    <VirtualizedList
      data={data}
      initialNumToRender={10}
      renderItem={({ item }) => (
        <CityItem 
          id={item._id}
          name={item.name}
          country={item.country}
          coord={item.coord}
          isFavorite={favorites.has(item._id.toString())}
          onToggleFavorite={onToggleFavorite}
          onPress={() => navigation.navigate('Map', { city: item })}
          navigation={navigation}
        />
      )}
      keyExtractor={item => item._id.toString()}
      getItemCount={data => data.length}
      getItem={getItem}
    />
  );
}