import { RouteHandler } from 'fastify';
import { prismaClient } from '../../../../initializers/db';

export const allSessions: RouteHandler = async (request, reply) => {
  const { sessionid: sessionId } = request.headers as {
    sessionid: string;
  };
};
