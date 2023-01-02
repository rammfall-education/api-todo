import { RouteHandler } from 'fastify';
import { prismaClient } from '../../../../initializers/db';

export const disable2fa: RouteHandler = async (request, reply) => {
  const { user } = await request;

  if (
    !(
      await prismaClient.settings.findFirst({
        where: {
          userId: user.id,
        },
      })
    )?.secondFactorEnabled
  ) {
    reply.status(400);

    return {
      message: '2 fa not enabled',
    };
  }

  await prismaClient.settings.update({
    where: {
      userId: user.id,
    },
    data: {
      secondFactorEnabled: false,
    },
  });
  await prismaClient.secret.delete({
    where: {
      userId: user.id,
    },
  });
  await prismaClient.recoveryKey.deleteMany({
    where: {
      userId: user.id,
    },
  });

  return {
    message: 'Success',
  };
};
