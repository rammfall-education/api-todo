import { FastifyPluginCallback } from 'fastify';
import { createColor } from './createColor';
import { getColors } from './getColors';
import { updateColors } from './updateColors';
import { deleteColors } from './deleteColors';

const tags = ['Color'];
export const color: FastifyPluginCallback = (instance, opts, done) => {
  instance.post(
    '/',
    {
      config: {
        withAuth: true,
      },
      schema: {
        tags,
        description: 'Create color',
        get summary() {
          return this.description;
        },
        body: {
          type: 'object',
          properties: {
            color: {
              type: 'string',
            },
          },
          required: ['color'],
        },
      },
    },
    createColor
  );

  instance.get(
    '/',
    {
      config: {
        withAuth: true,
      },
      schema: {
        tags,
        description: 'Get colors',
        get summary() {
          return this.description;
        },
      },
    },
    getColors
  );

  instance.patch(
    '/:id',
    {
      config: {
        withAuth: true,
      },
      schema: {
        tags,
        description: 'Update color',
        get summary() {
          return this.description;
        },
        body: {
          type: 'object',
          properties: {
            color: {
              type: 'string',
            },
          },
          required: ['color'],
        },
        params: {
          type: 'object',
          properties: {
            id: {
              type: 'number',
            },
          },
          required: ['id'],
        },
      },
    },
    updateColors
  );

  instance.delete(
    '/:id',
    {
      config: {
        withAuth: true,
      },
      schema: {
        tags,
        description: 'Delete color',
        get summary() {
          return this.description;
        },
        params: {
          type: 'object',
          properties: {
            id: {
              type: 'number',
            },
          },
          required: ['id'],
        },
      },
    },
    deleteColors
  );

  done();
};
