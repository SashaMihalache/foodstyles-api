import { entityRepository } from '../repositories';
import { EntityType, GroupEntity, Model } from '../types/entity';
import { filterStopWords } from '../utils/queries';
import { isSimilar } from '../utils/string';

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

    const result = this.createCombinations(queryResults);

    return result;
  },

  createCombinations(data: Model[]) {
    const results: any[] = [];
    const maxComboSize = this.getPossibleCombinations(data);

    for (let i = 0; i < data.length; i++) {
      const currentItem = data[i];
      const accumulator: any = {};

      accumulator[currentItem.type] = this.createNode(currentItem);

      for (let j = i + 1; j < data.length; j++) {
        const nextItem = data[j];

        if (accumulator[nextItem.type]) {
          break;
        }

        if (isSimilar(currentItem.name, nextItem.name)) {
          continue;
        } else {
          accumulator[nextItem.type] = this.createNode(nextItem);
        }
      }

      if (Object.keys(accumulator).length === maxComboSize) {
        results.push(accumulator);
      }
    }

    return results;
  },

  createNode(data: Model) {
    return {
      id: data.id,
      name: data.name,
    };
  },

  getPossibleCombinations(data: Model[]) {
    let nrOfCombinations = data
      .map((item) => item.type)
      .filter((value, index, self) => self.indexOf(value) === index).length;

    for (let i = 0; i < data.length; i++) {
      for (let j = i + 1; j < data.length; j++) {
        if (isSimilar(data[i].name, data[j].name)) {
          nrOfCombinations--;
        }
      }
    }

    return nrOfCombinations;
  },
};
