# Tasks

## Prepare the project

Use your favorite Postgres DB, a container option is available in this repo too (`docker compose up -d`). 

Import the `pets.sql` scheme and data into the database.

Modify the connection string in the `./src/db.ts`, and start the dev server (`npm run dev`).

You can try out the `GET /api/pets`, `POST /api/pets` endpoints.

## Get familiar with the code base

Answer the following questions:

- Which architecture is applied in this repo?
- What kind of elements/components can you identify?
- Where is the entry point of the repo?
- What is the scope of the repositories?
- What is the scope of the services?
- What is happening in the controllers?
- Why do we use the `DbClient` type in the pet repository?
- What would you improve in this codebase?
- How does the code handle the `async` route handlers?

### Background material

- https://fastify.dev/docs/latest/Reference/Routes/#async-await

## Task 1: Never trust your users

Right now the user can provide any kind of body for the POST request. Ensure that the body should fulfill the following requirements.

- Tha name must be a non zero length string at most 50 chars long.
- The age must be a positive number.
- The weight in kg must be also a positive number.

- What do you think, why does it needed?

### Background materials

- https://fastify.dev/docs/latest/Reference/Validation-and-Serialization/
- https://fastify.dev/docs/latest/Reference/Type-Providers/

## Task 2: Determines the reply's body

Add a desired output schema (deserialization) to the `GET /api/pets` and `POST /api/pets`.

- What do you think what is the advantage of this?

## Task 3: Demo: Handle the configuration

It is not so convenient how we are connecting to the database.

- What is the disadvantages of this solution? How would you fix it?
- What else would you make configurable?
- How would you type the configuration?
- Where would you read the configuration?
- What is the type of environment variables in Javascript?

### Background material
- https://www.npmjs.com/package/dotenv

## Task 4: Practice: Create owner endpoints

- Create a `GET /api/owners` and `POST /api/owners`.
- The owner's name should be at least 1 character but do not exceed the char number 50.
- Take care of the validation and the deserialization.

## Task 5: Demo: Organize the routes

Our `app.ts` staring to getting bigger and bigger. It is worth to start organizing the routes out.

Fastify has a plugin concept to organize everything. It can be used for that. How?

## Task 6: Extract the owner routes

- Extract the owner routes to a separate fastify plugin. 


### Background materials

- https://fastify.dev/docs/latest/Reference/Plugins/

## Task 7: Demo: Decorate the Fastify Instance

It can be ok to pass down the `petService` to every routes, but also it is possible to make it accessible on all of the `fastify` instances.

- Create a decorator for the `petService` and use it in the routes. Where would you put the decorator if you would use it in multiple routes?
- How can you alter the type of original `fastify` instance to support the new `petService` prop on it? Which typescript feature can help us in this case?

### Background materials

- https://fastify.dev/docs/latest/Reference/Decorators/
- https://fastify.dev/docs/latest/Reference/TypeScript/#plugins

## Task 8: Create a decorator for the owner service too

## Task 9: Show kinds

- Modify the implementation to show a textual kind as a kind property of the pet.

## Task 10: Show all kinds

- Create an endpoint to show all possible kinds with their ID.

## Task 11: Save the kind for new pets

- Modify the `POST /api/pets` to accept a `kindId`.

## Task 12: Modify the pet

- Create a new endpoint to modify the pet's properties. 
- It can be a partial modification too.

## Task 13: Assign an owner to a pet

- Create a new endpoint to assign a pet ID with an owner Id.
 