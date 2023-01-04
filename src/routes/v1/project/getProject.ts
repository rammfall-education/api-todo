import { RouteHandler } from 'fastify';
import { prismaClient } from '../../../initializers/db';

export const getProject: RouteHandler = async (request, reply) => {
  const { user } = request;

  const projects = await prismaClient.project.findMany({
    where: {
      userId: user.id,
    },
  });

  return {
    projects,
  };
};
