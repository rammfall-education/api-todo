import { RouteHandler } from 'fastify';
import { prismaClient } from '../../../../initializers/db';

export const updateUsername: RouteHandler<{
  Body: { username: string };
}> = async (request, reply) => {
  const {
    user,
    body: { username },
  } = request;

  if (
    await prismaClient.user.findFirst({
      where: {
        username,
      },
    })
  ) {
    reply.status(400);

    return {
      message: 'Username already in use',
      field: 'username',
    };
  }

  await prismaClient.user.update({
    where: {
      id: user.id,
    },
    data: {
      username,
    },
  });

  return {
    username,
  };
};
