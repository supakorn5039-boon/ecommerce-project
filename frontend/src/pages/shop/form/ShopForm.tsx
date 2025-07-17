import type { ProductFormProps } from '@/types/Products';
import type React from 'react';
import { useFormContext } from 'react-hook-form';

type ShopFormProps = {
  onSubmit: (values: ProductFormProps) => void;
};

export default function ShopForm({ onSubmit }: ShopFormProps): React.ReactElement {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useFormContext<ProductFormProps>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block mb-1 font-semibold">Name</label>
        <input {...register('name')} className="w-full border p-2 rounded" />
        {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
      </div>

      <div>
        <label className="block mb-1 font-semibold">Description</label>
        <textarea {...register('description')} className="w-full border p-2 rounded" />
        {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-semibold">Price</label>
          <input type="number" {...register('price', { valueAsNumber: true })} className="w-full border p-2 rounded" />
          {errors.price && <span className="text-red-500 text-sm">{errors.price.message}</span>}
        </div>

        <div>
          <label className="block mb-1 font-semibold">Stock</label>
          <input type="number" {...register('stock', { valueAsNumber: true })} className="w-full border p-2 rounded" />
          {errors.stock && <span className="text-red-500 text-sm">{errors.stock.message}</span>}
        </div>
      </div>

      <div>
        <label className="block mb-1 font-semibold">Image URL</label>
        <input {...register('image')} className="w-full border p-2 rounded" />
        {errors.image && <span className="text-red-500 text-sm">{errors.image.message}</span>}
      </div>

      <div>
        <label className="block mb-1 font-semibold">Category</label>
        <select {...register('category', { valueAsNumber: true })} className="w-full border p-2 rounded">
          <option value="">Select</option>
          <option value={1}>Coffee</option>
          <option value={2}>Non-Coffee</option>
        </select>
        {errors.category && <span className="text-red-500 text-sm">{errors.category.message}</span>}
      </div>

      <div className="pt-4 text-right">
        <button type="submit" className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800">
          {isSubmitting ? 'Saving...' : 'Save Product'}
        </button>
      </div>
    </form>
  );
}
