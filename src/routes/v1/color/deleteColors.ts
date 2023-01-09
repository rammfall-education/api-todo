import { RouteHandler } from 'fastify';
import { prismaClient } from '../../../initializers/db';

export const deleteColors: RouteHandler<{ Params: { id: number } }> = async (
  request,
  reply
) => {
  const {
    user,
    params: { id },
  } = request;

  if (
    await prismaClient.color.findFirst({
      where: {
        id,
        userId: user.id,
      },
    })
  ) {
    await prismaClient.color.delete({
      where: {
        id,
      },
    });

    return {
      message: 'Success',
    };
  }

  reply.status(400);

  return {
    message: 'Color does not exist',
  };
};
