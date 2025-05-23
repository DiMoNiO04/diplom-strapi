import { factories } from '@strapi/strapi';
import { fieldsCategory, fieldsImg, fieldsRecipe, fieldsSeo } from '../../../utils/getFields';

export default factories.createCoreController('api::category.category', ({ strapi }) => ({
  async find() {
    const populatedData = await strapi.service('api::category.category').find({
      fields: fieldsCategory,
      populate: {
        img: fieldsImg,
      },
      sort: 'title',
    });

    return populatedData;
  },

  async findOne(ctx) {
    const { id } = ctx.params;
    const sanitizedQueryParams = await this.sanitizeQuery(ctx);

    const entity = await strapi.service('api::category.category').find({
      ...sanitizedQueryParams,
      filters: { slug: id },
      fields: fieldsCategory,
      populate: {
        seo: fieldsSeo,
        img: fieldsImg,
        fullImage: fieldsImg,
        recipes: {
          fields: fieldsRecipe,
          populate: {
            img: fieldsImg,
          },
        },
      },
      sort: 'title',
    });

    if (!entity.results || entity.results.length === 0) {
      return ctx.notFound();
    }

    const sanitizedEntity = await this.sanitizeOutput(entity.results[0], ctx);

    return this.transformResponse(sanitizedEntity);
  },
}));
