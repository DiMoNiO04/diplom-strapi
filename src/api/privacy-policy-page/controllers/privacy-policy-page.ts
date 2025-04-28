/**
 * privacy-policy-page controller
 */

import { factories } from '@strapi/strapi';
import { fieldsPage, fieldsSeo } from '../../../utils/getFields';

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
