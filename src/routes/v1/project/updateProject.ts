import { RouteHandler } from 'fastify';
import { prismaClient } from '../../../initializers/db';

export const updateProject: RouteHandler<{
  Body: {
    colorId?: number;
    title: string;
  };
  Params: {
    id: number;
  };
}> = async (request, reply) => {
  const {
    user,
    body: { colorId, title },
    params: { id },
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
      message: 'Color does node exist',
    };
  }

  if (
    await prismaClient.project.findFirst({
      where: {
        id,
        userId: user.id,
      },
    })
  ) {
    const project = await prismaClient.project.update({
      where: {
        id,
      },
      data: {
        title,
        colorId,
      },
    });

    return {
      project,
    };
  }

  reply.status(400);
  return {
    message: 'Project does not exist',
  };
};
