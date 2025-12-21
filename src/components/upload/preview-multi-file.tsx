import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { fData } from 'src/utils/format-number';
import IconButton from '@mui/material/IconButton';
import { m, AnimatePresence } from 'framer-motion';
import { alpha, Theme } from '@mui/material/styles';
import ListItemText from '@mui/material/ListItemText';

import Iconify from '../iconify';
import { varFade } from '../animate';
import { UploadProps } from './types';
import FileThumbnail, { fileData } from '../file-thumbnail';

// ----------------------------------------------------------------------

export default function MultiFilePreview({
  thumbnail,
  files,
  onRemove,
  sx,
  isLogoIndex,
  setIsLogoIndex,
}: UploadProps) {
  const urls: string[] = [];

  if (Array.isArray(files)) {
    files.forEach((file) => {
      if (typeof file === 'object' && file && 'url' in file && typeof file.url === 'string') {
        urls.push(file.url);
      }
    });
  }
  return (
    <AnimatePresence initial={false}>
      {files?.map((file, index: number) => {
        const { key, name = '', size = 0 } = fileData(file);
        const isNotFormatFile = typeof file === 'string';
        if (thumbnail) {
          const fadeInUp = varFade().inUp;
          return (
            <Box
              key={key}
              component={m.div as any}
              initial={fadeInUp.initial}
              animate={fadeInUp.animate}
              exit={fadeInUp.exit}
              sx={{
                m: 0.5,
                width: 80,
                height: 80,
                borderRadius: 1.25,
                overflow: 'hidden',
                position: 'relative',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: (theme: Theme) =>
                  !(isLogoIndex === index)
                    ? `solid 1px ${alpha(theme.palette.grey[500], 0.16)}`
                    : `solid 2px ${alpha(theme.palette.success.main, 0.5)}`,
                ...sx,
              }}
              onClick={() => {
                if (setIsLogoIndex) {
                  setIsLogoIndex(index);
                }
              }}
            >
              <FileThumbnail
                tooltip
                imageView
                file={urls[index] ? urls[index] : file}
                sx={{ position: 'absolute' }}
                imgSx={{ position: 'absolute' }}
              />

              {onRemove && (
                <IconButton
                  size="small"
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                    event.preventDefault();
                    event.stopPropagation();
                    onRemove(file);
                  }}
                  sx={{
                    p: 0.5,
                    top: 4,
                    right: 4,
                    position: 'absolute',
                    color: 'common.white',
                    bgcolor: (theme: Theme) => alpha(theme.palette.grey[900], 0.48),
                    '&:hover': {
                      bgcolor: (theme: Theme) => alpha(theme.palette.grey[900], 0.72),
                    },
                  }}
                >
                  <Iconify icon="mingcute:close-line" width={14} />
                </IconButton>
              )}
            </Box>
          );
        }

        const fadeInUp = varFade().inUp;
        return (
          <Box
            key={key}
            component={m.div as any}
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            exit={fadeInUp.exit}
            sx={{
              my: 1,
              py: 1,
              px: 1.5,
              borderRadius: 1,
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              border: (theme: Theme) =>
                !(isLogoIndex === index)
                  ? `solid 1px ${alpha(theme.palette.grey[500], 0.16)}`
                  : `solid 2px ${alpha(theme.palette.success.main, 0.5)}`,
              ...sx,
            }}
            onClick={() => {
              if (setIsLogoIndex) {
                setIsLogoIndex(index);
              }
            }}
          >
            <FileThumbnail file={file} />

            <ListItemText
              primary={isNotFormatFile ? file : name}
              secondary={isNotFormatFile ? '' : fData(size)}
              secondaryTypographyProps={{
                component: 'span',
                typography: 'caption',
              }}
            />

            {onRemove && (
              <IconButton size="small" onClick={() => onRemove(file)}>
                <Iconify icon="mingcute:close-line" width={16} />
              </IconButton>
            )}
          </Box>
        );
      })}
    </AnimatePresence>
  );
}
