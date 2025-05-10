export const fieldsRecipe: string[] = [
  'id',
  'title',
  'description',
  'ingredients',
  'instructions',
  'cookingTime',
  'calories',
  'createdAt',
  'publishedAt',
];
export const fieldsCategory: string[] = ['id', 'documentId', 'title', 'description', 'slug'];
export const fieldsCollection: string[] = ['id', 'documentId', 'title', 'description', 'slug'];

export const fieldsImg = {
  fields: ['url', 'alternativeText', 'width', 'height', 'id'],
};

export const fieldsUser = {
  fields: ['id', 'documentId', 'username', 'firstName', 'lastName', 'patronymic'],
  populate: {
    avatar: fieldsImg,
  },
};

export const fieldsSeo = {
  populate: {
    metaImage: fieldsImg,
    openGraph: {
      populate: {
        ogImage: fieldsImg,
      },
    },
  },
};

export const fieldsUserShort = {
  fields: ['id', 'documentId', 'email', 'username'],
};

export const fieldsReview = ['id', 'documentId', 'reviewType'];

export const fieldsRecipeShort = {
  fields: ['id', 'documentId', 'title'],
};

export const fieldsFavorites = ['id', 'documentId'];
