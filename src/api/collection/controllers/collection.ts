/**
 * collection controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::collection.collection', ({ strapi }) => ({
  async find(ctx) {
    const populatedData = await strapi.service('api::collection.collection').find({
      populate: {
        seo: { populate: '*' },
        img: { populate: '*' },
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
      populate: {
        seo: { populate: '*' },
        img: { populate: '*' },
      },
    });

    if (!entity.results || entity.results.length === 0) {
      return ctx.notFound();
    }

    const sanitizedEntity = await this.sanitizeOutput(entity.results[0], ctx);

    return this.transformResponse(sanitizedEntity);
  },
}));
