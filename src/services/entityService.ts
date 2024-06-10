import { entityRepository } from '../repositories';

export const entityService = {
  async extractEntities(searchTerm: string) {
    const words = searchTerm.split(' ');
    const combinations: any[] = [];

    const queryResults = (await entityRepository.aggregate(words)) as any[];

    queryResults.forEach((result) => {
      const combination =
        combinations.find((combo) => !combo.hasOwnProperty(result.type)) || {};

      combination[result.type] = { id: result.id, name: result.name };
      combinations.push(combination);
    });

    return combinations;
  },
};
