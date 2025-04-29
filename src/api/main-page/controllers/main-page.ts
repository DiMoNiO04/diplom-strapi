/**
 * main-page controller
 */

import { factories } from '@strapi/strapi';
import { fieldsSeo } from '../../../utils/getFields';

export default factories.createCoreController('api::main-page.main-page', ({ strapi }) => ({
  async find() {
    const populatedData = await strapi.service('api::main-page.main-page').find({
      populate: {
        seo: fieldsSeo,
      },
    });

    return populatedData;
  },
}));
