/**
 * collection controller
 */

import { factories } from '@strapi/strapi';
import { fieldsCollection, fieldsImg, fieldsRecipe, fieldsSeo } from '../../../utils/getFields';

export default factories.createCoreController('api::collection.collection', ({ strapi }) => ({
  async find() {
    const populatedData = await strapi.service('api::collection.collection').find({
      fields: fieldsCollection,
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
    const sanitizedQueryParams = await this.sanitizeQuery(ctx);

    const entity = await strapi.service('api::collection.collection').find({
      ...sanitizedQueryParams,
      filters: { slug: id },
      fields: fieldsCollection,
      populate: {
        seo: fieldsSeo,
        img: {
          fields: fieldsImg,
        },
        recipes: {
          fields: fieldsRecipe,
        },
      },
    });

    if (!entity.results || entity.results.length === 0) {
      return ctx.notFound();
    }

    const sanitizedEntity = await this.sanitizeOutput(entity.results[0], ctx);

    return this.transformResponse(sanitizedEntity);
  },
}));
