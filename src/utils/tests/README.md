# Test Documentation

## Search Index Tests (`searchIndex.test.js`)

### Overview
Test suite for the CitySearchIndex class that handles city search functionality with optimized performance for 200,000+ entries.

### Test Cases

1. **Empty Search Query**
   - Test: `should return all cities when search query is empty`
   - Purpose: Verifies base case behavior
   - Expected: Returns complete list of cities

2. **Case-Insensitive Search**
   - Test: `should filter cities by prefix case-insensitive`
   - Purpose: Verifies search works regardless of case
   - Example: "am" matches "Amsterdam" and "Amstelveen"

3. **No Matches**
   - Test: `should return empty array when no matches found`
   - Purpose: Verifies behavior when no cities match search
   - Example: Searching "xyz" returns empty array

4. **Special Characters**
   - Test: `should handle special characters in city names`
   - Purpose: Verifies accent/diacritic handling
   - Example: "sao" matches "São Paulo"

5. **Exact Match**
   - Test: `should return exact match`
   - Purpose: Verifies precise search functionality
   - Example: "Berlin" returns only Berlin entry

### Running Tests
```bash
npm run test        # Single run
npm run test:watch  # Watch mode