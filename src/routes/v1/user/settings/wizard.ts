import { RouteHandler } from 'fastify';
import { prismaClient } from '../../../../initializers/db';

export const wizard: RouteHandler = async (request) => {
  const { user } = request;

  const wizardProfile = await prismaClient.wizard.findFirst({
    where: {
      userId: user.id,
    },
  });
  const settings = await prismaClient.settings.findFirst({
    where: {
      userId: user.id,
    },
  });

  return {
    wizardProfile,
    settings,
  };
};
