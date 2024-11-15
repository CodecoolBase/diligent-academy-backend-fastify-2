import fastify, { FastifyInstance } from "fastify";
import { createOwnerRoutes } from "./owner.routes";
import { OwnerServiceInterface } from "../../../service/owner.service";
import { PetServiceInterface } from "../../../service/pet.service";

declare module 'fastify' {
  interface FastifyInstance {
    petService: PetServiceInterface,
    ownerService: OwnerServiceInterface
  }
}

function createPetServiceMock(overrides: Partial<PetServiceInterface> = {}) {
  return {
    getAll: jest.fn(),
    adopt: jest.fn(),
    create: jest.fn(),
    getById: jest.fn(),
    ...overrides
  }
}

describe('/owner', () => {
  let app: FastifyInstance;

  beforeEach(async () => {
    app = fastify();
  })

  it('should getAll owners', async () => {
    const owners = [{ id: 1, name: 'Joe', age: 4 }];
    const expected = [{ id: 1, name: 'Joe', age: 4 }];
    const ownerServiceMock: OwnerServiceInterface = {
      getAll: jest.fn(async () => owners),
      create: jest.fn(),
      getById: jest.fn(),
    }
    const petServiceMock: PetServiceInterface =  createPetServiceMock({
      getAll: jest.fn()
    });

    app.decorate('petService', petServiceMock);
    app.decorate('ownerService', ownerServiceMock);
    await app.register(createOwnerRoutes, { prefix: '/api/owners' })

    const response = await app.inject().get('/api/owners');
    const body = JSON.parse(response.body);

    expect(body).toStrictEqual(expected);
    expect(ownerServiceMock.getAll).toHaveBeenCalledTimes(1)
  })

  afterEach(() => {
    app?.close();
  })
})