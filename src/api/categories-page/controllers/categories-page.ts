/**
 * categories-page controller
 */

import { factories } from '@strapi/strapi';
import { fieldsPage, fieldsSeo } from '../../../utils/getFields';

export default factories.createCoreController('api::categories-page.categories-page', ({ strapi }) => ({
  async find() {
    const populatedData = await strapi.service('api::categories-page.categories-page').find({
      fields: fieldsPage,
      populate: {
        seo: fieldsSeo,
        headerBlock: { populate: '*' },
      },
    });

    return populatedData;
  },
}));
