import { FastifyRequest, RouteHandler } from 'fastify';
import { hash } from 'bcrypt';

import { prismaClient } from '../../../initializers/db';
import { DEFAULT_USER_THEME, HASH_ROUNDS } from '../../../constants';

export const createUser: RouteHandler = async (
  request: FastifyRequest,
  reply
) => {
  const { username, password, email } = request.body as {
    username: string;
    password: string;
    email: string;
  };

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
