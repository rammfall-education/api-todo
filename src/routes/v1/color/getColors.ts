import { RouteHandler } from 'fastify';
import { prismaClient } from '../../../initializers/db';

export const getColors: RouteHandler = async (request) => {
  const { user } = request;

  const colors = await prismaClient.color.findMany({
    where: {
      userId: user.id,
    },
  });

  return {
    colors,
  };
};
