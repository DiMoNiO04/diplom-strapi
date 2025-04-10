/**
 * about-page controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::about-page.about-page', ({ strapi }) => ({
  async find(ctx) {
    const populatedData = await strapi.service('api::about-page.about-page').find({
      populate: {
        seo: { populate: '*' },
        operating: { populate: '*' },
        simpleRecipes: { populate: '*' },
        aboutMain: { populate: '*' },
      },
    });

    return populatedData;
  },
}));
