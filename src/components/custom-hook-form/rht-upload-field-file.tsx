'use client';

import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';

import { Stack, FormLabel } from '@mui/material';

import { RHFUpload } from '../hook-form';

export default function RHFUploadFieldFile({ name, label }: { name: string; label: string }) {
  const { setValue } = useFormContext();

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue(name, newFile, { shouldValidate: true });
      }
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
