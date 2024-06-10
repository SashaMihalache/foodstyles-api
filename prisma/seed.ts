import { cities } from './static/cities';
import { dishTypes } from './static/dishTypes';
import { brands } from './static/brands';
import { diets } from './static/diets';
import prisma from './client';

async function seed() {
  // Seed your database here
  await prisma.city.createMany({
    data: cities,
  });

  console.log('Cities seeded');

  await prisma.dishType.createMany({
    data: dishTypes,
  });

  console.log('Dish types seeded');

  await prisma.brand.createMany({
    data: brands,
  });

  console.log('Brands seeded');

  await prisma.diet.createMany({
    data: diets,
  });

  console.log('Diets seeded');
}

seed()
  .then(() => {
    console.log('Seed completed successfully 🌱');
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
