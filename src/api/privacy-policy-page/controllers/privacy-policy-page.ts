/**
 * privacy-policy-page controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::privacy-policy-page.privacy-policy-page', ({ strapi }) => ({
  async find(ctx) {
    const populatedData = await strapi.service('api::privacy-policy-page.privacy-policy-page').find({
      populate: {
        seo: { populate: '*' },
      },
    });

    return populatedData;
  },
}));
