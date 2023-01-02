import { RouteHandler } from 'fastify';
import { prismaClient } from '../../../../initializers/db';
import { SessionType } from '@prisma/client';

export const recoveryStart: RouteHandler<{
  Body: { word: string };
  Headers: {
    sessionid: string;
  };
}> = async (request, reply) => {
  const {
    user,
    body: { word },
    headers: { sessionid: sessionId },
  } = request;

  const recoveryCode = await prismaClient.recoveryKey.findFirst({
    where: {
      userId: user.id,
      word: word,
    },
  });

  if (recoveryCode) {
    await prismaClient.session.update({
      where: {
        id: sessionId,
      },
      data: {
        type: SessionType.access,
      },
    });

    return {
      message: 'Success',
    };
  }

  reply.status(400);
  return {
    message: 'Recovery code not exist',
  };
};
