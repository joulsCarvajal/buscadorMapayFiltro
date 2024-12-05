import { VirtualizedList } from "react-native";
import { useState } from "react";
import CityItem from './CityItem';

export default function CityList({ data }) {
  const getItem = (data, index) => data[index];

  return (
    <VirtualizedList
      data={data}
      initialNumToRender={10}
      renderItem={({ item }) => (
        <CityItem 
          name={item.name}
          country={item.country}
          coord={item.coord}
        />
      )}
      keyExtractor={item => item._id.toString()}
      getItemCount={data => data.length}
      getItem={getItem}
    />
  );
}