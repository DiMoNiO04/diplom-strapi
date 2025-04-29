export const fieldsRecipe: string[] = [
  'id',
  'title',
  'description',
  'ingredients',
  'instructions',
  'cookingTime',
  'calories',
  'createdAt',
];
export const fieldsImg: string[] = ['url', 'alternativeText', 'width', 'height', 'id'];
export const fieldsCategory: string[] = ['id', 'documentId', 'title', 'description', 'slug'];
export const fieldsCollection: string[] = ['id', 'documentId', 'title', 'description', 'slug'];
export const fieldsPage: string[] = ['id', 'documentId', 'createdAt'];
export const fieldsUser: string[] = ['id', 'documentId', 'username', 'firstName', 'lastName', 'patronymic'];

export const fieldsSeo = {
  populate: {
    metaImage: {
      fields: fieldsImg,
    },
    openGraph: {
      populate: {
        ogImage: {
          fields: fieldsImg,
        },
      },
    },
  },
};
