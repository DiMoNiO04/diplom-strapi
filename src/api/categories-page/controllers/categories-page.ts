/**
 * categories-page controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::categories-page.categories-page', ({ strapi }) => ({
  async find(ctx) {
    const populatedData = await strapi.service('api::categories-page.categories-page').find({
      populate: {
        seo: { populate: '*' },
        headerBlock: { populate: '*' },
      },
    });

    return populatedData;
  },
}));
