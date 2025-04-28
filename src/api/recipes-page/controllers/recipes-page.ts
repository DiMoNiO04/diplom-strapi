/**
 * recipes-page controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::recipes-page.recipes-page', ({ strapi }) => ({
  async find(ctx) {
    const populatedData = await strapi.service('api::recipes-page.recipes-page').find({
      populate: {
        seo: { populate: '*' },
        headerBlock: { populate: '*' },
      },
    });

    return populatedData;
  },
}));
