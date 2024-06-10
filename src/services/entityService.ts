import { entityRepository } from '../repositories';
import { EntityType, GroupEntity, Model } from '../types/entity';
import { filterStopWords } from '../utils/queries';

export const entityService = {
  async extractEntities(searchTerm: string) {
    const words = searchTerm.split(' ');
    const filteredWords = filterStopWords(words);

    const queryResults = (await entityRepository.aggregate(
      filteredWords
    )) as Model[];

    const groupedEntities = this.groupEntitiesByType(queryResults);
    const result = this.generateCombinationsRecursively(groupedEntities);

    return result;
  },

  groupEntitiesByType(entities: any[]) {
    const groupedByTypes: any = {};

    for (let i = 0; i < entities.length; i++) {
      const entity: Model = entities[i];
      const thinnedEntity: Omit<Model, 'type'> = {
        id: entity.id,
        name: entity.name,
      };

      if (groupedByTypes[entity.type]) {
        groupedByTypes[entity.type].push(thinnedEntity);
      } else {
        groupedByTypes[entity.type] = [thinnedEntity];
      }
    }

    return groupedByTypes;
  },

  generateCombinationsRecursively(data: GroupEntity) {
    const keys = Object.keys(data);
    const result: any[] = [];

    const helper = (current: any, usedWords: string[], index: number) => {
      if (index === keys.length) {
        result.push({ ...current });
        return;
      }

      const key = keys[index];
      const values = data[key];

      for (let i = 0; i < values.length; i++) {
        const value = values[i];
        if (usedWords.includes(value.name.toLocaleLowerCase())) {
          continue;
        }

        current[key] = value;
        usedWords.push(value.name.toLocaleLowerCase());
        helper(current, usedWords, index + 1);
      }
    };

    helper({}, [], 0);

    return result;
  },
};
