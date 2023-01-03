import { FastifyPluginCallback } from 'fastify';
import { user } from './user';
import { project } from './project';

export const v1: FastifyPluginCallback = (instance, _, done) => {
  instance.register(user, {
    prefix: '/user',
  });

  instance.register(project, {
    prefix: '/project',
  });

  done();
};
