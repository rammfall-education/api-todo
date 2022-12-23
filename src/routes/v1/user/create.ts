import { RouteHandler } from 'fastify';
import { hash } from 'bcrypt';

import { prismaClient } from '../../../initializers/db';
import { DEFAULT_USER_THEME, HASH_ROUNDS } from '../../../constants';

import { User } from '@prisma/client';

export const createUser: RouteHandler<{
  Body: Pick<User, 'username' | 'email' | 'password'>;
}> = async (request, reply) => {
  const { username, password, email } = request.body;

  if (await prismaClient.user.findFirst({ where: { email } })) {
    reply.status(400);

    return {
      message: 'User with this email already exists',
    };
  }

  if (await prismaClient.user.findFirst({ where: { username } })) {
    reply.status(400);

    return {
      message: 'User with this username already exists',
    };
  }

  const user = await prismaClient.user.create({
    data: {
      username,
      password: await hash(password, HASH_ROUNDS),
      email,
    },
  });
  await prismaClient.settings.create({
    data: {
      userId: user.id,
      secondFactorEnabled: false,
      theme: DEFAULT_USER_THEME,
    },
  });

  return {
    message: 'User successfully created',
  };
};
