import { RouteHandler } from 'fastify';
import { sign } from 'jsonwebtoken';
import { v4 } from 'uuid';
import { formatISO, addDays, isBefore } from 'date-fns';

import { prismaClient } from '../../../initializers/db';
import { JWT_SECRET } from '../../../config';
import { DEADLINE_SESSION, EXPIRES_ACCESS_TOKEN } from '../../../constants';

export const refreshUser: RouteHandler = async (request, reply) => {
  const {
    'user-agent': device,
    refreshToken,
    sessionId,
  } = request.headers as {
    'user-agent': string;
    refreshToken: string;
    sessionId: string;
  };
  const { ip } = request;
  const currentSession = await prismaClient.session.findFirst({
    where: {
      refreshToken,
      id: sessionId,
    },
    include: {
      user: true,
    },
  });
  if (!currentSession) {
    reply.status(400);

    return {
      message: 'Session was deleted',
    };
  }

  if (isBefore(new Date(currentSession.deadline), new Date())) {
    reply.status(400);

    return {
      message: 'Session too old',
    };
  }

  const accessToken = sign(
    {
      id: currentSession.user.id,
      email: currentSession.user.email,
    },
    JWT_SECRET,
    {
      expiresIn: EXPIRES_ACCESS_TOKEN,
    }
  );

  const session = await prismaClient.session.update({
    where: {
      id: sessionId,
    },
    data: {
      accessToken,
      refreshToken: v4(),
      ip,
      device,
      deadline: formatISO(addDays(new Date(), DEADLINE_SESSION)),
    },
  });

  reply.status(200);
  return {
    accessToken: session.accessToken,
    refreshToken: session.refreshToken,
    sessionId: session.id,
    sessionType: session.type,
  };
};
