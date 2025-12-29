import { useTranslations } from 'next-intl';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { Box, Typography } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { LoadingButton } from '@mui/lab';

import { ConfirmDialogProps } from './types';
import CloseButton from '../dialog/CloseButton';

// ----------------------------------------------------------------------

export default function ConfirmDialog({
  title,
  content,
  buttonTitle,
  buttonColor,
  action,
  open,
  onClose,
  handleConfirmDelete,
  loading = false,
  ...other
}: ConfirmDialogProps) {
  const t = useTranslations();
  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose} {...other}>
      <CloseButton onClose={onClose} />
      <DialogTitle sx={{ pb: 0.5 }}>{title || t('Dialog.Delete')}</DialogTitle>

      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box sx={{ py: 1 }}>
          {content ? (
            <Typography variant="body1"> {content} </Typography>
          ) : (
            <Typography variant="body1" color="disabled">
              {' '}
              {t('Dialog.delete_confirm_generic')}{' '}
            </Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <LoadingButton 
          variant="contained" 
          color={buttonColor || 'error'} 
          onClick={handleConfirmDelete}
          loading={loading}
        >
          {typeof buttonTitle === 'string' ? buttonTitle : t('Dialog.Delete')}
        </LoadingButton>
        <Button variant="outlined" color="inherit" onClick={onClose} disabled={loading}>
          {t('Dialog.Cancel')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
