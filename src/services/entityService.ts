import { entityRepository } from '../repositories';
import { EntityType, GroupEntity, Model } from '../types/entity';
import { filterStopWords } from '../utils/queries';

export const entityService = {
  async extractEntities(searchTerm: string) {
    if (!searchTerm) {
      return {};
    }

    const words = searchTerm.split(' ');
    const filteredWords = filterStopWords(words);

    const queryResults = (await entityRepository.aggregate(
      filteredWords
    )) as Model[];

    const result = this.generateCombinationsRecursively(queryResults);

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

  generateCombinationsRecursively(data: any[]) {
    const result: any[] = [];
    const uniqueTypes = this.filterUniqueTypes(data);

    const helper = (acc: any, usedWords: string[], index: number) => {
      if (index === data.length) {
        if (Object.keys(acc).length === uniqueTypes.length) {
          result.push({ ...acc });
        }
        return;
      }

      const { name, id, type } = data[index];
      if (
        usedWords.findIndex((word) =>
          word.includes(name.toLocaleLowerCase())
        ) !== -1
      ) {
        helper(acc, usedWords, index + 1);
      } else {
        acc[type] = { id, name };
        usedWords.push(name.toLocaleLowerCase());
        helper(acc, usedWords, index + 1);
        delete acc[type];
        usedWords.pop();
        helper(acc, usedWords, index + 1);
      }
    };

    helper({}, [], 0);

    return result;
  },

  filterUniqueTypes(data: any[]) {
    let uniqueTypes = [...new Set(data.map((item) => item.type))];
    let typesToRemove = new Set();

    for (let i = 0; i < data.length; i++) {
      for (let j = i + 1; j < data.length; j++) {
        if (
          data[i].name
            .toLocaleLowerCase()
            .includes(data[j].name.toLocaleLowerCase()) ||
          data[j].name
            .toLocaleLowerCase()
            .includes(data[i].name.toLocaleLowerCase())
        ) {
          typesToRemove.add(data[j].type);
        }
      }
    }

    uniqueTypes = uniqueTypes.filter((type) => !typesToRemove.has(type));

    return uniqueTypes;
  },
};
