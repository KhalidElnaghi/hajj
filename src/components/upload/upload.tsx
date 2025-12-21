import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useTranslations } from 'next-intl';
import { useDropzone } from 'react-dropzone';
import Box, { BoxProps } from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { alpha, Theme } from '@mui/material/styles';
import { UploadIllustration } from 'src/assets/illustrations';

import Iconify from '../iconify';
import { UploadProps } from './types';
import MultiFilePreview from './preview-multi-file';
import RejectionFiles from './errors-rejection-files';
import SingleFilePreview from './preview-single-file';

// ----------------------------------------------------------------------

export default function Upload({
  disabled,
  multiple = false,
  error,
  helperText,
  previewHeight,
  previewWidth,
  //
  file,
  onDelete,
  //
  files,
  thumbnail,
  onUpload,
  onRemove,
  onRemoveAll,
  sx,
  isLogoIndex,
  setIsLogoIndex,
  ...other
}: UploadProps) {
  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    multiple,
    disabled,
    ...other,
  });
  const t = useTranslations();

  const hasFile = !!file && !multiple;

  const hasFiles = !!files && multiple && !!files.length;

  const hasError = isDragReject || !!error;

  const renderPlaceholder = (
    <Stack spacing={3} alignItems="center" justifyContent="center" flexWrap="wrap">
      <UploadIllustration sx={{ width: 1, maxWidth: 100 }} />
      <Stack spacing={1} sx={{ textAlign: 'center' }}>
        {/* <Typography variant="h6">{t('Label.drop_or_select')}</Typography> */}
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {(() => {
            const translation = t('Helper.drop_or_select', { browse: 'browse' });
            const parts = translation.split('browse');
            if (parts.length === 2) {
              return (
                <>
                  {parts[0]}
                  <Box
                    component="span"
                    sx={{
                      mx: 0.5,
                      color: 'primary.main',
                      textDecoration: 'underline',
                      cursor: 'pointer',
                    }}
                  >
                    {t('Label.browse')}
                  </Box>
                  {parts[1]}
                </>
              );
            }
            return translation;
          })()}
        </Typography>
      </Stack>
    </Stack>
  );

  const renderSinglePreview = <SingleFilePreview file={file} />;

  const removeSinglePreview = hasFile && onDelete && (
    <IconButton
      size="small"
      onClick={onDelete}
      sx={{
        top: 16,
        right: 16,
        zIndex: 9,
        position: 'absolute',
        color: (theme: Theme) => alpha(theme.palette.common.white, 0.8),
        bgcolor: (theme: Theme) => alpha(theme.palette.grey[900], 0.72),
        '&:hover': {
          bgcolor: (theme: Theme) => alpha(theme.palette.grey[900], 0.48),
        },
      }}
    >
      <Iconify icon="mingcute:close-line" width={18} />
    </IconButton>
  );
  const renderMultiPreview = hasFiles && (
    <>
      <Box sx={{ my: 3 }}>
        <MultiFilePreview
          files={files}
          thumbnail={thumbnail}
          onRemove={onRemove}
          isLogoIndex={isLogoIndex}
          setIsLogoIndex={setIsLogoIndex}
        />
      </Box>

      <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
        {onRemoveAll && (
          <Button color="inherit" variant="outlined" size="small" onClick={onRemoveAll}>
            {t('Action.remove_all')}
          </Button>
        )}

        {onUpload && (
          <Button
            size="small"
            variant="contained"
            onClick={onUpload}
            startIcon={<Iconify icon="eva:cloud-upload-fill" />}
          >
            {t('Action.upload')}
          </Button>
        )}
      </Stack>
    </>
  );

  const resolvedPreviewHeight = previewHeight ?? 200;
  const resolvedPreviewWidth = previewWidth ?? '100%';

  return (
    <Box
      sx={{
        width: resolvedPreviewWidth,
        maxWidth: resolvedPreviewWidth,
        position: 'relative',
        ...sx,
      }}
    >
      <Box
        {...getRootProps()}
        sx={{
          p: 5,
          outline: 'none',
          borderRadius: 1,
          cursor: 'pointer',
          overflow: 'hidden',
          position: 'relative',
          bgcolor: (theme: Theme) => alpha(theme.palette.grey[500], 0.08),
          border: (theme: Theme) => `1px dashed ${alpha(theme.palette.grey[500], 0.2)}`,
          transition: (theme: Theme) => theme.transitions.create(['opacity', 'padding']),
          '&:hover': {
            opacity: 0.72,
          },
          ...(isDragActive && {
            opacity: 0.72,
          }),
          ...(disabled && {
            opacity: 0.48,
            pointerEvents: 'none',
          }),
          ...(hasError && {
            color: 'error.main',
            borderColor: 'error.main',
            bgcolor: (theme: Theme) => alpha(theme.palette.error.main, 0.08),
          }),
          minHeight: resolvedPreviewHeight,
          ...(hasFile && {
            p: 0,
          }),
        }}
      >
        <input {...getInputProps()} />

        {hasFile ? renderSinglePreview : renderPlaceholder}
      </Box>

      {removeSinglePreview}

      {helperText && helperText}

      <RejectionFiles fileRejections={fileRejections} />

      {renderMultiPreview}
    </Box>
  );
}
