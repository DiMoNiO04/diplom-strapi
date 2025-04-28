import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::category.category', ({ strapi }) => ({
  async find(ctx) {
    const populatedData = await strapi.service('api::category.category').find({
      populate: {
        seo: { populate: '*' },
        img: {
          fields: ['url', 'alternativeText', 'width', 'height', 'id'],
        },
        fullImage: {
          fields: ['url', 'alternativeText', 'width', 'height', 'id'],
        },
      },
    });

    return populatedData;
  },

  async findOne(ctx) {
    const { id } = ctx.params;
    const sanitizedQueryParams = await this.sanitizeQuery(ctx);

    const entity = await strapi.service('api::category.category').find({
      ...sanitizedQueryParams,
      filters: { slug: id },
      populate: {
        seo: { populate: '*' },
        img: {
          fields: ['url', 'alternativeText', 'width', 'height', 'id'],
        },
        fullImage: {
          fields: ['url', 'alternativeText', 'width', 'height', 'id'],
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
