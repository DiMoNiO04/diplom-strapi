interface IRecipe {
  id: number;
  documentId: string;
  title?: string;
  description?: string;
  ingredients?: string;
  instructions?: string;
  cookingTime?: string;
  calories?: string;
  img?: { url: string }[];
  publishedAt?: string;
}

module.exports = {
  async afterCreate(event) {
    const { result } = event;

    if (!result.publishedAt) return;

    try {
      const subscribedUsers = await strapi.db.query('plugin::users-permissions.user').findMany({
        where: { isSubscribe: true },
      });

      setTimeout(async () => {
        try {
          const fullRecipe = (await strapi.entityService.findOne('api::recipe.recipe', result.id, {
            populate: {
              img: true,
            },
          })) as IRecipe;

          const imageUrl = fullRecipe.img?.[0]?.url ? `${process.env.STRAPI_URL}${fullRecipe.img[0].url}` : null;

          const subject = 'Новый рецепт доступен!';

          const htmlContent = `
            <html>
              <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; color: #333; padding: 20px;">
                <div style="max-width: 600px; margin: auto; background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                  <h2 style="text-align: center; color: #ff642f;">Новый рецепт от YummyNom!</h2>
                  <p>Название: <strong>${fullRecipe.title}</strong></p>
                  <p>Время готовки: ${fullRecipe.cookingTime} мин</p>
                  <p>Калории: ${fullRecipe.calories}</p>
                  <p>${fullRecipe.description}</p>
                  ${imageUrl ? `<img src="${imageUrl}" alt="image" style="max-width: 100%; border-radius: 8px;" />` : ''}
                  <p><a href="${process.env.SITE_URL}/recipes/${fullRecipe.documentId}" style="color: #ff642f;">Посмотреть рецепт</a></p>
                </div>
              </body>
            </html>
          `;

          for (const user of subscribedUsers) {
            await strapi.plugins['email'].services.email.send({
              to: user.email,
              from: 'YummyNom <dimonio02062004@gmail.com>',
              subject,
              html: htmlContent,
            });
          }
        } catch (err) {
          console.error('Ошибка при отправке письма с рецептом:', err);
        }
      }, 15 * 1000);
    } catch (err) {
      console.error('Ошибка в хуке afterCreate:', err);
    }
  },
};
