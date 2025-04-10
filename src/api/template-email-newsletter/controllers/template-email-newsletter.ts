/**
 * template-email-newsletter controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController(
  'api::template-email-newsletter.template-email-newsletter',
  ({ strapi }) => ({
    async find(ctx) {
      const populatedData = await strapi.service('api::template-email-newsletter.template-email-newsletter').find({
        populate: '*',
      });

      return populatedData;
    },
  })
);
