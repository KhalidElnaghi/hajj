import { Controller, useFormContext } from 'react-hook-form';

import TextField, { TextFieldProps } from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import Iconify from 'src/components/iconify';
import { IcEye, IcEyeOff } from 'src/assets/icons';
import { useBoolean } from 'src/hooks/use-boolean';

// ----------------------------------------------------------------------

type Props = Omit<TextFieldProps, 'type'> & {
  name: string;
};

export default function RHFPassword({ name, helperText, ...other }: Props) {
  const { control } = useFormContext();
  const showPassword = useBoolean();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const fieldValue = field.value ?? '';

        return (
          <TextField
            fullWidth
            type={showPassword.value ? 'text' : 'password'}
            value={fieldValue}
            onChange={field.onChange}
            onBlur={field.onBlur}
            name={field.name}
            error={!!error}
            helperText={error ? error?.message : helperText}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton onClick={showPassword.onToggle} edge="start" tabIndex={-1}>
                      {showPassword.value ? <IcEyeOff /> : <IcEye />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
            {...other}
          />
        );
      }}
    />
  );
}
