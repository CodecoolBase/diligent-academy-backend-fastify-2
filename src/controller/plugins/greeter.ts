import { FastifyPluginAsync } from 'fastify';
import fastifyPlugin from 'fastify-plugin';

type PluginOptions = {
  message: string
}

declare module 'fastify' {
  interface FastifyRequest {
    message: string
  }
}

const createGreeterPlugin: FastifyPluginAsync<PluginOptions> = async (
  app,
  options
) => {
  app.decorateRequest('message', '')

  app.addHook('onRequest', async (request) => {
    const { message } = options;
    request.message = message
  })

  app.addHook('onResponse', async (request) => {
    console.log(`Message: ${request.message}`)
  })
}

export default fastifyPlugin(createGreeterPlugin)