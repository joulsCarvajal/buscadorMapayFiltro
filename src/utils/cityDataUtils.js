export const filterCities = (cities, searchQuery) => {
    const query = searchQuery.toLowerCase();
    return cities.filter((city) => 
        city.name.toLowerCase().startsWith(query)
    );
};

export const sortCities = (cities) => {
    return [...cities].sort((a,b) => {
        const cityA = `${a.name}, ${a.country}`;
        const cityB = `${b.name}, ${b.country}`;
        return cityA.localeCompare(cityB);
    });
};