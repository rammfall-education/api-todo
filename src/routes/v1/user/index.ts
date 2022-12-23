import { FastifyPluginCallback } from 'fastify';
import { createUser } from './create';
import { session } from './session';

export const user: FastifyPluginCallback = (instance, _, done) => {
  instance.post(
    '/',
    {
      schema: {
        description: 'Register user',
        get summary() {
          return this.description;
        },
        tags: ['User'],
        body: {
          type: 'object',
          properties: {
            username: {
              type: 'string',
              minLength: 6,
              maxLength: 30,
            },
            email: {
              type: 'string',
              minLength: 6,
              maxLength: 50,
            },
            password: {
              type: 'string',
              minLength: 8,
              maxLength: 50,
            },
          },
          required: ['username', 'email', 'password'],
        },
      },
    },
    createUser
  );

  instance.register(session, {
    prefix: '/session',
  });

  done();
};
