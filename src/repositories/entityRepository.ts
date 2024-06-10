import prisma from '../../prisma/client';
import { buildAggregationQuery } from '../utils/queries';

export const entityRepository = {
  async aggregate(words: string[]) {
    const q = buildAggregationQuery(words);
    const results = await prisma.$queryRaw(q);

    return results;
  },
};
