import { RouteHandler } from 'fastify';
import { prismaClient } from '../../../../initializers/db';

export const updateProfile: RouteHandler<{
  Body: { firstName: string; lastName: string; phoneNumber?: string };
}> = async (request) => {
  const {
    user,
    body: { firstName, lastName, phoneNumber },
  } = request;

  const profile = await prismaClient.profile.update({
    where: {
      userId: user.id,
    },
    data: {
      firstName,
      lastName,
      phoneNumber,
    },
  });

  return {
    profile,
  };
};
