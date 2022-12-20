import { FastifyPluginCallback } from 'fastify';
import { user } from './user';

export const v1: FastifyPluginCallback = (instance, _, done) => {
  instance.register(user, {
    prefix: '/user',
  });

  done();
};
