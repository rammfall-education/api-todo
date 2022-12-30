import { FastifyPluginCallback } from 'fastify';
import { generateSecretKey } from './generate';
import { getSecret } from './secret';
import { confirm2FA } from './confirm';
import { startSession } from './start';
import { recovery } from './recovery';

export const twoFactor: FastifyPluginCallback = (instance, opts, done) => {
  const tags = ['2FA'];

  instance.post(
    '/generate',
    {
      config: {
        withAuth: true,
      },
      schema: {
        tags,
        description: 'Generate secret key',
        get summary() {
          return this.description;
        },
      },
    },
    generateSecretKey
  );

  instance.get(
    '/secret',
    {
      config: {
        withAuth: true,
      },
      schema: {
        tags,
        description: 'Get secret key',
        get summary() {
          return this.description;
        },
      },
    },
    getSecret
  );

  instance.post(
    '/confirm',
    {
      config: {
        withAuth: true,
      },
      schema: {
        tags,
        description: 'Confirm 2fa',
        get summary() {
          return this.description;
        },
        body: {
          type: 'object',
          properties: {
            code: {
              type: 'string',
              minLength: 6,
              maxLength: 6,
            },
          },
          required: ['code'],
        },
      },
    },
    confirm2FA
  );

  instance.post(
    '/start',
    {
      config: {
        withTwoFAAuth: true,
      },
      schema: {
        tags,
        description: 'Login with 2fa code',
        get summary() {
          return this.description;
        },
        body: {
          type: 'object',
          properties: {
            code: {
              type: 'string',
              minLength: 6,
              maxLength: 6,
            },
          },
          required: ['code'],
        },
      },
    },
    startSession
  );

  instance.get(
    '/recovery',
    {
      config: {
        withAuth: true,
      },
      schema: {
        tags,
        description: 'Get recovery codes',
        get summary() {
          return this.description;
        },
      },
    },
    recovery
  );

  done();
};
