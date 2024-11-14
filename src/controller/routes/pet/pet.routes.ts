import { FastifyPluginAsync } from 'fastify'
import { getPetByIdSchema, getPetsSchema, postPetsSchema } from './pet.schemas';
import { PetService } from '../../../service/pet.service';
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts'

type PluginOption = {
  petService: PetService
}

export const createPetRoutes: FastifyPluginAsync<PluginOption> = async (
  app,
  { petService }
) => {

  const appWithProvider = app.withTypeProvider<JsonSchemaToTsProvider>()

  appWithProvider.get(
    '/',
    { schema: getPetsSchema },
    async () => {
      const pets = await petService.getAll();
      return pets;
    })

  appWithProvider.get(
    '/:id',
    { schema: getPetByIdSchema },
    async (request) => {
      const { id } = request.params;
      const pets = await petService.getById(id);
      return pets;
    })

  appWithProvider.post(
    '/',
    { schema: postPetsSchema },
    async (request, reply) => {
      const { body: petToCreate } = request;

      const created = await petService.create(petToCreate);
      reply.status(201);
      return created;
    })

}