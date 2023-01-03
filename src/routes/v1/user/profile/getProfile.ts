import { RouteHandler } from 'fastify';
import { prismaClient } from '../../../../initializers/db';

export const getProfile: RouteHandler = async (request) => {
  const { user } = request;

  return {
    profile: await prismaClient.profile.findFirst({
      where: {
        userId: user.id,
      },
    }),
  };
};
