import fastifyPlugin from 'fastify-plugin';
import { verify, JsonWebTokenError } from 'jsonwebtoken';

import { prismaClient } from '../initializers/db';
import { JWT_SECRET } from '../config';
import { SessionType } from '@prisma/client';

export const auth = fastifyPlugin(
  async (instance) => {
    instance.decorateRequest('user', {});

    instance.addHook<{ Headers: { sessionid: string; accesstoken: string } }>(
      'preHandler',
      async (request, reply) => {
        const { withAuth, withTwoFAAuth } = request.routeConfig;
        if (!withAuth && !withTwoFAAuth) return;

        const { sessionid: sessionId, accesstoken: accessToken } =
          request.headers;

        const session = await prismaClient.session.findFirst({
          where: {
            id: sessionId,
            accessToken,
            type: withAuth ? SessionType.access : SessionType.factored,
          },
        });

        if (session) {
          try {
            const { id } = (await verify(accessToken, JWT_SECRET)) as {
              id: number;
            };

            const user = await prismaClient.user.findFirst({ where: { id } });

            if (user) {
              request.user = user;
              return;
            }
          } catch (err) {
            reply.status(401);

            if (err instanceof JsonWebTokenError) {
              return reply.send({
                message: err.message,
              });
            }
          }
        }

        reply.status(401);
        return reply.send({
          message: 'Session not found',
        });
      }
    );
  },
  { fastify: '4.x' }
);
