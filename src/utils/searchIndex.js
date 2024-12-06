export class CitySearchIndex {
    constructor(cities) {
      this.index = new Map();
      this.buildIndex(cities);
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
      return this.index.get(prefix.toLowerCase()) || [];
    }
  }