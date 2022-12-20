import dotenv from 'dotenv';
dotenv.config();

import server from './server';
import { prismaClient } from './initializers/db';

server
  .listen({
    port: process.env.PORT ? +process.env.PORT : 3000,
    host: '0.0.0.0',
  })
  .catch((err) => {
    console.log(err);
    return prismaClient.$disconnect();
  });
