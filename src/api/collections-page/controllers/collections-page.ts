/**
 * collections-page controller
 */

import { factories } from '@strapi/strapi';
import { fieldsPage, fieldsSeo } from '../../../utils/getFields';

export default factories.createCoreController('api::collections-page.collections-page', ({ strapi }) => ({
  async find() {
    const populatedData = await strapi.service('api::collections-page.collections-page').find({
      fields: fieldsPage,
      populate: {
        seo: fieldsSeo,
        headerBlock: { populate: '*' },
      },
    });

    return populatedData;
  },
}));
