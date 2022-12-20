import { FastifyRequest, RouteHandler } from 'fastify';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { v4 } from 'uuid';
import { formatISO, addDays } from 'date-fns';

import { prismaClient } from '../../../initializers/db';
import { JWT_SECRET } from '../../../config';
import { DEADLINE_SESSION, EXPIRES_ACCESS_TOKEN } from '../../../constants';

export const loginUser: RouteHandler = async (
  request: FastifyRequest,
  reply
) => {
  const { password, email } = request.body as {
    password: string;
    email: string;
  };
  const { 'user-agent': device } = request.headers as {
    'user-agent': string;
  };
  const { ip } = request;
  const user = await prismaClient.user.findFirst({
    where: { email },
    include: {
      settings: true,
    },
  });

  if (!user) {
    reply.status(400);

    return {
      message: 'User with this email does not exists',
    };
  }

  if (!(await compare(password, user.password))) {
    reply.status(400);

    return {
      message: 'Incorrect password',
    };
  }

  const accessToken = sign(
    {
      id: user.id,
      email: user.email,
    },
    JWT_SECRET,
    {
      expiresIn: EXPIRES_ACCESS_TOKEN,
    }
  );
  const refreshToken = v4();
  const session = await prismaClient.session.create({
    data: {
      id: v4(),
      userId: user.id,
      accessToken,
      refreshToken,
      ip,
      type: user.settings?.secondFactorEnabled ? 'factored' : 'access',
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
