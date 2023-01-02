import { FastifyPluginCallback } from 'fastify';
import { createProfile } from './createProfile';
import { updateProfile } from './updateProfile';

const tags = ['Profile'];
export const profileRoutes: FastifyPluginCallback = (instance, opts, done) => {
  instance.post(
    '/',
    {
      config: {
        withAuth: true,
      },
      schema: {
        tags,
        description: 'Create profile',
        get summary() {
          return this.description;
        },
        body: {
          type: 'object',
          properties: {
            firstName: {
              type: 'string',
            },
            lastName: {
              type: 'string',
            },
            phoneNumber: {
              type: 'string',
            },
          },
          required: ['firstName', 'lastName'],
        },
      },
    },
    createProfile
  );

  instance.put(
    '/',
    {
      config: {
        withAuth: true,
      },
      schema: {
        tags,
        description: 'Update profile',
        get summary() {
          return this.description;
        },
        body: {
          type: 'object',
          properties: {
            firstName: {
              type: 'string',
            },
            lastName: {
              type: 'string',
            },
            phoneNumber: {
              type: 'string',
            },
          },
          required: ['firstName', 'lastName'],
        },
      },
    },
    updateProfile
  );

  done();
};
