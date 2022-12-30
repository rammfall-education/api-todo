import { RouteHandler } from 'fastify';
import { authenticator } from 'otplib';
import { prismaClient } from '../../../../initializers/db';
import { SessionType } from '@prisma/client';

export const startSession: RouteHandler<{
  Body: { code: string };
  Headers: { sessionid: string };
}> = async (request, reply) => {
  const {
    user,
    body: { code },
    headers: { sessionid: sessionId },
  } = request;
  const secret = await prismaClient.secret.findFirst({
    where: {
      userId: user.id,
    },
  });

  if (!secret) {
    reply.status(400);
    return {
      message: 'Without secret',
    };
  }

  if (authenticator.verify({ token: code, secret: secret.secretKey })) {
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

  return {
    message: 'Not correct code',
  };
};
