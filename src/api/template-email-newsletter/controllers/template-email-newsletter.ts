/**
 * template-email-newsletter controller
 */

import { factories } from '@strapi/strapi';

const fields: string[] = ['id', 'documentId', 'title', 'description', 'infoText'];

export default factories.createCoreController(
  'api::template-email-newsletter.template-email-newsletter',
  ({ strapi }) => ({
    async find() {
      const populatedData = await strapi.service('api::template-email-newsletter.template-email-newsletter').find({
        fields,
      });

      return populatedData;
    },
  })
);
