import { FastifyPluginCallback } from 'fastify';
import { createProfile } from './createProfile';

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
      },
    },
    createProfile
  );

  done();
};
