import { RouteHandler } from 'fastify';
import { prismaClient } from '../../../initializers/db';

export const deleteProject: RouteHandler<{ Params: { id: number } }> = async (
  request,
  reply
) => {
  const {
    user,
    params: { id },
  } = request;

  if (
    await prismaClient.project.findFirst({
      where: {
        userId: user.id,
        id,
      },
    })
  ) {
    await prismaClient.project.delete({
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
    message: 'Project does not exist',
  };
};
