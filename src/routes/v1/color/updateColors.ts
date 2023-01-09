import { RouteHandler } from 'fastify';
import { prismaClient } from '../../../initializers/db';

export const updateColors: RouteHandler<{
  Params: { id: number };
  Body: { color: string };
}> = async (request, reply) => {
  const {
    user,
    params: { id },
    body: { color },
  } = request;

  if (
    await prismaClient.color.findFirst({
      where: {
        userId: user.id,
        id,
      },
    })
  ) {
    const colorInstance = await prismaClient.color.update({
      where: {
        id,
      },
      data: {
        color,
      },
    });

    return {
      color: colorInstance,
    };
  }

  reply.status(400);

  return {
    message: 'Color does not exist',
  };
};
