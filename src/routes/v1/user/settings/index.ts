import { FastifyPluginCallback } from 'fastify';
import { wizard } from './wizard';
import { updateEmail } from './updateEmail';
import { updateUsername } from './updateUsername';

const tags = ['Settings'];
export const settings: FastifyPluginCallback = (instance, opts, done) => {
  instance.get(
    '/wizard',
    {
      config: {
        withAuth: true,
      },
      schema: {
        tags,
        description: 'Get wizard profile',
        get summary() {
          return this.description;
        },
      },
    },
    wizard
  );

  instance.patch(
    '/email',
    {
      config: {
        withAuth: true,
      },
      schema: {
        tags,
        description: 'Update email',
        get summary() {
          return this.description;
        },
        body: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
            },
          },
          required: ['email'],
        },
      },
    },
    updateEmail
  );

  instance.patch(
    '/username',
    {
      config: {
        withAuth: true,
      },
      schema: {
        tags,
        description: 'Update username',
        get summary() {
          return this.description;
        },
        body: {
          type: 'object',
          properties: {
            username: {
              type: 'string',
            },
          },
          required: ['username'],
        },
      },
    },
    updateUsername
  );

  instance.patch(
    '/password',
    {
      config: {
        withAuth: true,
      },
      schema: {
        tags,
        description: 'Update password',
        get summary() {
          return this.description;
        },
        body: {
          type: 'object',
          properties: {
            password: {
              type: 'string',
            },
            oldPassword: {
              type: 'string',
            },
          },
          required: ['password', 'oldPassword'],
        },
      },
    },
    updateEmail
  );

  done();
};
