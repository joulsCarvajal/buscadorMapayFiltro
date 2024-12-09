
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

  normalizeString(str) {
    return str.normalize('NFD')
             .replace(/[\u0300-\u036f]/g, '')
             .toLowerCase();
  }


  buildIndex(cities) {
    cities.forEach(city => {
      const name = this.normalizeString(city.name);
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
    const normalizedPrefix = this.normalizeString(prefix);
    return this.index.get(normalizedPrefix) || [];
  }
}
