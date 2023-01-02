import { RouteHandler } from 'fastify';
import { prismaClient } from '../../../../initializers/db';

export const createProfile: RouteHandler<{
  Body: {
    firstName: string;
    lastName: string;
    phoneNumber?: string;
  };
}> = async (request, reply) => {
  const {
    user,
    body: { firstName, lastName, phoneNumber },
  } = request;

  if (
    await prismaClient.profile.findFirst({
      where: {
        userId: user.id,
      },
    })
  ) {
    reply.status(400);

    return {
      message: 'Profile already created',
    };
  }

  const profile = await prismaClient.profile.create({
    data: {
      userId: user.id,
      firstName,
      lastName,
      phoneNumber,
    },
  });

  return {
    profile,
  };
};
