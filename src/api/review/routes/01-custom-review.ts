module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/reviews/cookAgain',
      handler: 'review.findRecipesUserCookAgain',
    },
  ],
};
