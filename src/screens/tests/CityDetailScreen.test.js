import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import CityDetailScreen from "../CityDetailScreen";
import { getFavorites, toggleFavorite } from "../../utils/storage";

// Mock para expo/vector-icons
jest.mock("@expo/vector-icons", () => ({
    MaterialIcons: 'MockedMaterialIcons'
  }));

// Mock para expo-font
jest.mock("expo-font", () => ({
  isLoaded: jest.fn().mockReturnValue(true),
  loadAsync: jest.fn().mockResolvedValue(true),
}));

// Mock para react-native-maps
jest.mock("react-native-maps", () => {
  const { View } = require("react-native");
  const MockMapView = props => <View {...props} />;
  MockMapView.Marker = props => <View {...props} />;
  return MockMapView;
});

// Mock para AsyncStorage
jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

// Mock para storage utils
jest.mock("../../utils/storage", () => ({
  getFavorites: jest.fn(),
  toggleFavorite: jest.fn(),
}));

const mockRoute = {
  params: {
    city: {
      id: 1,
      name: "Test City",
      country: "TC",
      coord: {
        lat: 40.7128,
        lon: -74.006,
      },
    },
  },
};

const mockNavigation = {
  setOptions: jest.fn(),
};

describe("CityDetailScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    getFavorites.mockResolvedValue([]);
  });

  it("renders correctly with city information", async () => {
    const { getByText } = render(
      <CityDetailScreen
        route={mockRoute}
        navigation={mockNavigation}
      />
    );

    await waitFor(() => {
      expect(getByText("Test City, TC")).toBeTruthy();
      expect(getByText("Coordenadas")).toBeTruthy();
      expect(getByText("Latitud: 40.7128")).toBeTruthy();
      expect(getByText("Longitud: -74.006")).toBeTruthy();
    });
  });

  it("handles favorite toggling correctly", async () => {
    toggleFavorite.mockResolvedValue(["1"]);
    const { getByTestId } = render(
      <CityDetailScreen
        route={mockRoute}
        navigation={mockNavigation}
      />
    );

    await waitFor(() => {
      const favoriteButton = getByTestId("favorite-button");
      fireEvent.press(favoriteButton);
      expect(toggleFavorite).toHaveBeenCalledWith(1);
    });
  });

  

  it('adjusts layout based on orientation', async () => {
    // Setup inicial - Portrait mode
    const mockUseWindowDimensions = jest.fn();
    mockUseWindowDimensions.mockReturnValue({ width: 400, height: 800 });
    jest.spyOn(require('react-native'), 'useWindowDimensions')
        .mockImplementation(mockUseWindowDimensions);

    const { getByTestId, rerender } = render(
        <CityDetailScreen route={mockRoute} navigation={mockNavigation} />
    );

    // Verificar modo portrait
    await waitFor(() => {
        const mapContainer = getByTestId("map-container");
        expect(mapContainer.props.style[1]).toEqual({ height: "40%" });
    });

    // Cambiar a landscape
    mockUseWindowDimensions.mockReturnValue({ width: 800, height: 400 });
    
    // Forzar actualización del componente
    rerender(
        <CityDetailScreen 
            route={{ 
                ...mockRoute, 
                key: 'forceUpdate' 
            }} 
            navigation={mockNavigation} 
        />
    );

    // Verificar modo landscape
    await waitFor(() => {
        const mapContainer = getByTestId("map-container");
        const styles = mapContainer.props.style;
        expect(styles).toEqual([
            { flex: 1 },
            { width: "50%", position: "absolute", top: 0, bottom: 0, left: 0 }
        ]);
    }, {
        timeout: 2000,
        interval: 100
    });
});




  it('loads favorite state correctly on mount', async () => {
    getFavorites.mockResolvedValue(['1']);

    const { getByTestId } = render(
      <CityDetailScreen
        route={mockRoute}
        navigation={mockNavigation}
      />
    );

    await waitFor(() => {
        const favoriteIcon = getByTestId('favorite-icon');
        expect(favoriteIcon.props.name).toBe('star');
      }, { timeout: 3000 });
  });
});
