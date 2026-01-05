'use client';

import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { useTranslations, useLocale } from 'next-intl';
import { useState, useRef, useMemo } from 'react';

import Iconify from 'src/components/iconify';
import SharedTable from 'src/components/custom-shared-table/shared-table/SharedTable';
import { headCellType, cellAlignment } from 'src/components/custom-shared-table/shared-table/types';

interface ImportHistory {
  id: number;
  source: string;
  user_id: number;
  user: {
    id: number;
    name: string;
    email: string;
  };
  total_count: number;
  added_count: number;
  updated_count: number;
  deleted_from_bus_count: number;
  deleted_from_housing_count: number;
  deleted_from_gathering_points: number;
  changed_res_count: number;
  repeated: number;
  cancelled_count: number;
  created_at: string;
  updated_at: string;
}

interface ImportDialogProps {
  open: boolean;
  onClose: () => void;
  importHistory?: ImportHistory[];
}

interface StatCard {
  label: string;
  value: number;
  icon: string;
  color: string;
  bgColor: string;
}

type ImportStep = 'upload' | 'statistics' | 'results';

export default function ImportDialog({ open, onClose, importHistory = [] }: ImportDialogProps) {
  const t = useTranslations('Pilgrims');
  const locale = useLocale();
  const [currentStep, setCurrentStep] = useState<ImportStep>('upload');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [downloadType, setDownloadType] = useState('arabic');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showImportLog, setShowImportLog] = useState<string>('no');

  // Mock statistics data
  const statistics: StatCard[] = [
    {
      label: t('Label.total_records_stat'),
      value: 42,
      icon: '/assets/images/pilgrims/statiscits/total.svg',
      color: '#1570EF',
      bgColor: '#F0F7FF',
    },
    {
      label: t('Label.added_records'),
      value: 42,
      icon: '/assets/images/pilgrims/statiscits/added.svg',
      color: '#34C759',
      bgColor: '#F0FDF4',
    },
    {
      label: t('Label.updated_records'),
      value: 42,
      icon: '/assets/images/pilgrims/statiscits/updated.svg',
      color: '#FF9500',
      bgColor: '#FFF8E1',
    },
    {
      label: t('Label.accommodation_deleted'),
      value: 42,
      icon: '/assets/images/pilgrims/statiscits/accommodation-deleted.svg',
      color: '#9333EA',
      bgColor: '#F3E8FF',
    },
    {
      label: t('Label.bus_deleted'),
      value: 42,
      icon: '/assets/images/pilgrims/statiscits/bus-deleted.svg',
      color: '#EC4899',
      bgColor: '#FCE7F3',
    },
    {
      label: t('Label.cancelled_records'),
      value: 42,
      icon: '/assets/images/pilgrims/statiscits/canceled.svg',
      color: '#A2845E',
      bgColor: '#F5F5DC',
    },
  ];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file && file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      setSelectedFile(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleUpload = async () => {
    if (selectedFile) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        setCurrentStep('statistics');
      }, 1500);
    }
  };

  const handleConfirmStatistics = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep('results');
    }, 1500);
  };

  const handleFinalConfirm = () => {
    console.log('Final import confirmed');
    handleClose();
  };

  const handleClose = () => {
    setCurrentStep('upload');
    setSelectedFile(null);
    onClose();
  };

  // Table configuration for import history
  const tableHead: headCellType[] = useMemo(
    () => [
      { id: 'user_name', label: t('Label.table_name'), align: cellAlignment.left },
      { id: 'source', label: t('Label.table_source'), align: cellAlignment.left },
      { id: 'created_at', label: t('Label.table_import_date'), align: cellAlignment.left },
      { id: 'added_count', label: t('Label.table_created'), align: cellAlignment.center },
      { id: 'updated_count', label: t('Label.table_updated'), align: cellAlignment.center },
      {
        id: 'deleted_from_housing_count',
        label: t('Label.table_removed_from_accommodation'),
        align: cellAlignment.center,
      },
      {
        id: 'deleted_from_bus_count',
        label: t('Label.table_removed_from_buses'),
        align: cellAlignment.center,
      },
      {
        id: 'changed_res_count',
        label: t('Label.table_updated_pilgrims'),
        align: cellAlignment.center,
      },
      {
        id: 'cancelled_count',
        label: t('Label.table_cancelled_pilgrims'),
        align: cellAlignment.center,
      },
    ],
    [t]
  );

  // Custom render functions for special columns
  const customRender = useMemo(
    () => ({
      user_name: (row: ImportHistory) => (
        <Typography sx={{ fontSize: 13, color: '#1A1D29' }}>{row.user?.name || '-'}</Typography>
      ),
      source: (row: ImportHistory) => (
        <Chip
          label={row.source}
          size="small"
          sx={{
            bgcolor: '#F0F7FF',
            color: '#1570EF',
            fontSize: 11,
            fontWeight: 500,
            height: 24,
            borderRadius: 1.5,
          }}
        />
      ),
      created_at: (row: ImportHistory) => (
        <Typography sx={{ fontSize: 13, color: '#1A1D29' }}>
          {new Date(row.created_at).toLocaleDateString(locale, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            // hour: '2-digit',
            // minute: '2-digit',
          })}
        </Typography>
      ),
    }),
    [locale]
  );

  const renderImportLogTable = () => (
    <Box sx={{ border: '1px solid #e5e7eb', borderRadius: 1 }}>
      <SharedTable<ImportHistory>
        tableHead={tableHead}
        data={importHistory}
        count={importHistory.length}
        disablePagination
        order={false}
        customRender={customRender}
        headColor="#fafafa"
      />
    </Box>
  );

  const renderUploadStep = () => (
    <Stack spacing={3}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => fileInputRef.current?.click()}
          sx={{
            border: '2px dashed #e5e7eb',
            borderRadius: 2,
            p: 4,
            textAlign: 'center',
            cursor: 'pointer',
            bgcolor: '#fafafa',
            transition: 'all 0.2s',
            maxWidth: 500,
            width: '100%',
            '&:hover': {
              borderColor: '#0d6efd',
              bgcolor: '#f3f7ff',
            },
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />
          <Box
            component="img"
            src="/assets/images/pilgrims/import-excel.svg"
            alt="upload"
            sx={{ width: 45, height: 45, mx: 'auto', mb: 2, opacity: 0.7 }}
          />
          <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: 14, mb: 0.5 }}>
            {t('Label.drag_file_or_click')}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: 12 }}>
            {t('Label.download_excel_file')}
          </Typography>
          {selectedFile && (
            <Box
              sx={{
                mt: 2,
                p: 1.5,
                bgcolor: 'white',
                borderRadius: 1,
                border: '1px solid #e5e7eb',
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {selectedFile.name}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>

      {/* Action Buttons */}
      <Stack direction="row" spacing={1.5} justifyContent="flex-end" sx={{ mt: 2 }}>
        <Button
          variant="text"
          onClick={handleClose}
          sx={{
            borderRadius: 1,
            color: '#dc3545',
            px: 3,
            '&:hover': {
              bgcolor: '#fff5f5',
            },
          }}
        >
          {t('Button.cancel')}
        </Button>
        <Button
          variant="contained"
          onClick={handleUpload}
          disabled={!selectedFile || isLoading}
          sx={{
            borderRadius: 1,
            bgcolor: '#0d6efd',
            px: 3,
            '&:hover': {
              bgcolor: '#0b5ed7',
            },
          }}
        >
          {isLoading ? t('Label.loading_upload') : t('Button.import_data')}
        </Button>
      </Stack>

      {/* View Import Log Toggle */}
      <Box>
        <Button
          onClick={() => setShowImportLog(showImportLog === 'yes' ? 'no' : 'yes')}
          endIcon={
            <Iconify
              icon={showImportLog === 'yes' ? 'eva:arrow-up-fill' : 'eva:arrow-down-fill'}
              width={20}
            />
          }
          sx={{
            border: '1px solid #e5e7eb',
            borderRadius: 1.5,
            bgcolor: 'white',
            color: '#667085',
            py: 1.5,
            px: 2.5,
            textTransform: 'none',
            fontSize: 14,
            fontWeight: 500,
            '&:hover': {
              bgcolor: '#f9fafb',
              borderColor: '#d1d5db',
            },
          }}
        >
          {showImportLog === 'yes' ? t('Label.hide_import_log') : t('Label.view_import_log')}
        </Button>
      </Box>

      {/* Import Log Table - Only show when "yes" is selected */}
      {showImportLog === 'yes' && renderImportLogTable()}
    </Stack>
  );

  const renderStatisticsStep = () => (
    <Stack spacing={3}>
      {/* Statistics Header with Black Outline */}
      <Box
        sx={{
          borderRadius: 2.5,
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, fontSize: 16, mb: 0.5 }}>
              {t('Label.import_statistics_title')}
            </Typography>
            <Typography variant="body2" sx={{ color: '#5D6679', fontSize: 13 }}>
              {t('Label.import_statistics_subtitle')}
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: '#5D6679', fontSize: 13 }}>
            {t('Label.number_of_rows')} (8)
          </Typography>
        </Stack>

        {/* Statistics Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
            gap: 2,
            borderRadius: 2.5,
            p: 2.5,
            bgcolor: '#f8f9fa',
            border: '1px solid #e5e7eb',
          }}
        >
          {statistics.map((stat, index) => (
            <Box
              key={index}
              sx={{
                border: '1px solid #e5e7eb',
                borderRadius: 2,
                px: 2,
                py: 1,
                bgcolor: 'white',
                textAlign: 'start',
                transition: 'all 0.2s',
                '&:hover': {
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                },
              }}
            >
              <Box
                component="img"
                src={stat.icon}
                alt={stat.label}
                sx={{ width: 20, height: 20, mb: 1.5 }}
              />
              <Typography
                variant="body2"
                sx={{ color: '#5D6679', fontSize: 13, mb: 1, fontWeight: 400 }}
              >
                {stat.label}
              </Typography>
              <Typography sx={{ fontWeight: 700, color: '#1A1D29', fontSize: 15 }}>
                {stat.value}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* View Import Log Toggle */}
      <Box>
        <Button
          onClick={() => setShowImportLog(showImportLog === 'yes' ? 'no' : 'yes')}
          endIcon={
            <Iconify
              icon={showImportLog === 'yes' ? 'eva:arrow-up-fill' : 'eva:arrow-down-fill'}
              width={20}
            />
          }
          sx={{
            border: '1px solid #e5e7eb',
            borderRadius: 1.5,
            bgcolor: 'white',
            color: '#667085',
            py: 1.5,
            px: 2.5,
            textTransform: 'none',
            fontSize: 14,
            fontWeight: 500,
            '&:hover': {
              bgcolor: '#f9fafb',
              borderColor: '#d1d5db',
            },
          }}
        >
          {showImportLog === 'yes' ? t('Label.hide_import_log') : t('Label.view_import_log')}
        </Button>
      </Box>

      {/* Import Log Table - Only show when "yes" is selected */}
      {showImportLog === 'yes' && renderImportLogTable()}

      {/* Action Buttons */}
      <Stack direction="row" spacing={1.5} justifyContent="flex-end">
        <Button
          variant="text"
          onClick={handleClose}
          sx={{
            borderRadius: 1,
            color: '#dc3545',
            px: 3,
            '&:hover': {
              bgcolor: '#fff5f5',
            },
          }}
        >
          {t('Button.cancel')}
        </Button>
        <Button
          variant="contained"
          onClick={handleConfirmStatistics}
          disabled={isLoading}
          sx={{
            borderRadius: 1,
            bgcolor: '#0d6efd',
            px: 3,
            '&:hover': {
              bgcolor: '#0b5ed7',
            },
          }}
        >
          {isLoading ? t('Label.loading_processing') : t('Button.import_data')}
        </Button>
      </Stack>
    </Stack>
  );

  const renderResultsStep = () => (
    <Stack spacing={3}>
      {/* View Import Log Toggle with Count */}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Button
          onClick={() => setShowImportLog(showImportLog === 'yes' ? 'no' : 'yes')}
          endIcon={
            <Iconify
              icon={showImportLog === 'yes' ? 'eva:arrow-up-fill' : 'eva:arrow-down-fill'}
              width={20}
            />
          }
          sx={{
            border: '1px solid #e5e7eb',
            borderRadius: 1.5,
            bgcolor: 'white',
            color: '#667085',
            py: 1.5,
            px: 2.5,
            textTransform: 'none',
            fontSize: 14,
            fontWeight: 500,
            '&:hover': {
              bgcolor: '#f9fafb',
              borderColor: '#d1d5db',
            },
          }}
        >
          {showImportLog === 'yes' ? t('Label.hide_import_log') : t('Label.view_import_log')}
        </Button>
        <Typography variant="body2" sx={{ color: '#5D6679', fontSize: 14 }}>
          {t('Label.total_records')} (8)
        </Typography>
      </Stack>

      {/* Table - Only show when "yes" is selected */}
      {showImportLog === 'yes' && renderImportLogTable()}

      {/* Action Buttons */}
      <Stack direction="row" spacing={1.5} justifyContent="flex-end">
        <Button
          variant="text"
          onClick={handleClose}
          sx={{
            borderRadius: 1,
            color: '#dc3545',
            px: 3,
            '&:hover': {
              bgcolor: '#fff5f5',
            },
          }}
        >
          {t('Button.cancel')}
        </Button>
        <Button
          variant="contained"
          onClick={handleFinalConfirm}
          sx={{
            borderRadius: 1,
            bgcolor: '#0d6efd',
            px: 3,
            '&:hover': {
              bgcolor: '#0b5ed7',
            },
          }}
        >
          {t('Button.import_data')}
        </Button>
      </Stack>
    </Stack>
  );

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={currentStep === 'results' ? 'lg' : 'md'}
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 2,
        },
      }}
    >
      <DialogTitle sx={{ p: 0, mb: 2 }}>
        <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" sx={{ fontWeight: 700, fontSize: 24, mb: 1 }}>
              {t('Title.import_pilgrim_data')}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: 13 }}>
              {t('Description.import_pilgrim_data_description')}
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

      <DialogContent sx={{ p: 0 }}>
        {currentStep === 'upload' && renderUploadStep()}
        {currentStep === 'statistics' && renderStatisticsStep()}
        {currentStep === 'results' && renderResultsStep()}
      </DialogContent>
    </Dialog>
  );
}
