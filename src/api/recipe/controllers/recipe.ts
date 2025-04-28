/**
 * recipe controller
 */

import { factories } from '@strapi/strapi';
import { fieldsCategory, fieldsCollection, fieldsImg, fieldsRecipe, fieldsSeo } from '../../../utils/getFields';

export default factories.createCoreController('api::recipe.recipe', ({ strapi }) => ({
  async find() {
    const populatedData = await strapi.service('api::recipe.recipe').find({
      fields: fieldsRecipe,
      populate: {
        img: {
          fields: fieldsImg,
        },
      },
    });

    return populatedData;
  },

  async findOne(ctx) {
    const { id } = ctx.params;

    const populatedData = await strapi.service('api::recipe.recipe').findOne(id, {
      fields: fieldsRecipe,
      populate: {
        seo: fieldsSeo,
        img: {
          fields: fieldsImg,
        },
        categories: {
          fields: fieldsCategory,
        },
        collections: {
          fields: fieldsCollection,
        },
      },
    });

    return populatedData;
  },
}));
