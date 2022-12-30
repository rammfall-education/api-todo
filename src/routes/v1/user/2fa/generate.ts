import { authenticator } from 'otplib';
import { RouteHandler } from 'fastify';
import { prismaClient } from '../../../../initializers/db';

export const generateSecretKey: RouteHandler = async (request, reply) => {
  const { user } = request;

  if (
    await prismaClient.secret.findFirst({
      where: {
        user,
      },
    })
  ) {
    reply.status(400);

    return {
      message: 'Already generated',
    };
  }
  const secret = await prismaClient.secret.create({
    data: {
      userId: user.id,
      secretKey: await authenticator.generateSecret(),
    },
  });

  await prismaClient.wizzard.update({
    where: {
      userId: user.id,
    },
    data: {
      isTwoFactorEnableTry: true,
    },
  });

  return {
    secret: secret.secretKey,
  };
};
