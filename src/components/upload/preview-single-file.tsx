import { useEffect, useMemo, useState } from 'react';

import Box from '@mui/material/Box';

import { CustomFile } from './types';
import FileThumbnail from '../file-thumbnail/file-thumbnail';
import { fileFormat } from '../file-thumbnail/utils';

// ----------------------------------------------------------------------

type PreviewFile = CustomFile | File | string | null | undefined;

type Props = {
  file?: PreviewFile;
};

type CustomPreviewFile = CustomFile & { preview: string };

const hasPreview = (value: PreviewFile): value is CustomPreviewFile =>
  !!value && typeof value !== 'string' && 'preview' in value && !!value.preview;

const isPdfFile = (file: PreviewFile): boolean => {
  if (!file) return false;
  if (typeof file === 'string') {
    return file.toLowerCase().endsWith('.pdf') || fileFormat(file) === 'pdf';
  }
  if (file instanceof File) {
    return file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
  }
  if (file && typeof file === 'object' && 'name' in file) {
    const fileWithName = file as { name?: string };
    return fileWithName.name?.toLowerCase().endsWith('.pdf') || false;
  }
  return false;
};

export default function SingleFilePreview({ file }: Props) {
  const initialValue = useMemo(() => (typeof file === 'string' ? file : ''), [file]);
  const [previewUrl, setPreviewUrl] = useState(initialValue);

  useEffect(() => {
    if (!file) {
      setPreviewUrl('');
      return () => {};
    }

    if (typeof file === 'string') {
      setPreviewUrl(file);
      return () => {};
    }

    if (hasPreview(file)) {
      setPreviewUrl(file.preview);
      return () => {};
    }

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [file]);

  if (!file) {
    return null;
  }

  // For PDF files, use FileThumbnail component instead of trying to render as image
  if (isPdfFile(file)) {
    return (
      <Box
        sx={{
          p: 1,
          top: 0,
          left: 0,
          width: 1,
          height: 1,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <FileThumbnail
          file={typeof file === 'string' ? file : file}
          imageView={false}
          sx={{ width: 64, height: 64 }}
        />
      </Box>
    );
  }

  if (!previewUrl) {
    return null;
  }

  return (
    <Box
      sx={{
        p: 1,
        top: 0,
        left: 0,
        width: 1,
        height: 1,
        position: 'absolute',
      }}
    >
      <Box
        component="img"
        alt="file preview"
        src={previewUrl}
        sx={{
          width: 1,
          height: 1,
          borderRadius: 1,
          objectFit: 'cover',
        }}
        onError={(e) => {
          // If image fails to load, show file thumbnail instead
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
        }}
      />
    </Box>
  );
}
