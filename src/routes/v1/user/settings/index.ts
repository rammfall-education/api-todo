import { FastifyPluginCallback } from 'fastify';
import { wizard } from './wizard';

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

  done();
};
