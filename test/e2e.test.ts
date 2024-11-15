import { GenericContainer, StartedTestContainer } from 'testcontainers'
import { createPgClient, DbClient } from '../src/db';
import { FastifyInstance } from 'fastify';
import createApp from '../src/controller/app';

describe('/api/pets', () => {
  let container: StartedTestContainer;
  let app: FastifyInstance;
  let adminClient: DbClient;
  let appClient: DbClient;

  beforeAll(async () => {
    container = await new GenericContainer('postgres:14')
      .withExposedPorts(5432)
      .withEnvironment({ POSTGRES_PASSWORD: 'postgres' })
      .start();
    const connectionString = `postgres://postgres:postgres@${container.getHost()}:${container.getMappedPort(5432)}/postgres`
    adminClient = createPgClient(connectionString);
  })

  beforeEach(async () => {
    const dbName = `pets_${Date.now()}`
    await adminClient.query(`CREATE DATABASE ${dbName};`)
    const connectionString = `postgres://postgres:postgres@${container.getHost()}:${container.getMappedPort(5432)}/${dbName}`
    appClient = createPgClient(connectionString)
    await appClient.query(`
CREATE TABLE pet_owner (
	id serial PRIMARY KEY,
	name varchar(50),
	age integer
);

CREATE TYPE pet_kind as ENUM('dog', 'cat', 'reptile', 'insect');

CREATE TABLE pet (
	id serial PRIMARY KEY,
	name varchar(50),
	age integer,
	weight_in_kg numeric,
	owner_id integer,
	kind pet_kind,
	FOREIGN key (owner_id) REFERENCES pet_owner (id)
);    `);
    app = await createApp({}, { dbClient: appClient })
  })

  describe('POST /api/pets', () => {


    it('should add a new pet', async () => {
      const response = await app.inject()
        .post('/api/pets')
        .body({
          name: 'Fluffy',
          age: 6,
          weightInKg: 4,
          kind: 'cat'
        });
      const body = JSON.parse(response.body);

      expect(body).toStrictEqual({
        id: 1,
        name: 'Fluffy',
        age: 6,
        weightInKg: 4,
        kind: 'cat'
      })


    })
  })

  afterEach(async () => { 
    await app?.close();
    await appClient?.close();
  });
  afterAll(async () => {
    await adminClient?.close();
    await container?.stop();
  })
})