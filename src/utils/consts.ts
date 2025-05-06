export const SITE_URL: string = process.env.SITE_URL;
export const STRAPI_URL: string = process.env.STRAPI_URL;

export const TIMEOUT_AFTER_CREATE: number = 15 * 1000;

export const FROM_EMAIL: string = 'YummyNom <dimonio02062004@gmail.com>';

export const MS_YOU_MUST_LOGGED: string = 'Вы должны авторизоваться!';

export const EMAIL_SUBJECT_NEW_RECIPE = 'Новый рецепт доступен!';
export const EMAIL_TITLE = 'Новый рецепт от YummyNom!';
export const EMAIL_VIEW_RECIPE_TEXT = 'Посмотреть рецепт';

export const ERROR_SEND_EMAIL = 'Ошибка при отправке письма с рецептом:';
export const ERROR_AFTER_CREATE_HOOK = 'Ошибка в хуке afterCreate:';
