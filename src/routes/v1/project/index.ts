import { FastifyPluginCallback } from 'fastify';
import { createProject } from './createProject';
import { updateProject } from './updateProject';
import { deleteProject } from './deleteProject';
import { getProject } from './getProject';
import { getProjects } from './getProjects';

const tags = ['Project'];
export const project: FastifyPluginCallback = (instance, opts, done) => {
  instance.post(
    '/',
    {
      config: {
        withAuth: true,
      },
      schema: {
        tags,
        description: 'Create project',
        get summary() {
          return this.description;
        },
        body: {
          type: 'object',
          properties: {
            title: {
              type: 'string',
            },
            colorId: {
              type: 'integer',
            },
          },
          required: ['title'],
        },
      },
    },
    createProject
  );

  instance.get(
    '/',
    {
      config: {
        withAuth: true,
      },
      schema: {
        tags,
        description: 'Get projects',
        get summary() {
          return this.description;
        },
      },
    },
    getProjects
  );

  instance.put(
    '/:id',
    {
      config: {
        withAuth: true,
      },
      schema: {
        tags,
        description: 'Update project',
        get summary() {
          return this.description;
        },
        body: {
          type: 'object',
          properties: {
            title: {
              type: 'string',
            },
            colorId: {
              type: 'number',
            },
          },
          required: ['title'],
        },
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: {
              type: 'integer',
            },
          },
        },
      },
    },
    updateProject
  );

  instance.delete(
    '/:id',
    {
      config: {
        withAuth: true,
      },
      schema: {
        tags,
        description: 'Delete project',
        get summary() {
          return this.description;
        },
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: {
              type: 'integer',
            },
          },
        },
      },
    },
    deleteProject
  );

  instance.get(
    '/:id',
    {
      config: {
        withAuth: true,
      },
      schema: {
        tags,
        description: 'Get project',
        get summary() {
          return this.description;
        },
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: {
              type: 'integer',
            },
          },
        },
      },
    },
    getProject
  );

  done();
};
