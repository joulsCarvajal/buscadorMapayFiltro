jest.mock('react-native-maps', () => {
    const { View } = require('react-native');
    return {
      __esModule: true,
      default: View,
      MapView: View,
      Marker: View,
    };
  });