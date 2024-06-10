import prisma from '../../prisma/client';
import { buildAggregationQuery } from '../utils/queries';

export const entityRepository = {
  async aggregate(words: string[]) {
    // const word = `%${words[0]}%`;

    // const results = await prisma.$queryRaw`
    //   SELECT 'city' as type, id, name FROM "City" WHERE name LIKE ${word}
    //   UNION ALL
    //   SELECT 'brand' as type, id, name FROM "Brand" WHERE name LIKE ${word}
    //   UNION ALL
    //   SELECT 'dishType' as type, id, name FROM "DishType" WHERE name LIKE ${word}
    //   UNION ALL
    //   SELECT 'diet' as type, id, name FROM "Diet" WHERE name LIKE ${word}
    // `;

    const q = buildAggregationQuery(words);
    // @ts-ignore
    const results = await prisma.$queryRaw(q);

    return results;
  },
};
