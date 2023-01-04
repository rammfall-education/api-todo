import { RouteHandler } from 'fastify';
import { prismaClient } from '../../../initializers/db';

export const createProject: RouteHandler<{
  Body: {
    title: string;
    colorId?: number;
  };
}> = async (request, reply) => {
  const {
    user,
    body: { title, colorId },
  } = request;

  if (
    colorId &&
    !(await prismaClient.color.findFirst({
      where: {
        userId: user.id,
        id: colorId,
      },
    }))
  ) {
    reply.status(400);

    return {
      message: 'Color does not exist',
    };
  }
  const project = await prismaClient.project.create({
    data: {
      userId: user.id,
      title,
      colorId,
    },
  });

  return {
    project,
  };
};
