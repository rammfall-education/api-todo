import { RouteHandler } from 'fastify';
import { prismaClient } from '../../../../initializers/db';
import { SessionType } from '@prisma/client';

export const allSessions: RouteHandler = async (request, reply) => {
  const { user } = request;

  return prismaClient.session.findMany({
    where: {
      user,
      type: SessionType.access,
    },
  });
};
