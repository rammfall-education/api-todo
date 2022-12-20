import fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifyMultipart from '@fastify/multipart';
import fastifyCookie from '@fastify/cookie';
import fastifyCsrf from '@fastify/csrf-protection';
import fastifyFormBody from '@fastify/formbody';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { v1 } from './routes/v1';

const server = fastify({
  logger: true,
  ajv: {
    customOptions: {
      allErrors: true,
    },
  },
});

server.register(fastifyCors);
server.register(fastifyMultipart, {
  addToBody: true,
});
server.register(fastifyCookie);
server.register(fastifyCsrf);
server.register(fastifyFormBody);
server.register(fastifySwagger);
server.register(fastifySwaggerUi);

server.register(
  (instance, _, done) => {
    instance.register(v1, {
      prefix: '/v1',
    });

    done();
  },
  {
    prefix: '/api',
  }
);

export default server;
