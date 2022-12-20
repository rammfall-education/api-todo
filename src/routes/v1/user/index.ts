import { FastifyPluginCallback } from 'fastify';
import { createUser } from './create';
import { loginUser } from './login';
import { refreshUser } from './refresh';

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

  instance.post(
    '/login',
    {
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

  done();
};
