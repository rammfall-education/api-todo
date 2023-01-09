import { RouteHandler } from 'fastify';
import { prismaClient } from '../../../initializers/db';

export const createColor: RouteHandler<{
  Body: {
    color: string;
  };
}> = async (request) => {
  const {
    user,
    body: { color },
  } = request;

  const colorEntity = await prismaClient.color.create({
    data: {
      userId: user.id,
      color,
    },
  });

  return {
    color: colorEntity,
  };
};
