/**
 * recipe controller
 */

import { factories } from '@strapi/strapi';
import {
  fieldsCategory,
  fieldsCollection,
  fieldsImg,
  fieldsRecipe,
  fieldsSeo,
  fieldsUser,
} from '../../../utils/getFields';

export default factories.createCoreController('api::recipe.recipe', ({ strapi }) => ({
  async find() {
    const populatedData = await strapi.service('api::recipe.recipe').find({
      fields: fieldsRecipe,
      populate: {
        img: fieldsImg,
        categories: {
          fields: fieldsCategory,
        },
        user: fieldsUser,
      },
    });

    return populatedData;
  },

  async findOne(ctx) {
    const { id } = ctx.params;
    const sanitizedQueryParams = await this.sanitizeQuery(ctx);

    const entity = await strapi.service('api::recipe.recipe').find({
      ...sanitizedQueryParams,
      filters: { documentId: id },
      fields: fieldsRecipe,
      populate: {
        seo: fieldsSeo,
        img: fieldsImg,
        categories: {
          fields: fieldsCategory,
        },
        collections: {
          fields: fieldsCollection,
        },
        user: fieldsUser,
      },
    });

    if (!entity.results || entity.results.length === 0) {
      return ctx.notFound();
    }

    const sanitizedEntity = await this.sanitizeOutput(entity.results[0], ctx);

    return this.transformResponse(sanitizedEntity);
  },

  async findMyRecipes(ctx) {
    const user = ctx.state.user;

    if (!user) {
      return ctx.unauthorized('You must be logged in to view your recipes');
    }

    const populatedData = await strapi.service('api::recipe.recipe').find({
      fields: fieldsRecipe,
      filters: {
        user: user.id,
      },
      populate: {
        img: fieldsImg,
        categories: {
          fields: fieldsCategory,
        },
        user: fieldsUser,
      },
    });

    return populatedData;
  },
}));
