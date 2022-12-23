import fastifyPlugin from 'fastify-plugin';
import { verify, JsonWebTokenError } from 'jsonwebtoken';
import { prismaClient } from '../initializers/db';
import { JWT_SECRET } from '../config';
import { FastifyRequest } from 'fastify';

export const auth = fastifyPlugin(
  async (instance, opts) => {
    instance.decorateRequest('user', {});

    instance.addHook<{ Headers: { sessionid: string; accessToken: string } }>(
      'preHandler',
      async (request, reply) => {
        const { sessionid: sessionId, accessToken } = request.headers;

        const session = await prismaClient.session.findFirst({
          where: {
            id: sessionId,
            accessToken,
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
            }
          } catch (err) {
            reply.status(401);

            if (err instanceof JsonWebTokenError) {
              return {
                message: err.message,
              };
            }
          }
        }

        reply.status(401);
        return {
          message: 'Session not found',
        };
      }
    );
  },
  { fastify: '4.x' }
);
