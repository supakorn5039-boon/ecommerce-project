export enum ProductCategory {
  COFFEE = 1,
  NON_COFFEE = 2,
}

export const ProductCategoryName: Record<number, string> = {
  [ProductCategory.COFFEE]: 'Coffee',
  [ProductCategory.NON_COFFEE]: 'Non Coffee',
};
