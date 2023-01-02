import { RouteHandler } from 'fastify';
import { prismaClient } from '../../../../initializers/db';

export const updateEmail: RouteHandler<{ Body: { email: string } }> = async (
  request,
  reply
) => {
  const {
    user,
    body: { email },
  } = request;

  if (
    await prismaClient.user.findFirst({
      where: {
        email,
      },
    })
  ) {
    reply.status(400);

    return {
      message: 'Email already in use',
      field: 'email',
    };
  }

  await prismaClient.user.update({
    where: {
      id: user.id,
    },
    data: {
      email,
    },
  });

  return {
    email,
  };
};
