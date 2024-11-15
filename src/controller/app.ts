import fastify from 'fastify';
import { PetNotFoundError, PetService, PetTakenError } from '../service/pet.service';
import { PetRepository } from '../repository/pet.repository';
import { DbClient } from '../db';
import { OwnerRepository } from '../repository/owner.repository';
import { OwnerService } from '../service/owner.service';
import { createPetRoutes } from './routes/pet/pet.routes';
import { createOwnerRoutes } from './routes/owner/owner.routes';
import createGreeterPlugin from './plugins/greeter';
import { httpErrors } from '@fastify/sensible';
import { log } from 'console';

type Dependencies = {
  dbClient: DbClient;
}

declare module 'fastify' {
  interface FastifyInstance {
    petService: PetService,
    ownerService: OwnerService
  }
}


export default async function createApp(options = {}, dependencies: Dependencies) {
  const { dbClient } = dependencies;

  const petRepository = new PetRepository(dbClient);
  const petService = new PetService(petRepository);
  const ownerRepository = new OwnerRepository(dbClient);
  const ownerService = new OwnerService(ownerRepository);

  const app = fastify(options);

  app.decorate('petService', petService);
  app.decorate('ownerService', ownerService)
  app.setErrorHandler((error) => {
    app.log.error(error);
    if(error instanceof PetNotFoundError) {
      return httpErrors.notFound('Pet not found.')
    } else if (error instanceof PetTakenError) {
      return httpErrors.badRequest('Pet has been already taken.')
    } else {
      return httpErrors.internalServerError('Something went wrong. 😥')
    }
  })

  await app.register(createGreeterPlugin, { message: 'Hi' })
  await app.register(createPetRoutes, { prefix: '/api/pets' });
  await app.register(createOwnerRoutes, { prefix: '/api/owners' });

  return app;
}