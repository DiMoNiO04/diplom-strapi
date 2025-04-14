/**
 * category controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::category.category', ({ strapi }) => ({
  async find(ctx) {
    const populatedData = await strapi.service('api::category.category').find({
      populate: {
        seo: { populate: '*' },
        img: { populate: '*' },
        fullImage: { populate: '*' },
      },
    });

    return populatedData;
  },
}));
