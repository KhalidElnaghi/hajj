import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import TextField, { TextFieldProps } from '@mui/material/TextField';

// ----------------------------------------------------------------------

type Props = TextFieldProps & {
  name: string;
  rules?: { [key: string]: any };
  value?: any;
};

export default function RHFTextarea({ rules, name, value, helperText, type, ...other }: Props) {
  const { control, setValue } = useFormContext();
  useEffect(() => {
    setValue(name, value);
  }, [setValue, name, value]);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      rules={rules}
      render={({ field, fieldState: { error } }) => {
        const fieldValue = field?.value ?? '';

        return (
          <TextField
            fullWidth
            type={type}
            multiline
            rows={3}
            value={fieldValue}
            onChange={(event) => {
              if (type === 'number') {
                field.onChange(Number(event.target.value));
              } else {
                field.onChange(event.target.value);
              }
            }}
            onBlur={field.onBlur}
            name={field.name}
            error={!!error}
            helperText={error ? error?.message : helperText}
            {...other}
          />
        );
      }}
    />
  );
}
