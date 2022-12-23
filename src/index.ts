import dotenv from 'dotenv';
import { User } from '@prisma/client';
dotenv.config();

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
    }
  }
}

declare module 'fastify' {
  interface FastifyRequest {
    user: User;
  }
}

import server from './server';
import { prismaClient } from './initializers/db';

server
  .listen({
    port: +process.env.PORT,
    host: '0.0.0.0',
  })
  .catch((err) => {
    console.log(err);
    return prismaClient.$disconnect();
  });
