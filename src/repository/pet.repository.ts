import { DbClient } from "../db";
import { Pet, PetToCreate } from "../entity/pet.type";

export class PetRepository {
  private readonly client;

  constructor(dbClient: DbClient) {
    this.client = dbClient
  }

  private toEntity(record: any): Pet {
    const { id, name, age, weight_in_kg } = record;
    return {
      id,
      name,
      age,
      weightInKg: parseFloat(weight_in_kg)
    }
  }

  async read({ limit, offset }: { limit?: number, offset?: number } = {}) {
    const sql = 'SELECT id, name, age, weight_in_kg FROM pet LIMIT $1 OFFSET $2;'
    const rows = await this.client.query(sql, [limit, offset]) as Array<unknown>;
    return rows.map(this.toEntity)
  }

  async create(pet: PetToCreate) {
    const {name, age, weightInKg} = pet;
    const sql = `
      INSERT INTO pet (name, age, weight_in_kg) VALUES 
        ($1, $2, $3) 
      RETURNING *
    `
    const rows  = await this.client.query(sql, [name, age, weightInKg]) as Array<unknown>
    return rows.map(this.toEntity)[0]
  }
}