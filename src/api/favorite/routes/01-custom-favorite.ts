module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/favorite/userFavorites',
      handler: 'favorite.findRecipesUserFavorite',
    },
    {
      method: 'DELETE',
      path: '/favorite/deleteAll',
      handler: 'favorite.deleteAllFavoritesByUser',
    },
  ],
};
