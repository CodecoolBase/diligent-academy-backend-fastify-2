import { FastifyPluginAsync } from 'fastify'
import { getPetByIdSchema, getPetsSchema, postPetsSchema } from './pet.schemas';
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts'

export const createPetRoutes: FastifyPluginAsync = async (
  app,
) => {

  const appWithProvider = app.withTypeProvider<JsonSchemaToTsProvider>()

  appWithProvider.get(
    '/',
    { schema: getPetsSchema },
    async () => {
      const pets = await app.petService.getAll();
      return pets;
    })

  appWithProvider.get(
    '/:id',
    { schema: getPetByIdSchema },
    async (request) => {
      const { id } = request.params;
      const pets = await app.petService.getById(id);
      return pets;
    })

  appWithProvider.post(
    '/',
    { schema: postPetsSchema },
    async (request, reply) => {
      const { body: petToCreate } = request;

      const created = await app.petService.create(petToCreate);
      reply.status(201);
      return created;
    })

}