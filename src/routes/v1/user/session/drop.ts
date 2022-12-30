import { RouteHandler } from 'fastify';
import { prismaClient } from '../../../../initializers/db';

export const dropSession: RouteHandler<{
  Params: {
    id: string;
  };
}> = async (request, reply) => {
  const {
    user,
    params: { id },
  } = request;

  const session = await prismaClient.session.findFirst({
    where: {
      user,
      id,
    },
  });

  if (session) {
    await prismaClient.session.delete({
      where: {
        id,
      },
    });

    return {
      message: 'Successfully deleted',
    };
  }

  reply.status(403);
  return {
    message: 'Access denied',
  };
};
