import { FastifyPluginCallback } from 'fastify';
import { user } from './user';
import { project } from './project';
import { color } from './color';

export const v1: FastifyPluginCallback = (instance, _, done) => {
  instance.register(user, {
    prefix: '/user',
  });

  instance.register(project, {
    prefix: '/project',
  });

  instance.register(color, {
    prefix: '/color',
  });

  done();
};
