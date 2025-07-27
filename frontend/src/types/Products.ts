export type ProductsApiResponseProps = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  category: number | null;
};

export type CheckoutResponseProps = {
  message: string;
};

export type CheckoutProps = {
  id: number;
  quantity: number;
};

export type ProductFormProps = {
  name: string;
  price: number;
  description: string;
  image: string;
  stock: number;
  category: number | null;
};
