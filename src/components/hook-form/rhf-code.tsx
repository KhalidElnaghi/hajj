import { Controller, useFormContext } from 'react-hook-form';
import { MuiOtpInput, MuiOtpInputProps } from 'mui-one-time-password-input';

import FormHelperText from '@mui/material/FormHelperText';

// ----------------------------------------------------------------------

type RHFCodesProps = MuiOtpInputProps & {
  name: string;
};

export default function RHFCode({ name, ...other }: RHFCodesProps) {
  const { control } = useFormContext();

  const { length = 6, TextFieldsProps, ...rest } = other;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <MuiOtpInput
            {...field}
            autoFocus
            gap={1.5}
            length={length}
            TextFieldsProps={{
              error: !!error,
              placeholder: '-',
              ...TextFieldsProps,
            }}
            validateChar={(character: string, index: number) => /^[0-9]$/.test(character)}
            {...rest}
          />

          {error && (
            <FormHelperText sx={{ px: 2 }} error>
              {error.message}
            </FormHelperText>
          )}
        </div>
      )}
    />
  );
}
