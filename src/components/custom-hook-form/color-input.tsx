import { useState, useCallback, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { MuiColorInput, MuiColorInputColors } from 'mui-color-input';

import { Box, FormLabel, FormHelperText } from '@mui/material';

export default function ColorInput({ label, name }: { label: string; name: string }) {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const watchedValue = watch(name);

  const [value, setHexValue] = useState(watchedValue);

  useEffect(() => {
    setHexValue(watchedValue);
  }, [watchedValue]);

  const handleChange = useCallback(
    (newValue: string, colors: MuiColorInputColors) => {
      setHexValue(colors.hex8);
      setValue(name, newValue);
    },
    [name, setValue]
  );

  return (
    <Box width="100%" >
      <FormLabel sx={{ typography: 'body2', mb: 1, display: 'block' }}>{label}</FormLabel>
      <MuiColorInput
        sx={{
          width: '100%',
        }}
        format="hex"
        value={value}
        onChange={handleChange}
        error={!!errors[name]}
      />
      {errors[name] && (
        <FormHelperText error>{errors[name]?.message as string | undefined}</FormHelperText>
      )}
    </Box>
  );
}
