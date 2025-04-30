/**
 * privacy-policy-page controller
 */

import { factories } from '@strapi/strapi';
import { fieldsSeo } from '../../../utils/getFields';

const fieldsPage: string[] = ['id', 'documentId', 'createdAt', 'title', 'content'];

export default factories.createCoreController('api::privacy-policy-page.privacy-policy-page', ({ strapi }) => ({
  async find() {
    const populatedData = await strapi.service('api::privacy-policy-page.privacy-policy-page').find({
      fields: fieldsPage,
      populate: {
        seo: fieldsSeo,
      },
    });

    return populatedData;
  },
}));
