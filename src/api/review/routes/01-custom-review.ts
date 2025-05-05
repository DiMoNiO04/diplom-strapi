module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/review/cookAgain',
      handler: 'review.findRecipesUserCookAgain',
    },
  ],
};
