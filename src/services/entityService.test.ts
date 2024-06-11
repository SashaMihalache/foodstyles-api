import { entityService } from './entityService';

describe('entityService', () => {
  describe('extractEntities', () => {
    it('should handle empty search term', async () => {
      const searchTerm = '';
      const expected = {};
      const result = await entityService.extractEntities(searchTerm);

      expect(result).toEqual(expected);
    });

    it('should return only McD', async () => {
      const searchTerm = "McDonald's";
      const expected = [{ brand: { id: 4, name: "McDonald's" } }];
      const result = await entityService.extractEntities(searchTerm);

      expect(result).toEqual(expected);
    });

    it('should return a tuple for a brand + city', async () => {
      const searchTerm = "McDonald's in London";
      const expected = [
        {
          city: { id: 1, name: 'London' },
          brand: { id: 4, name: "McDonald's" },
        },
      ];
      const result = await entityService.extractEntities(searchTerm);

      expect(result).toEqual(expected);
    });

    it('should handle no more that one of a kind ', async () => {
      const searchTerm = 'veg london';
      const expected = [
        {
          diet: {
            id: 2,
            name: 'Vegetarian',
          },
          city: {
            id: 1,
            name: 'London',
          },
        },
        {
          city: {
            id: 1,
            name: 'London',
          },
          diet: {
            id: 1,
            name: 'Vegan',
          },
        },
      ];

      const result = await entityService.extractEntities(searchTerm);

      expect(result).toEqual(expected);
    });

    it('should handle multiple cities', async () => {
      const searchTerm = "McDonald's in London or Manchester";
      const expected = [
        {
          city: {
            id: 6,
            name: 'Manchester',
          },
          brand: {
            id: 4,
            name: "McDonald's",
          },
        },
        {
          brand: {
            id: 4,
            name: "McDonald's",
          },
          city: {
            id: 1,
            name: 'London',
          },
        },
      ];

      const result = await entityService.extractEntities(searchTerm);

      expect(result).toEqual(expected);
    });

    it('should split when a word resembles two seperate entities ', async () => {
      const searchTerm = 'sushi in london';
      const expected = [
        {
          brand: {
            id: 15,
            name: 'Sushimania',
          },
          city: {
            id: 1,
            name: 'London',
          },
        },
        {
          city: {
            id: 1,
            name: 'London',
          },
          dishType: {
            id: 72,
            name: 'Sushi',
          },
        },
      ];

      const result = await entityService.extractEntities(searchTerm);

      expect(result).toEqual(expected);
    });

    it('should split when a word resembles two seperate entities (multiple object types)', async () => {
      const searchTerm = 'vegan sushi in london';
      const expected = [
        {
          brand: {
            id: 15,
            name: 'Sushimania',
          },
          city: {
            id: 1,
            name: 'London',
          },
          diet: {
            id: 1,
            name: 'Vegan',
          },
        },
        {
          city: {
            id: 1,
            name: 'London',
          },
          dishType: {
            id: 72,
            name: 'Sushi',
          },
          diet: {
            id: 1,
            name: 'Vegan',
          },
        },
      ];

      const result = await entityService.extractEntities(searchTerm);

      expect(result).toEqual(expected);
    });
  });
});
