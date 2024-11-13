export type Pet = {
  id: number,
  name: string,
  age: number,
  weightInKg: number,
};

export type PetToCreate = Omit<Pet, 'id'>;
