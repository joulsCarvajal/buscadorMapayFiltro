import { VirtualizedList } from "react-native";
import { useState } from "react";
import CityItem from './CityItem';

export default function CityList({ data }) {
    const getItem = (data, index) => ({
      id: data[index]._id.toString(), // Convert to string
      country: data[index].country,
      name: data[index].name,
      coord: data[index].coord
    });
  
    const getItemCount = (data) => data.length;
  
    return (
      <VirtualizedList
        data={data}
        initialNumToRender={10}
        renderItem={({ item }) => (
          <CityItem 
            key={item.id}  // Add key prop here
            name={item.name}
            country={item.country}
            coord={item.coord}
          />
        )}
        keyExtractor={item => item.id.toString()}  // Ensure string
        getItemCount={getItemCount}
        getItem={getItem}
        maxToRenderPerBatch={10}
        windowSize={5}
      />
    );
  }