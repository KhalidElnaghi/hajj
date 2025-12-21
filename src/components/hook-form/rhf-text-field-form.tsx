import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import TextField, { TextFieldProps } from '@mui/material/TextField';

// ----------------------------------------------------------------------

type Props = TextFieldProps & {
  name: string;
  rules?: { [key: string]: any };
  type?: 'text' | 'number';
};

export default function RHFTextField({
  rules,
  value,
  name,
  helperText,
  type = 'text',
  ...other
}: Props) {
  const { control, setValue } = useFormContext();
  useEffect(() => {
    setValue(name, value);
  }, [setValue, name, value]);
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={type === 'number' && value === 0 ? '' : value || ''}
      render={({ field, fieldState: { error } }) => {
        const fieldValue = field.value ?? '';

        return (
          <TextField
            fullWidth
            value={type === 'number' && fieldValue === 0 ? '' : fieldValue}
            onChange={(event) => {
              if (type === 'number') {
                const newValue = event.target.value.replace(/[^\d]/g, '');
                field.onChange(typeof newValue === 'number' ? undefined : Number(newValue));
              } else {
                field.onChange(event.target.value);
              }
            }}
            onBlur={field.onBlur}
            name={field.name}
            error={!!error}
            helperText={error ? error?.message : helperText}
            {...other}
            sx={{ '& input': { textAlign: 'left' } }}
          />
        );
      }}
    />
  );
}
