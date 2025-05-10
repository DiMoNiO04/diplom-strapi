module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/recipes/my',
      handler: 'recipe.findMyRecipes',
    },
    {
      method: 'GET',
      path: '/recipes/bestRating',
      handler: 'recipe.findBestRecipes',
    },
  ],
};
