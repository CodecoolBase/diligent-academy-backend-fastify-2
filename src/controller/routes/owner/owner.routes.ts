import { FastifyPluginAsync } from 'fastify'
import { PetService } from '../../../service/pet.service';
import { OwnerService } from '../../../service/owner.service';
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts'
import { putPetsToOwnersSchema } from '../pet/pet.schemas';
import { getOwnerByIdSchema, getOwnersSchema, postOwnerSchema } from './owner.schemas';

type PluginOption = {
  petService: PetService,
  ownerService: OwnerService
}

export const createOwnerRoutes: FastifyPluginAsync<PluginOption> = async (
  app,
  {petService, ownerService}
) => { 
  const appWithProvider = app.withTypeProvider<JsonSchemaToTsProvider>()

  appWithProvider.put(
    '/api/owners/:ownerId/pets/:petId',
    { schema: putPetsToOwnersSchema },
    async (request) => {
      const { petId, ownerId } = request.params;
      const updated = await petService.adopt(petId, ownerId);
      return updated;
    }
  )

  appWithProvider.get(
    '/api/owners',
    { schema: getOwnersSchema },
    async () => {
      return await ownerService.getAll();
    }
  )

  appWithProvider.get(
    '/api/owners/:id',
    { schema: getOwnerByIdSchema },
    async (request) => {
      const { id } = request.params;
      return await ownerService.getById(id);
    }
  )

  appWithProvider.post(
    '/api/owners',
    { schema: postOwnerSchema },
    async (request, reply) => {
      const ownerProps = request.body;
      const created = await ownerService.create(ownerProps);
      reply.status(201);
      return created;
    }
  )

}