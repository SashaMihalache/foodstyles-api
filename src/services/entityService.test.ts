import { entityService } from './entityService';

describe('entityService', () => {
  describe('extractEntities', () => {
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
          city: { id: 1, name: 'London' },
          diet: { id: 1, name: 'Vegan' },
        },
        {
          city: { id: 1, name: 'London' },
          diet: { id: 2, name: 'Vegetarian' },
        },
      ];

      const result = await entityService.extractEntities(searchTerm);

      expect(result).toEqual(expected);
    });

    it('should handle multiple cities', async () => {
      const searchTerm = "McDonald's in London or Manchester";
      const expected = [
        {
          city: { id: 1, name: 'London' },
          brand: { id: 4, name: "McDonald's" },
        },
        {
          city: { id: 6, name: 'Manchester' },
          brand: { id: 4, name: "McDonald's" },
        },
      ];

      const result = await entityService.extractEntities(searchTerm);

      expect(result).toEqual(expected);
    });

    it('should split when a word resembles two seperate entities ', async () => {
      const searchTerm = 'sushi in london';
      const expected = [
        {
          city: { id: 1, name: 'London' },
          dishType: { id: 72, name: 'Sushi' },
        },
        {
          city: { id: 1, name: 'London' },
          brand: { id: 15, name: 'Sushimania' },
        },
      ];

      const result = await entityService.extractEntities(searchTerm);

      expect(result).toEqual(expected);
    });

    it('should split when a word resembles two seperate entities (multiple object types)', async () => {
      const searchTerm = 'vegan sushi in london';
      const expected = [
        {
          city: { id: 1, name: 'London' },
          diet: { id: 1, name: 'Vegan' },
          dishType: { id: 72, name: 'Sushi' },
        },
        {
          city: { id: 1, name: 'London' },
          diet: { id: 1, name: 'Vegan' },
          brand: { id: 15, name: 'Sushimania' },
        },
      ];

      const result = await entityService.extractEntities(searchTerm);

      expect(result).toEqual(expected);
    });
  });
});
