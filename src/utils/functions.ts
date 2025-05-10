import { EMAIL_TITLE, EMAIL_VIEW_RECIPE_TEXT, SITE_URL } from './consts';
import { IRecipe } from './interfaces';

export const createHtmlContent = (fullRecipe: IRecipe, imageUrl: string | null): string => {
  return `
    <html>
      <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; color: #333; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
          <h2 style="text-align: center; color: #ff642f;">${EMAIL_TITLE}</h2>
          <p>Название: <strong>${fullRecipe.title}</strong></p>
          <p>Время готовки: ${fullRecipe.cookingTime} мин</p>
          <p>Калории: ${fullRecipe.calories}</p>
          <p>${fullRecipe.description}</p>
          ${imageUrl ? `<img src="${imageUrl}" alt="image" style="max-width: 100%; border-radius: 8px;" />` : ''}
          <p><a href="${SITE_URL}/recipes/${fullRecipe.documentId}" style="color: #ff642f;">${EMAIL_VIEW_RECIPE_TEXT}</a></p>
        </div>
      </body>
    </html>
  `;
};
