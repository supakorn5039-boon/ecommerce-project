export enum ProductCategory {
  COFFEE = 1,
  NON_COFFEE = 2,
}

export const ProductCategoryName: Record<number, string> = {
  [ProductCategory.COFFEE]: 'Coffee',
  [ProductCategory.NON_COFFEE]: 'Non Coffee',
};

export const categoryOptions = [
  { label: 'Coffee', value: ProductCategory.COFFEE },
  { label: 'Non Coffee', value: ProductCategory.NON_COFFEE },
];
