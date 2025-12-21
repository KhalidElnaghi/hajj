'use client';

import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';

import { Stack, FormLabel } from '@mui/material';

import { RHFUpload } from '../hook-form';

export default function RHFUploadField({ name, label }: { name: string; label: string }) {
  const { setValue } = useFormContext();

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      setValue(name, URL.createObjectURL(acceptedFiles[0]), { shouldValidate: true });
    },
    [name, setValue]
  );

  return (
    <Stack spacing={1}>
      <FormLabel sx={{ typography: 'body2' }}>{label}</FormLabel>
      <RHFUpload thumbnail name={name} maxSize={3145728} onDrop={handleDrop} />
    </Stack>
  );
}
