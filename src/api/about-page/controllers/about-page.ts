/**
 * about-page controller
 */

import { factories } from '@strapi/strapi';
import { fieldsSeo } from '../../../utils/getFields';

const fieldsPage: string[] = ['id', 'documentId', 'createdAt', 'title'];

export default factories.createCoreController('api::about-page.about-page', ({ strapi }) => ({
  async find() {
    const populatedData = await strapi.service('api::about-page.about-page').find({
      fields: fieldsPage,
      populate: {
        seo: fieldsSeo,
        operating: { populate: '*' },
        simpleRecipes: { populate: '*' },
        aboutMain: { populate: '*' },
      },
    });

    return populatedData;
  },
}));
