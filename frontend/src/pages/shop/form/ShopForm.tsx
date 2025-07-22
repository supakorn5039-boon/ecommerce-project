import ButtonCustom from '@/components/button/ButtonCustom';
import FormInputField from '@/components/Input/FormInputField';
import SelectInputField from '@/components/Input/SelectInputField';
import { categoryOptions } from '@/constants/ProductConst';
import type { ProductFormProps } from '@/types/Products';
import React from 'react';
import { useFormContext } from 'react-hook-form';

export default function ShopForm(): React.ReactElement {
  const {
    register,
    control,
    formState: { errors, isSubmitting },
  } = useFormContext<ProductFormProps>();

  return (
    <React.Fragment>
      <FormInputField
        label="Product Name"
        type="text"
        name="name"
        placeholder="Product Name"
        register={register('name')}
        error={errors.name}
      />

      <FormInputField
        label="Description"
        type="text"
        name="description"
        placeholder="Description"
        register={register('description')}
        error={errors.description}
      />

      <div className="grid grid-cols-2 gap-4">
        <FormInputField
          label="Price"
          type="number"
          name="price"
          placeholder="Price"
          register={register('price', { valueAsNumber: true })}
          error={errors.price}
        />

        <FormInputField
          label="Stock"
          type="number"
          name="stock"
          placeholder="Stock"
          register={register('stock', { valueAsNumber: true })}
          error={errors.stock}
        />
      </div>

      <FormInputField
        label="Image"
        type="text"
        name="image"
        placeholder="Image URL"
        register={register('image')}
        error={errors.image}
      />

      <SelectInputField
        name="category"
        label="Category"
        control={control}
        options={categoryOptions}
        placeholder="Choose a category"
        defaultValue={null}
      />

      <ButtonCustom
        isLoading={isSubmitting}
        type="submit"
        className="bg-black"
        label="Confirm"
        labelClassName="text-white"
      />
    </React.Fragment>
  );
}
