import { Owner, OwnerToCreate } from "../entity/owner.type";
import { OwnerRepository } from "../repository/owner.repository";

export interface OwnerServiceInterface {
  getAll: () => Promise<Owner[]>
  getById: (id: number) => Promise<Owner>
  create: (ownerProps: OwnerToCreate) => Promise<Owner> 
}

export class OwnerService implements OwnerServiceInterface {
  private readonly repository;

  constructor(repository: OwnerRepository) {
    this.repository = repository;
  }

  async getAll() {
    return await this.repository.read();
  }

  async getById(id: number) {
    const owner = await this.repository.readById(id);
    if(owner === null) {
      throw new Error('The owner is not found.')
    }
    return owner;
  }

  async create(owner: OwnerToCreate) {
    return await this.repository.create(owner);
  }
}