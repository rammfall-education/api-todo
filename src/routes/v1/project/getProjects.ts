import { RouteHandler } from 'fastify';
import { prismaClient } from '../../../initializers/db';

export const getProjects: RouteHandler<{ Params: { id: number } }> = async (
  request,
  reply
) => {
  const {
    user,
    params: { id },
  } = request;

  const project = await prismaClient.project.findFirst({
    where: {
      id,
      userId: user.id,
    },
  });

  return {
    project,
  };
};
