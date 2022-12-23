import { FastifyPluginCallback } from 'fastify';
import { refreshUser } from './refresh';
import { loginUser } from './login';

export const session: FastifyPluginCallback = (instance, opts, done) => {
  instance.post(
    '/refresh',
    {
      schema: {
        tags: ['User'],
        description: 'Refresh user',
        get summary() {
          return this.description;
        },
        headers: {
          type: 'object',
          properties: {
            refreshToken: {
              type: 'string',
            },
            sessionId: {
              type: 'string',
            },
          },
          required: ['refreshToken', 'sessionId'],
        },
      },
    },
    refreshUser
  );

  instance.post(
    '/start',
    {
      config: {
        withAuth: true,
      },
      schema: {
        tags: ['User'],
        description: 'Login user',
        get summary() {
          return this.description;
        },
        body: {
          type: 'object',
          properties: {
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
          required: ['email', 'password'],
        },
      },
    },
    loginUser
  );

  done();
};
