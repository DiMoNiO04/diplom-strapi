module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/recipes/my',
      handler: 'recipe.findMyRecipes',
    },
  ],
};
