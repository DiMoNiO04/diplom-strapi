/**
 * favorite controller
 */

import { factories } from '@strapi/strapi';
import { fieldsFavorites, fieldsImg, fieldsRecipe, fieldsRecipeShort, fieldsUserShort } from '../../../utils/getFields';
import { MS_NO_DELETE_FAVORITES, MS_YOU_MUST_LOGGED } from '../../../utils/consts';

export default factories.createCoreController('api::favorite.favorite', ({ strapi }) => ({
  async find() {
    const populatedData = await strapi.service('api::favorite.favorite').find({
      fields: fieldsFavorites,
      populate: {
        recipe: fieldsRecipeShort,
        user: fieldsUserShort,
      },
    });

    return populatedData;
  },

  async findRecipesUserFavorite(ctx) {
    const user = ctx.state.user;

    if (!user) {
      return ctx.unauthorized(MS_YOU_MUST_LOGGED);
    }

    const favoritesResponse = await strapi.service('api::favorite.favorite').find({
      filters: {
        user: user.id,
      },
      fields: fieldsFavorites,
      populate: {
        recipe: {
          fields: fieldsRecipe,
          populate: {
            img: fieldsImg,
            favorites: {
              fields: fieldsFavorites,
              populate: {
                recipe: fieldsRecipeShort,
                user: fieldsUserShort,
              },
            },
          },
        },
      },
    });

    const favorites = favoritesResponse.results;

    const sanitized = await Promise.all(favorites.map((favorite) => this.sanitizeOutput(favorite, ctx)));

    return this.transformResponse(sanitized);
  },

  async deleteAllFavoritesByUser(ctx) {
    const user = ctx.state.user;

    if (!user) {
      return ctx.unauthorized(MS_YOU_MUST_LOGGED);
    }

    const userFavorites = await strapi.entityService.findMany('api::favorite.favorite', {
      filters: { user: user.id },
      fields: ['id'],
    });

    const favoriteIds = userFavorites.map((fav) => fav.id);

    if (favoriteIds.length === 0) {
      return ctx.send({ message: MS_NO_DELETE_FAVORITES });
    }

    await Promise.all(favoriteIds.map((id) => strapi.entityService.delete('api::favorite.favorite', id)));

    return ctx.send({ message: `${favoriteIds.length} favorites deleted.` });
  },
}));
