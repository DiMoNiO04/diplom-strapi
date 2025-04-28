/**
 * recipe controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::recipe.recipe', ({ strapi }) => ({
  async find(ctx) {
    const populatedData = await strapi.service('api::recipe.recipe').find({
      populate: {
        seo: { populate: '*' },
        img: {
          fields: ['url', 'alternativeText', 'width', 'height', 'id'],
        },
      },
    });

    return populatedData;
  },
}));
