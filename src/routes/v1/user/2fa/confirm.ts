import { RouteHandler } from 'fastify';
import { authenticator } from 'otplib';
import { prismaClient } from '../../../../initializers/db';
import { faker } from '@faker-js/faker';

export const confirm2FA: RouteHandler<{ Body: { code: string } }> = async (
  request,
  reply
) => {
  const {
    user,
    body: { code },
  } = request;
  const secret = await prismaClient.secret.findFirst({
    where: {
      userId: user.id,
    },
  });
  const settings = await prismaClient.settings.findFirst({
    where: {
      userId: user.id,
    },
  });
  if (!secret) {
    reply.status(400);

    return {
      message: 'Secret was not generated',
    };
  }

  if (settings && settings.secondFactorEnabled) {
    reply.status(400);

    return {
      message: 'Already enabled',
    };
  }

  if (authenticator.check(code, secret.secretKey)) {
    await prismaClient.settings.update({
      where: {
        userId: user.id,
      },
      data: {
        secondFactorEnabled: true,
      },
    });
    await prismaClient.wizzard.update({
      where: {
        userId: user.id,
      },
      data: {
        isTwoFactorEnableTry: false,
      },
    });
    const recoveryKeys = new Array(12).fill(0).map((_, index) =>
      prismaClient.recoveryKey.create({
        data: {
          userId: user.id,
          word: faker.word.preposition(),
          position: index,
        },
      })
    );
    await Promise.all(recoveryKeys);

    return {
      message: 'Enabled',
    };
  }

  reply.status(400);

  return {
    message: 'Incorrect code',
  };
};
