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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useTranslations } from 'next-intl';
import { useState, useRef } from 'react';

import Iconify from 'src/components/iconify';

interface ImportDialogProps {
  open: boolean;
  onClose: () => void;
}

interface StatCard {
  label: string;
  value: number;
  icon: string;
  color: string;
  bgColor: string;
}

interface ImportResultRow {
  id: number;
  name: string;
  registrationDate: string;
  status: 'success' | 'error' | 'warning' | 'info';
  accommodation: number;
  bus: number;
  gathering: number;
  supervision: number;
  transport: number;
  package: number;
  healthStatus: number;
  nationality: number;
}

type ImportStep = 'upload' | 'statistics' | 'results';

export default function ImportDialog({ open, onClose }: ImportDialogProps) {
  const t = useTranslations();
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

  // Mock results data with different statuses
  const results: ImportResultRow[] = [
    {
      id: 1,
      name: 'حامد صالح',
      registrationDate: '12/11/2025',
      status: 'success',
      accommodation: 231,
      bus: 14,
      gathering: 0,
      supervision: 0,
      transport: 0,
      package: 0,
      healthStatus: 0,
      nationality: 0,
    },
    {
      id: 2,
      name: 'حامد صالح',
      registrationDate: '12/11/2025',
      status: 'warning',
      accommodation: 231,
      bus: 14,
      gathering: 0,
      supervision: 0,
      transport: 0,
      package: 0,
      healthStatus: 0,
      nationality: 0,
    },
    {
      id: 3,
      name: 'حامد صالح',
      registrationDate: '12/11/2025',
      status: 'error',
      accommodation: 231,
      bus: 14,
      gathering: 0,
      supervision: 0,
      transport: 0,
      package: 0,
      healthStatus: 0,
      nationality: 0,
    },
    {
      id: 4,
      name: 'حامد صالح',
      registrationDate: '12/11/2025',
      status: 'info',
      accommodation: 231,
      bus: 14,
      gathering: 0,
      supervision: 0,
      transport: 0,
      package: 0,
      healthStatus: 0,
      nationality: 0,
    },
    {
      id: 5,
      name: 'حامد صالح',
      registrationDate: '12/11/2025',
      status: 'success',
      accommodation: 231,
      bus: 14,
      gathering: 0,
      supervision: 0,
      transport: 0,
      package: 0,
      healthStatus: 0,
      nationality: 0,
    },
    {
      id: 6,
      name: 'حامد صالح',
      registrationDate: '12/11/2025',
      status: 'info',
      accommodation: 231,
      bus: 14,
      gathering: 0,
      supervision: 0,
      transport: 0,
      package: 0,
      healthStatus: 0,
      nationality: 0,
    },
    {
      id: 7,
      name: 'حامد صالح',
      registrationDate: '12/11/2025',
      status: 'error',
      accommodation: 231,
      bus: 14,
      gathering: 0,
      supervision: 0,
      transport: 0,
      package: 0,
      healthStatus: 0,
      nationality: 0,
    },
    {
      id: 8,
      name: 'حامد صالح',
      registrationDate: '12/11/2025',
      status: 'warning',
      accommodation: 231,
      bus: 14,
      gathering: 0,
      supervision: 0,
      transport: 0,
      package: 0,
      healthStatus: 0,
      nationality: 0,
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

  const getStatusConfig = (status: 'success' | 'error' | 'warning' | 'info') => {
    switch (status) {
      case 'success':
        return { label: 'اكتمل', bgcolor: '#DCFCE7', color: '#3D8A58' };
      case 'warning':
        return { label: 'نسك', bgcolor: '#F4EADB', color: '#B29873' };
      case 'error':
        return { label: 'شحن', bgcolor: '#D0F1FF', color: '#6A99AD' };
      case 'info':
        return { label: 'طيران', bgcolor: '#DCE2F6', color: '#6073BF' };
      default:
        return { label: 'اكتمل', bgcolor: '#D1FAE5', color: '#10B981' };
    }
  };

  const renderImportLogTable = () => (
    <TableContainer
      sx={{
        // maxHeight: 400,
        border: '1px solid #e5e7eb',
        borderRadius: 1,
        overflowX: 'auto',
      }}
    >
      <Table size="small" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell sx={{ bgcolor: '#fafafa', fontWeight: 600, fontSize: 12 }}>
              {t('Label.table_name')}
            </TableCell>
            <TableCell sx={{ bgcolor: '#fafafa', fontWeight: 600, fontSize: 12 }}>
              {t('Label.table_source')}
            </TableCell>
            <TableCell sx={{ bgcolor: '#fafafa', fontWeight: 600, fontSize: 12 }}>
              {t('Label.table_import_date')}
            </TableCell>
            <TableCell sx={{ bgcolor: '#fafafa', fontWeight: 600, fontSize: 12 }}>
              {t('Label.table_created')}
            </TableCell>
            <TableCell sx={{ bgcolor: '#fafafa', fontWeight: 600, fontSize: 12 }}>
              {t('Label.table_updated')}
            </TableCell>
            <TableCell sx={{ bgcolor: '#fafafa', fontWeight: 600, fontSize: 12 }}>
              {t('Label.table_removed_from_accommodation')}
            </TableCell>
            <TableCell sx={{ bgcolor: '#fafafa', fontWeight: 600, fontSize: 12 }}>
              {t('Label.table_removed_from_buses')}
            </TableCell>
            <TableCell sx={{ bgcolor: '#fafafa', fontWeight: 600, fontSize: 12 }}>
              {t('Label.table_updated_pilgrims')}
            </TableCell>
            <TableCell sx={{ bgcolor: '#fafafa', fontWeight: 600, fontSize: 12 }}>
              {t('Label.table_cancelled_pilgrims')}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {results.map((row) => {
            const statusConfig = getStatusConfig(row.status);
            return (
              <TableRow key={row.id} hover>
                <TableCell sx={{ fontSize: 13, color: '#1A1D29' }}>{row.name}</TableCell>
                <TableCell>
                  <Chip
                    label={statusConfig.label}
                    size="small"
                    sx={{
                      bgcolor: statusConfig.bgcolor,
                      color: statusConfig.color,
                      fontSize: 11,
                      fontWeight: 500,
                      height: 24,
                      borderRadius: 1.5,
                    }}
                  />
                </TableCell>
                <TableCell sx={{ fontSize: 13, color: '#1A1D29' }}>
                  {row.registrationDate}
                </TableCell>
                <TableCell sx={{ fontSize: 13, color: '#1A1D29', textAlign: 'center' }}>
                  {row.accommodation}
                </TableCell>
                <TableCell sx={{ fontSize: 13, color: '#1A1D29', textAlign: 'center' }}>
                  {row.bus}
                </TableCell>
                <TableCell sx={{ fontSize: 13, color: '#1A1D29', textAlign: 'center' }}>
                  {row.gathering}
                </TableCell>
                <TableCell sx={{ fontSize: 13, color: '#1A1D29', textAlign: 'center' }}>
                  {row.supervision}
                </TableCell>
                <TableCell sx={{ fontSize: 13, color: '#1A1D29', textAlign: 'center' }}>
                  {row.transport}
                </TableCell>
                <TableCell sx={{ fontSize: 13, color: '#1A1D29', textAlign: 'center' }}>
                  {row.package}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const renderUploadStep = () => (
    <Stack spacing={3}>
      {/* Excel Import Button */}
      {/* <Box>
        <Button
          fullWidth
          variant="contained"
          startIcon={
            <Box
              component="img"
              src="/assets/images/pilgrims/excel.svg"
              alt="excel"
              sx={{ width: 20, height: 20 }}
            />
          }
          sx={{
            bgcolor: '#0d6efd',
            color: 'white',
            py: 1.5,
            borderRadius: 1,
            fontSize: 14,
            fontWeight: 500,
            textTransform: 'none',
            '&:hover': {
              bgcolor: '#0b5ed7',
            },
          }}
        >
          {t('Button.import_from_excel')}
        </Button>
      </Box> */}

      {/* Upload Area */}
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
