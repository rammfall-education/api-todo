import { FastifyPluginCallback } from 'fastify';
import { refreshUser } from './refresh';
import { loginUser } from './login';
import { allSessions } from './all';
import { dropSession } from './drop';

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

  instance.get(
    '/list',
    {
      config: {
        withAuth: true,
      },
      schema: {
        tags: ['User'],
        description: 'All sessions',
        get summary() {
          return this.description;
        },
        headers: {
          type: 'object',
          properties: {
            accessToken: {
              type: 'string',
            },
          },
          required: ['accessToken'],
        },
      },
    },
    allSessions
  );

  instance.delete(
    '/:id',
    {
      config: {
        withAuth: true,
      },
      schema: {
        tags: ['User'],
        description: 'Drop session',
        get summary() {
          return this.description;
        },
        headers: {
          type: 'object',
          properties: {
            accessToken: {
              type: 'string',
            },
          },
          required: ['accessToken'],
        },
        params: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
            },
          },
          required: ['id'],
        },
      },
    },
    dropSession
  );

  done();
};
