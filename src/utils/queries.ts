import { Prisma } from '@prisma/client';

// export const buildAggregationQuery = (words: string[]) => {
//   const word = words[0];

//   let mainQuery: any;

//   const q1 = `SELECT 'city' as type, id, name From "City" `;
//   const q2 = `WHERE name LIKE `;

//   const dynamicInput = ` '%${word}%' `;
//   mainQuery = Prisma.raw(`${q1} ${q2} ${dynamicInput}`);

//   mainQuery.values = [dynamicInput];

//   return mainQuery;
// };

// export const buildAggregationQuery = (words: string[]) => {
//   const subQueries: any[] = [];
//   let mainQuery: any;

//   for (let i = 0; i < words.length; i++) {
//     const word = words[i];
//     const dynamicInput = ` '%${word}%' `;
//     const qWhere = `WHERE name LIKE ${dynamicInput}`;
//     const qUnion = `UNION ALL`;

//     const qCities = `SELECT 'city' as type, id, name From "City" ${qWhere} ${qUnion}`;
//     const qBrand = `SELECT 'brand' as type, id, name From "Brand" ${qWhere} ${qUnion}`;
//     const qDishType = `SELECT 'dishType' as type, id, name From "DishType" ${qWhere} ${qUnion}`;
//     const qDiet = `SELECT 'diet' as type, id, name From "Diet" ${qWhere} ${
//       i === words.length - 1 ? '' : qUnion
//     }`;

//     const subQ = Prisma.raw(`${qCities} ${qBrand} ${qDishType} ${qDiet}`);

//     subQ.values.push(dynamicInput);
//     subQueries.push(subQ);
//   }

//   mainQuery = Prisma.raw(subQueries.map((q) => q.text).join(' '));

//   console.log(mainQuery);

//   return mainQuery;
// };

// export const buildAggregationQuery = (words: string[]) => {
//   let query: any;

//   const q1 = `SELECT 'city' as type, id, name From "City" WHERE name ILIKE ANY(ARRAY[$1])`;

//   query = Prisma.raw(q1);

//   query.values = [`%${words[0]}%`];

//   return query;
// };

export const buildAggregationQuery = (words: string[]) => {
  let mainQuery: any;
  const query = `
    SELECT 'city' as type, id, name From "City" WHERE name ILIKE ANY(ARRAY[$1]) UNION ALL
    SELECT 'brand' as type, id, name From "Brand" WHERE name ILIKE ANY(ARRAY[$1]) UNION ALL
    SELECT 'dishType' as type, id, name From "DishType" WHERE name ILIKE ANY(ARRAY[$1]) UNION ALL
    SELECT 'diet' as type, id, name From "Diet" WHERE name ILIKE ANY(ARRAY[$1])
  `;

  mainQuery = Prisma.raw(query);
  mainQuery.values = [words.map((word) => `%${word}%`)];

  return mainQuery;
};
