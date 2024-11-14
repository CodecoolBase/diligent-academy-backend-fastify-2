import { FastifyPluginAsync } from 'fastify'
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts'
import { putPetsToOwnersSchema } from '../pet/pet.schemas';
import { getOwnerByIdSchema, getOwnersSchema, postOwnerSchema } from './owner.schemas';

export const createOwnerRoutes: FastifyPluginAsync = async (
  app,
) => { 
  const appWithProvider = app.withTypeProvider<JsonSchemaToTsProvider>()

  appWithProvider.put(
    '/:ownerId/pets/:petId',
    { schema: putPetsToOwnersSchema },
    async (request) => {
      const { petId, ownerId } = request.params;
      const updated = await app.petService.adopt(petId, ownerId);
      return updated;
    }
  )

  appWithProvider.get(
    '/',
    { schema: getOwnersSchema },
    async () => {
      return await app.ownerService.getAll();
    }
  )

  appWithProvider.get(
    '/:id',
    { schema: getOwnerByIdSchema },
    async (request) => {
      const { id } = request.params;
      return await app.ownerService.getById(id);
    }
  )

  appWithProvider.post(
    '/',
    { schema: postOwnerSchema },
    async (request, reply) => {
      const ownerProps = request.body;
      const created = await app.ownerService.create(ownerProps);
      reply.status(201);
      return created;
    }
  )

}