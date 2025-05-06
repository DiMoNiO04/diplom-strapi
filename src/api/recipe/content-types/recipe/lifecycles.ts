import {
  FROM_EMAIL,
  STRAPI_URL,
  TIMEOUT_AFTER_CREATE,
  EMAIL_SUBJECT_NEW_RECIPE,
  ERROR_SEND_EMAIL,
  ERROR_AFTER_CREATE_HOOK,
} from '../../../../utils/consts';
import { createHtmlContent } from '../../../../utils/functions';
import { IRecipe } from '../../../../utils/interfaces';

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

          const imageUrl = fullRecipe.img?.[0]?.url ? `${STRAPI_URL}${fullRecipe.img[0].url}` : null;
          const htmlContent = createHtmlContent(fullRecipe, imageUrl);

          for (const user of subscribedUsers) {
            await strapi.plugins['email'].services.email.send({
              to: user.email,
              from: FROM_EMAIL,
              subject: EMAIL_SUBJECT_NEW_RECIPE,
              html: htmlContent,
            });
          }
        } catch (err) {
          console.error(`${ERROR_SEND_EMAIL} ${err}`);
        }
      }, TIMEOUT_AFTER_CREATE);
    } catch (err) {
      console.error(`${ERROR_AFTER_CREATE_HOOK} ${err}`);
    }
  },
};
