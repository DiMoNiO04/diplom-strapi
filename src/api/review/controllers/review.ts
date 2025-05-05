import { factories } from '@strapi/strapi';
import { fieldsImg, fieldsRecipe, fieldsRecipeReview, fieldsReview, fieldsUserReview } from '../../../utils/getFields';

export default factories.createCoreController('api::review.review', ({ strapi }) => ({
  async find() {
    const populatedData = await strapi.service('api::review.review').find({
      fields: fieldsReview,
      populate: {
        recipe: fieldsRecipeReview,
        user: fieldsUserReview,
      },
    });

    return populatedData;
  },

  async findRecipesUserCookAgain(ctx) {
    const user = ctx.state.user;

    if (!user) {
      return ctx.unauthorized('You must be logged in to view your repeat recipes');
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
