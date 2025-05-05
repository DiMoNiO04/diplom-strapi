/**
 * review controller
 */

import { factories } from '@strapi/strapi';
import { fieldsRecipeReview, fieldsReview, fieldsUserReview } from '../../../utils/getFields';

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

  // async findOne(ctx) {
  //   const { id } = ctx.params;
  //   const sanitizedQueryParams = await this.sanitizeQuery(ctx);

  //   const entity = await strapi.service('api::review.review').find({
  //     ...sanitizedQueryParams,
  //     filters: { documentId: id },
  //     fields: fieldsRecipe,
  //     populate: {
  //       seo: fieldsSeo,
  //       img: fieldsImg,
  //       categories: {
  //         fields: fieldsCategory,
  //       },
  //       collections: {
  //         fields: fieldsCollection,
  //       },
  //       user: fieldsUser,
  //     },
  //   });

  //   if (!entity.results || entity.results.length === 0) {
  //     return ctx.notFound();
  //   }

  //   const sanitizedEntity = await this.sanitizeOutput(entity.results[0], ctx);

  //   return this.transformResponse(sanitizedEntity);
  // },
}));
