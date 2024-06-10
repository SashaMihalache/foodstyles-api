export type Model = {
  id: number;
  name: string;
  type: EntityType;
};

export type EntityType = 'city' | 'brand' | 'dishType' | 'diet';

export type GroupEntity = {
  [key: string]: Entity[];
};
