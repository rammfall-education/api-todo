import { RouteHandler } from 'fastify';
import { prismaClient } from '../../../../initializers/db';

export const recovery: RouteHandler = async (request, reply) => {
  const { user } = request;
  return prismaClient.recoveryKey.findMany({
    where: {
      userId: user.id,
    },
  });
};
