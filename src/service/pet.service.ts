import { PetToCreate } from "../entity/pet.type";
import { PetRepository } from "../repository/pet.repository"


export class PetNotFoundError extends Error {};
export class PetTakenError extends Error {};

export class PetService {
  private readonly repository;

  constructor(repository: PetRepository) {
    this.repository = repository;
  }

  async getAll() {
    return await this.repository.read();
  }

  async getById(id: number) {
    const pet = await this.repository.readById(id);
    if(!pet) {
      throw new PetNotFoundError();
    }
    return pet;
  }

  async create(pet: PetToCreate) {
    return await this.repository.create(pet);
  }

  async adopt(petId: number, ownerId: number) {
    const pet = await this.repository.readById(petId);
    if (!pet) {
      throw new PetNotFoundError();
    }
    if(pet.ownerId !== null) {
      throw new PetTakenError();
    }
    const adopted = await this.repository.update(petId, { ownerId })
    if (!adopted) {
      throw new PetNotFoundError();
    }
    return adopted;
  }
}