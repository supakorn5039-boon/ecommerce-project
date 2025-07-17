import { zodResolver } from '@hookform/resolvers/zod';
import type { Resolver } from 'react-hook-form';
import { z } from 'zod';

const ProductSchema = z.object({
  name: z.string().min(1, 'กรุณากรอกชื่อสินค้า'),
  price: z.number().min(1, 'กรุณากรอกราคาสินค้า'),
  description: z.string().min(1, 'กรุณากรอกรายละเอียดสินค้า'),
  image: z.string().min(1, 'กรุณาเลือกรูปภาพสินค้า'),
  stock: z.number().min(1, 'กรุณากรอกจํานวนสินค้า'),
  category: z.number().nullable(),
});

export type ProductSchemeProps = z.infer<typeof ProductSchema>;

export const ProductDefaultValue: ProductSchemeProps = {
  name: '',
  price: 0,
  description: '',
  image: '',
  stock: 0,
  category: null,
};

export const ProductResolver: Resolver<ProductSchemeProps> = zodResolver(ProductSchema);
