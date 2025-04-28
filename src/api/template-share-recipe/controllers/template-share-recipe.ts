/**
 * template-share-recipe controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::template-share-recipe.template-share-recipe', ({ strapi }) => ({
  async find(ctx) {
    const populatedData = await strapi.service('api::template-share-recipe.template-share-recipe').find({
      populate: {
        btn: { populate: '*' },
        img: {
          fields: ['url', 'alternativeText', 'width', 'height', 'id'],
        },
        texts: { populate: '*' },
      },
    });

    return populatedData;
  },
}));
