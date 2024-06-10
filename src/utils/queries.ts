import { Prisma } from '@prisma/client';
import { STOP_WORDS } from './constants';

export const buildAggregationQuery = (words: string[]) => {
  let mainQuery: any;
  const query = `
  SELECT * FROM (
    SELECT 'city' as type, id, name From "City" WHERE name ILIKE ANY(ARRAY[$1]) UNION ALL
    SELECT 'brand' as type, id, name From "Brand" WHERE name ILIKE ANY(ARRAY[$1]) UNION ALL
    SELECT 'dishType' as type, id, name From "DishType" WHERE name ILIKE ANY(ARRAY[$1]) UNION ALL
    SELECT 'diet' as type, id, name From "Diet" WHERE name ILIKE ANY(ARRAY[$1])
  ) AS result
  ORDER BY LENGTH(name) DESC
  `;

  mainQuery = Prisma.raw(query);
  mainQuery.values = [words.map((word) => `%${word}%`)];

  return mainQuery;
};

export const filterStopWords = (words: string[]) => {
  return words.filter((word) => !STOP_WORDS.includes(word));
};
