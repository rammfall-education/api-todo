import { RouteHandler } from 'fastify';
import { hash, compare } from 'bcrypt';
import { prismaClient } from '../../../../initializers/db';
import { HASH_ROUNDS } from '../../../../constants';

export const updatePassword: RouteHandler<{
  Body: { password: string; oldPassword: string };
}> = async (request, reply) => {
  const {
    user,
    body: { password, oldPassword },
  } = request;

  if (!(await compare(oldPassword, user.password))) {
    reply.status(400);

    return {
      message: 'Old password not correct',
      field: 'oldPassword',
    };
  }

  await prismaClient.user.update({
    where: {
      id: user.id,
    },
    data: {
      password: await hash(password, HASH_ROUNDS),
    },
  });

  return {
    message: 'Success',
  };
};
