export interface IRecipe {
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
