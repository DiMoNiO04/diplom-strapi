/**
 * recipes-page controller
 */

import { factories } from '@strapi/strapi';
import { fieldsPage, fieldsSeo } from '../../../utils/getFields';

export default factories.createCoreController('api::recipes-page.recipes-page', ({ strapi }) => ({
  async find() {
    const populatedData = await strapi.service('api::recipes-page.recipes-page').find({
      fields: fieldsPage,
      populate: {
        seo: fieldsSeo,
        headerBlock: { populate: '*' },
      },
    });

    return populatedData;
  },
}));
