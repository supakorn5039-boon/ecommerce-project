import { Control, FieldValues, Path, useController, type PathValue } from 'react-hook-form';

type Option = {
  label: string;
  value: string | number;
};

type SelectInputProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  label?: string;
  options: Option[];
  placeholder?: string;
  defaultValue: PathValue<TFieldValues, Path<TFieldValues>>;
};

export default function SelectInputField<TFieldValues extends FieldValues>({
  name,
  control,
  label,
  options,
  placeholder = 'Select an option',
  defaultValue,
}: SelectInputProps<TFieldValues>) {
  const {
    field,
    fieldState: { error },
  } = useController<TFieldValues>({
    name,
    control,
    defaultValue: (defaultValue ?? '') as PathValue<TFieldValues, Path<TFieldValues>>,
  });

  const value = field.value ?? '';

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={String(name)} className="text-sm font-medium">
          {label}
        </label>
      )}
      <select
        {...field}
        value={value}
        onChange={(e) => {
          const selectedValue = e.target.value;
          field.onChange(selectedValue === '' ? '' : Number(selectedValue));
        }}
        id={String(name)}
        className={`border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
          error ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-400'
        }`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
}
