import { CitySearchIndex } from "../searchIndex";

/**
 * @description Test suite for CitySearchIndex
 * This set of tests verifies the search functionality for the city filtering system
 */

describe("CitySearchIndex", () => {

    /**
   * Test data representing a sample of cities
   * Used across all test cases
   */

  const testData = [
    {
      _id: 1,
      name: "Amsterdam",
      country: "NL",
      coord: { lat: 52.374031, lon: 4.88969 },
    },
    {
      _id: 2,
      name: "Berlin",
      country: "DE",
      coord: { lat: 52.520008, lon: 13.404954 },
    },
    {
      _id: 3,
      name: "Amstelveen",
      country: "NL",
      coord: { lat: 52.3114207, lon: 4.8555778 },
    },
  ];

  let searchIndex;

  beforeEach(() => {
    searchIndex = new CitySearchIndex(testData);
  });

  /**
   * @test Empty search query should return all cities
   * @expected Returns the complete list of cities when no search term is provided
   */

  test('debería retornar todas las ciudades cuando el buscador este vacío', () => {
    const results = searchIndex.search("");
    expect(results).toHaveLength(3);
  });

  /**
   * @test Case-insensitive prefix search
   * @expected Returns cities that start with the search term, regardless of case
   */


  test('should filter cities by prefix case-insensitive', () => {
    const results = searchIndex.search('am');
    expect(results).toHaveLength(2);
    expect(results.map(city => city.name)).toContain('Amsterdam');
    expect(results.map(city => city.name)).toContain('Amstelveen');
  });

  test('should return empty array when no matches found', () => {
    const results = searchIndex.search('xyz');
    expect(results).toHaveLength(0);
  });

  test('should handle special characters in city names', () => {
    const dataWithSpecialChars = [
      ...testData,
      {
        "_id": 4,
        "name": "São Paulo",
        "country": "BR",
        "coord": { "lat": -23.550520, "lon": -46.633308 }
      }
    ];
    const indexWithSpecialChars = new CitySearchIndex(dataWithSpecialChars);
    const results = indexWithSpecialChars.search('sao');
    expect(results).toHaveLength(1);
    expect(results[0].name).toBe('São Paulo');
  });

  test('should return exact match', () => {
    const results = searchIndex.search('Berlin');
    expect(results).toHaveLength(1);
    expect(results[0].name).toBe('Berlin');
  });

});
