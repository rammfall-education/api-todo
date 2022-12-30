import { RouteHandler } from 'fastify';
import { prismaClient } from '../../../../initializers/db';

export const getSecret: RouteHandler = async (request, reply) => {
  const { user } = request;

  const settings = await prismaClient.settings.findFirst({
    where: {
      userId: user.id,
    },
  });
  const secret = await prismaClient.secret.findFirst({
    where: {
      userId: user.id,
    },
  });

  if (!settings || !secret) {
    reply.status(400);
    return {
      message: 'Without settings',
    };
  }

  if (settings.secondFactorEnabled) {
    reply.status(400);
    return {
      message: 'Already enabled',
    };
  }

  return {
    secret: secret.secretKey,
  };
};
