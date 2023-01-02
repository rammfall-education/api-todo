import dotenv from 'dotenv';
import { User } from '@prisma/client';
dotenv.config();

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      SENDGRID_API_KEY: string;
    }
  }
}

declare module 'fastify' {
  interface FastifyRequest {
    user: User;
  }

  interface FastifyContextConfig {
    withAuth?: boolean;
    withTwoFAAuth?: boolean;
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
