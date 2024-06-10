import { entityRepository } from '../repositories';

export const entityService = {
  async extractEntities(searchTerm: string) {
    const entities = await entityRepository.getAllModels();

    return entities;
  },
};
