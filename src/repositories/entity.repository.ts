import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const entityRepository = {
  async getAllModels() {
    const brands = await prisma.brand.findMany();
    const cities = await prisma.city.findMany();
    const dietTypes = await prisma.diet.findMany();
    const dishTypes = await prisma.dishType.findMany();

    return {
      brands,
      cities,
      dietTypes,
      dishTypes,
    };
  },
};
