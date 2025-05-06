/**
 * recipe controller
 */

import { factories } from '@strapi/strapi';
import {
  fieldsCategory,
  fieldsCollection,
  fieldsFavorites,
  fieldsImg,
  fieldsRecipe,
  fieldsRecipeShort,
  fieldsReview,
  fieldsSeo,
  fieldsUser,
  fieldsUserShort,
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
        favorites: {
          fields: fieldsFavorites,
          populate: {
            recipe: fieldsRecipeShort,
            user: fieldsUserShort,
          },
        },
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
        reviews: {
          fields: fieldsReview,
        },
        favorites: {
          fields: fieldsFavorites,
          populate: {
            recipe: fieldsRecipeShort,
            user: fieldsUserShort,
          },
        },
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

  async findBestRecipes(ctx) {
    const recipesResponse = await strapi.service('api::recipe.recipe').find({
      fields: fieldsRecipe,
      populate: {
        img: fieldsImg,
        categories: { fields: fieldsCategory },
        user: fieldsUser,
        reviews: { fields: fieldsReview },
      },
    });

    const recipes = recipesResponse.results;

    const enriched = recipes.map((recipe) => {
      const reviews = recipe.reviews || [];
      const yesCount = reviews.filter((r) => r.reviewType === 'yes').length;
      const totalCount = reviews.length;
      const positivePercent = totalCount ? Math.round((yesCount / totalCount) * 100) : 0;

      return {
        ...recipe,
        _positivePercent: positivePercent,
        _yesCount: yesCount,
      };
    });

    const sorted = enriched.sort((a, b) => {
      if (b._positivePercent !== a._positivePercent) {
        return b._positivePercent - a._positivePercent;
      }
      return b._yesCount - a._yesCount;
    });

    const top6 = sorted.slice(0, 6);

    const sanitized = await Promise.all(top6.map((recipe) => this.sanitizeOutput(recipe, ctx)));

    return this.transformResponse(sanitized);
  },
}));
