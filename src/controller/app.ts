import fastify from 'fastify';
import { PetService } from '../service/pet.service';
import { PetRepository } from '../repository/pet.repository';
import { DbClient } from '../db';
import { PetToCreate } from '../entity/pet.type';

type Dependencies = {
  dbClient: DbClient;
}

export default function createApp(options = {}, dependencies: Dependencies) {
  const { dbClient } = dependencies;

  const petRepository = new PetRepository(dbClient);
  const petService = new PetService(petRepository);
  

  const app = fastify(options)

  app.get('/api/pets', async () => {
    const pets = await petService.getAll();
    return pets;
  })

  type PostPetsRoute = {
    Body: PetToCreate;
  }
  app.post<PostPetsRoute>('/api/pets', async (request, reply) => {
    const { body: petToCreate } = request;

    const created = await petService.create(petToCreate);
    reply.status(201);
    return created;
  })

  return app;
}