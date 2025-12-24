'use client';

import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

import Iconify from 'src/components/iconify';
import { DialogView } from './shared/types';
import MenuView from './views/MenuView';
import SMSView from './views/SMSView';
import TagsView from './views/TagsView';
import AccommodationView from './views/AccommodationView';
import GatheringView from './views/GatheringView';
import ArrivalView from './views/ArrivalView';

interface BulkActionsDialogProps {
  open: boolean;
  onClose: () => void;
  selectedCount: number;
  selectedPilgrims?: any[];
  allPilgrims?: any[];
  onClearSelection?: () => void;
}

export default function BulkActionsDialog({
  open,
  onClose,
  selectedCount,
  selectedPilgrims,
  allPilgrims,
  onClearSelection,
}: BulkActionsDialogProps) {
  const t = useTranslations('Pilgrims');
  const [currentView, setCurrentView] = useState<DialogView>('menu');

  const handleClose = () => {
    setCurrentView('menu');
    onClose();
  };

  const handleBack = () => {
    setCurrentView('menu');
  };

  const handleViewChange = (view: DialogView) => {
    setCurrentView(view);
  };

  const renderViewContent = () => {
    const viewProps = {
      onBack: handleBack,
      onClose: handleClose,
      selectedCount,
      selectedPilgrims,
      allPilgrims,
      onClearSelection,
    };

    switch (currentView) {
      case 'menu':
        return <MenuView onClose={handleClose} onOptionSelect={handleViewChange} />;
      case 'sms':
        return <SMSView {...viewProps} />;
      case 'tags':
        return <TagsView {...viewProps} />;
      case 'accommodation':
        return <AccommodationView {...viewProps} />;
      case 'gathering':
        return <GatheringView {...viewProps} />;
      case 'arrival':
        return <ArrivalView {...viewProps} />;
      // Add other cases as views are created
      default:
        return <MenuView onClose={handleClose} onOptionSelect={handleViewChange} />;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 2,
        },
      }}
    >
      {/* Persistent Header - Shows in all views */}
      <DialogTitle sx={{ p: 0.3, mb: 0 }}>
        <Stack direction="row" alignItems="flex-start" justifyContent="space-between" spacing={2}>
          <Box sx={{ flex: 1 }}>
            {currentView !== 'menu' && (
              <IconButton
                onClick={handleBack}
                sx={{
                  color: 'text.secondary',
                  mt: -1,
                  mr: -1,
                  border: '1px solid #e5e7eb',
                  p: 0.5,
                  '&:hover': {
                    bgcolor: '#f9fafb',
                    borderColor: '#d1d5db',
                  },
                }}
              >
                <Iconify icon="mdi:arrow-right" width={24} />
              </IconButton>
            )}
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="h4" sx={{ fontWeight: 700, fontSize: 30 }}>
                {t('Title.group_actions')}
              </Typography>
            </Stack>
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                mt: 1,
                fontSize: 13,
                mr: currentView !== 'menu' ? 5 : 0,
              }}
            >
              {t('Description.group_actions_description')}
            </Typography>
          </Box>
          <IconButton
            onClick={handleClose}
            sx={{
              color: 'text.secondary',
              mt: -1,
              mr: -1,
              border: '1px solid #e5e7eb',
              p: 0.5,
              '&:hover': {
                bgcolor: '#f9fafb',
                borderColor: '#d1d5db',
              },
            }}
          >
            <Iconify icon="mdi:close" width={24} />
          </IconButton>
        </Stack>
      </DialogTitle>

      <Divider sx={{ my: 2 }} />

      {/* View Content */}
      <DialogContent sx={{ p: 0 }}>{renderViewContent()}</DialogContent>
    </Dialog>
  );
}
