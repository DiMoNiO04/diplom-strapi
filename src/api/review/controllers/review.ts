/**
 * review controller
 */

import { factories } from '@strapi/strapi';
import { fieldsImg, fieldsRecipe, fieldsRecipeShort, fieldsReview, fieldsUserShort } from '../../../utils/getFields';
import { MS_YOU_MUST_LOGGED } from '../../../utils/consts';

export default factories.createCoreController('api::review.review', ({ strapi }) => ({
  async find() {
    const populatedData = await strapi.service('api::review.review').find({
      fields: fieldsReview,
      populate: {
        recipe: fieldsRecipeShort,
        user: fieldsUserShort,
      },
    });

    return populatedData;
  },

  async findRecipesUserCookAgain(ctx) {
    const user = ctx.state.user;

    if (!user) {
      return ctx.unauthorized(MS_YOU_MUST_LOGGED);
    }

    const reviewsResponse = await strapi.service('api::review.review').find({
      filters: {
        user: user.id,
        reviewType: 'yes',
      },
      fields: fieldsReview,
      populate: {
        recipe: {
          fields: fieldsRecipe,
          populate: {
            img: fieldsImg,
          },
        },
      },
    });

    const reviews = reviewsResponse.results;

    const sanitized = await Promise.all(reviews.map((review) => this.sanitizeOutput(review, ctx)));

    return this.transformResponse(sanitized);
  },
}));
