export class CitySearchIndex {
  constructor(cities) {
    this.index = new Map();

    // Order city first 
    this.sortedCities = cities.sort((a, b) => {
      const cityCompare = a.name.localeCompare(b.name);
      if (cityCompare !== 0) return cityCompare;
      return a.country.localeCompare(b.country);
    });

    this.buildIndex(this.sortedCities);
  }

  buildIndex(cities) {
    cities.forEach(city => {
      const name = city.name.toLowerCase();
      for (let i = 1; i <= name.length; i++) {
        const prefix = name.slice(0, i);
        if (!this.index.has(prefix)) {
          this.index.set(prefix, []);
        }
        this.index.get(prefix).push(city);
      }
    });
  }

  search(prefix) {
    if (!prefix) return this.sortedCities;
    return this.index.get(prefix.toLowerCase()) || [];
  }
}
