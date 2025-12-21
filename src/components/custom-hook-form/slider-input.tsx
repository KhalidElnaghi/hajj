'use client';

import { useState, useCallback } from 'react';
import { useFormContext } from 'react-hook-form';

import { Stack, Slider, FormLabel, FormHelperText, Box } from '@mui/material';

export default function SliderInput({ name, label }: { name: string; label: string }) {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const [value, setSliderValue] = useState(watch(name));

  const handleChange = useCallback(
    (event: Event, newValue: number | number[]) => {
      setValue(name, newValue as number);
      setSliderValue(newValue as number);
    },
    [name, setValue]
  );

  return (
    <Box>
      <FormLabel sx={{ typography: 'body2', mb: 1, display: 'block' }}>{label}</FormLabel>
      <Slider value={value} onChange={handleChange} color={errors[name] ? 'error' : 'primary'} />
      {errors[name] && (
        <FormHelperText error>{errors[name]?.message as string | undefined}</FormHelperText>
      )}
    </Box>
  );
}
