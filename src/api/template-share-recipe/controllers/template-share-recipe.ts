/**
 * template-share-recipe controller
 */

import { factories } from '@strapi/strapi';

const fields: string[] = ['id', 'documentId', 'title'];

export default factories.createCoreController('api::template-share-recipe.template-share-recipe', ({ strapi }) => ({
  async find() {
    const populatedData = await strapi.service('api::template-share-recipe.template-share-recipe').find({
      fields,
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
