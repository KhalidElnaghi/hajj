'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  TextField,
  InputAdornment,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Select,
  MenuItem,
  FormControl,
  ToggleButtonGroup,
  ToggleButton,
  Chip,
  Avatar,
  Autocomplete,
} from '@mui/material';
import { useTranslations } from 'next-intl';
import Iconify from 'src/components/iconify';
import Image from 'next/image';

// ----------------------------------------------------------------------

type FilterDialogProps = {
  open: boolean;
  onClose: () => void;
  onApplyFilters?: (filters: any) => void;
  externalFilters?: any;
};

export default function FilterDialog({
  open,
  onClose,
  onApplyFilters,
  externalFilters,
}: FilterDialogProps) {
  const t = useTranslations();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  // Sample supervisors list - replace with actual data from API
  const supervisorsList = [
    { id: '1', name: 'محمد فيصل' },
    { id: '2', name: 'أحمد علي' },
    { id: '3', name: 'خالد محمود' },
    { id: '4', name: 'عمر حسن' },
    { id: '5', name: 'سعيد عبدالله' },
  ];

  // Form state
  const [filters, setFilters] = useState({
    // Personal Information
    nationality: '',
    city: '',
    badge: '',
    gender: '',
    marriedLate: '',
    bookingStatus: '',
    package: '',

    // Assembly Points
    gatheringPointType: '',
    gatheringPoint: '',
    destination: '',

    // Accommodation
    roomNumber: '',
    accommodationDestination: '',
    campStatus: '',

    // Transportation
    busNumber: '',

    // Health Status
    healthStatus: '',

    // Supervision
    supervisors: [] as any[],
    importFile: '',

    // Shipping Operations
    shippingManagement: '',
    shipmentStatus: '',
  });

  // Sync with external filters when they change
  useEffect(() => {
    if (externalFilters) {
      const updatedFilters = {
        nationality: externalFilters.nationality || '',
        city: externalFilters.city || '',
        badge: externalFilters.badge || '',
        gender: externalFilters.gender || '',
        marriedLate: externalFilters.marriedLate || '',
        bookingStatus: externalFilters.bookingStatus || '',
        package: externalFilters.package || '',
        gatheringPointType: externalFilters.gatheringPointType || '',
        gatheringPoint: externalFilters.gatheringPoint || '',
        destination: externalFilters.destination || '',
        roomNumber: externalFilters.roomNumber || '',
        accommodationDestination: externalFilters.accommodationDestination || '',
        campStatus: externalFilters.campStatus || '',
        busNumber: externalFilters.busNumber || '',
        healthStatus: externalFilters.healthStatus || '',
        supervisors: externalFilters.supervisors || [],
        importFile: externalFilters.importFile || '',
        shippingManagement: externalFilters.shippingManagement || '',
        shipmentStatus: externalFilters.shipmentStatus || '',
      };

      setFilters(updatedFilters);

      // Determine which sections should be expanded based on filters
      const sectionsToExpand = [];

      if (
        updatedFilters.nationality ||
        updatedFilters.city ||
        updatedFilters.package ||
        updatedFilters.badge ||
        updatedFilters.gender ||
        updatedFilters.marriedLate ||
        updatedFilters.bookingStatus
      ) {
        sectionsToExpand.push('personal');
      }

      if (
        updatedFilters.gatheringPointType ||
        updatedFilters.gatheringPoint ||
        updatedFilters.destination
      ) {
        sectionsToExpand.push('gathering');
      }

      if (
        updatedFilters.roomNumber ||
        updatedFilters.accommodationDestination ||
        updatedFilters.campStatus
      ) {
        sectionsToExpand.push('accommodation');
      }

      if (updatedFilters.busNumber) {
        sectionsToExpand.push('transportation');
      }

      if (updatedFilters.healthStatus) {
        sectionsToExpand.push('health');
      }

      if (updatedFilters.supervisors?.length > 0 || updatedFilters.importFile) {
        sectionsToExpand.push('supervision');
      }

      if (updatedFilters.shippingManagement || updatedFilters.shipmentStatus) {
        sectionsToExpand.push('shipping');
      }

      setExpandedSections(sectionsToExpand);
    }
  }, [externalFilters]);

  const handleAccordionChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpandedSections((prev) =>
        isExpanded ? [...prev, panel] : prev.filter((item) => item !== panel)
      );
    };

  const handleReset = () => {
    setFilters({
      nationality: '',
      city: '',
      package: '',
      badge: '',
      gender: '',
      marriedLate: '',
      bookingStatus: '',
      gatheringPointType: '',
      gatheringPoint: '',
      destination: '',
      roomNumber: '',
      accommodationDestination: '',
      campStatus: '',
      busNumber: '',
      healthStatus: '',
      supervisors: [],
      importFile: '',
      shippingManagement: '',
      shipmentStatus: '',
    });
    setSearchTerm('');
    setExpandedSections([]);
  };

  const handleApply = () => {
    // Apply filters logic here
    console.log('Applied filters:', filters);
    if (onApplyFilters) {
      onApplyFilters(filters);
    }
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          maxHeight: '90vh',
          boxShadow: 'none',
          bgcolor: 'background.paper',
        },
      }}
    >
      {/* Dialog Header */}
      <DialogTitle
        sx={{
          px: 3,
          py: 2.5,
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography
              sx={{
                color: '#1E293B',
                fontSize: 27,
                fontWeight: 500,
                lineHeight: '30px',
                mb: 0.5,
              }}
            >
              {t('Title.filter_pilgrim_data')}
            </Typography>
            <Typography
              sx={{
                color: '#64748B',
                fontSize: 14,
                fontWeight: 400,
                lineHeight: '18px',
              }}
            >
              {t('Description.filter_pilgrim_subtitle')}
            </Typography>
          </Box>
          <IconButton onClick={onClose} sx={{ color: 'text.secondary' }}>
            <Iconify icon="mdi:close" width={24} />
          </IconButton>
        </Stack>
      </DialogTitle>

      {/* Dialog Content */}
      <DialogContent sx={{ px: 3, py: 0 }}>
        {/* Search Field */}
        <Box sx={{ py: 3 }}>
          <TextField
            fullWidth
            placeholder={t('Placeholder.search_by_nationality_gathering')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 1,
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Accordion Sections */}
        <Box sx={{ mt: 2 }}>
          {/* Personal Information */}
          <Accordion
            expanded={expandedSections.includes('personal')}
            onChange={handleAccordionChange('personal')}
            TransitionProps={{ timeout: 300 }}
            sx={{
              boxShadow: 'none !important',
              border: 'none',
              '&:before': { display: 'none' },
              '&.Mui-expanded': {
                margin: 0,
              },
              mb: 0,
            }}
          >
            <AccordionSummary
              expandIcon={
                expandedSections.includes('personal') ? (
                  <Iconify icon="mdi:chevron-down" width={20} color="#64748B" />
                ) : (
                  <Iconify icon="mdi:plus" width={20} color="#64748B" />
                )
              }
              sx={{
                px: 0,
                minHeight: 56,
                '& .MuiAccordionSummary-content': { my: 1.5, mx: 3 },
                '& .MuiAccordionSummary-expandIconWrapper': { mr: 3 },
                bgcolor: 'transparent',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: 24,
                  right: 24,
                  height: '1px',
                  bgcolor: 'divider',
                },
                '&:hover': {
                  bgcolor: 'transparent',
                },
                '&.Mui-expanded': {
                  minHeight: 56,
                  bgcolor: 'transparent',
                },
              }}
            >
              <Typography
                sx={{
                  color: '#64748B',
                  fontSize: 18,
                  fontWeight: 400,
                  lineHeight: '23px',
                }}
              >
                {t('Label.personal_information')}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 3, pt: 3, pb: 3, bgcolor: 'transparent' }}>
              <Stack spacing={2.5}>
                <Stack direction="row" spacing={2}>
                  <FormControl fullWidth>
                    <Typography
                      sx={{
                        mb: 1,
                        color: '#64748B',
                        fontSize: 16,
                        fontWeight: 400,
                        lineHeight: '22px',
                        textTransform: 'capitalize',
                      }}
                    >
                      {t('Label.nationality')}
                    </Typography>
                    <Select
                      value={filters.nationality}
                      onChange={(e) => setFilters({ ...filters, nationality: e.target.value })}
                      displayEmpty
                      sx={{ borderRadius: 1 }}
                    >
                      <MenuItem value="">{t('Label.select')}</MenuItem>
                      <MenuItem value="yemen">اليمن</MenuItem>
                      <MenuItem value="egypt">مصر</MenuItem>
                      <MenuItem value="saudi">السعودية</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <Typography
                      sx={{
                        mb: 1,
                        color: '#64748B',
                        fontSize: 16,
                        fontWeight: 400,
                        lineHeight: '22px',
                        textTransform: 'capitalize',
                      }}
                    >
                      {t('Label.city')}
                    </Typography>
                    <Select
                      value={filters.city}
                      onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                      displayEmpty
                      sx={{ borderRadius: 1 }}
                    >
                      <MenuItem value="">{t('Label.select')}</MenuItem>
                      <MenuItem value="jeddah">جدة</MenuItem>
                      <MenuItem value="riyadh">الرياض</MenuItem>
                      <MenuItem value="mecca">مكة</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>

                <Stack direction="row" spacing={2}>
                  <FormControl fullWidth>
                    <Typography
                      sx={{
                        mb: 1,
                        color: '#64748B',
                        fontSize: 16,
                        fontWeight: 400,
                        lineHeight: '22px',
                        textTransform: 'capitalize',
                      }}
                    >
                      {t('Label.package_name')}
                    </Typography>
                    <Select
                      value={filters.package}
                      onChange={(e) => setFilters({ ...filters, package: e.target.value })}
                      displayEmpty
                      sx={{ borderRadius: 1 }}
                    >
                      <MenuItem value="">{t('Label.select')}</MenuItem>
                      <MenuItem value="vip">VIP</MenuItem>
                      <MenuItem value="premium">مميزة</MenuItem>
                      <MenuItem value="economic">اقتصادية</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <Typography
                      sx={{
                        mb: 1,
                        color: '#64748B',
                        fontSize: 16,
                        fontWeight: 400,
                        lineHeight: '22px',
                        textTransform: 'capitalize',
                      }}
                    >
                      {t('Label.tags')}
                    </Typography>
                    <Select
                      value={filters.badge}
                      onChange={(e) => setFilters({ ...filters, badge: e.target.value })}
                      displayEmpty
                      sx={{ borderRadius: 1 }}
                    >
                      <MenuItem value="">{t('Label.select')}</MenuItem>
                      <MenuItem value="near_bathroom">قريب من دورة مياة</MenuItem>
                      <MenuItem value="central">قريب من مركز طبي</MenuItem>
                      <MenuItem value="near_mosque">قريب من مسجد</MenuItem>
                      <MenuItem value="near_transport">قريب من خدمة نقل</MenuItem>
                      <MenuItem value="near_restaurant">قريب من خدمة غسيل</MenuItem>
                      <MenuItem value="tent_entrance">قريب من مدخل المخيم</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>
                <Stack direction="row" spacing={2}>
                  <Box sx={{ width: '100%' }}>
                    <Typography
                      sx={{
                        mb: 1.5,
                        color: '#64748B',
                        fontSize: 16,
                        fontWeight: 400,
                        lineHeight: '22px',
                        textTransform: 'capitalize',
                      }}
                    >
                      {t('Label.gender')}
                    </Typography>
                    <ToggleButtonGroup
                      value={filters.gender}
                      exclusive
                      onChange={(e, value) => setFilters({ ...filters, gender: value })}
                      fullWidth
                      sx={{
                        '& .MuiToggleButton-root': {
                          borderRadius: 1,
                          border: '1px solid #e0e0e0',
                          py: 1,
                          '&.Mui-selected': {
                            bgcolor: '#f3f7ff',
                            color: '#0d6efd',
                            borderColor: '#0d6efd',
                          },
                        },
                      }}
                    >
                      <ToggleButton value="male">{t('Label.male')}</ToggleButton>
                      <ToggleButton value="female">{t('Label.female')}</ToggleButton>
                    </ToggleButtonGroup>
                  </Box>

                  <Box sx={{ width: '100%' }}>
                    <Typography
                      sx={{
                        mb: 1.5,
                        color: '#64748B',
                        fontSize: 16,
                        fontWeight: 400,
                        lineHeight: '22px',
                        textTransform: 'capitalize',
                      }}
                    >
                      {t('Label.early_late')}
                    </Typography>
                    <ToggleButtonGroup
                      value={filters.marriedLate}
                      exclusive
                      onChange={(e, value) => setFilters({ ...filters, marriedLate: value })}
                      fullWidth
                      sx={{
                        '& .MuiToggleButton-root': {
                          borderRadius: 1,
                          border: '1px solid #e0e0e0',
                          py: 1,
                          '&.Mui-selected': {
                            bgcolor: '#f3f7ff',
                            color: '#0d6efd',
                            borderColor: '#0d6efd',
                          },
                        },
                      }}
                    >
                      <ToggleButton value="early">{t('Label.early')}</ToggleButton>
                      <ToggleButton value="late">{t('Label.late')}</ToggleButton>
                    </ToggleButtonGroup>
                  </Box>
                </Stack>
                <FormControl fullWidth>
                  <Typography
                    sx={{
                      mb: 1,
                      color: '#64748B',
                      fontSize: 16,
                      fontWeight: 400,
                      lineHeight: '22px',
                      textTransform: 'capitalize',
                    }}
                  >
                    {t('Label.booking_status')}
                  </Typography>
                  <Select
                    value={filters.bookingStatus}
                    onChange={(e) => setFilters({ ...filters, bookingStatus: e.target.value })}
                    displayEmpty
                    sx={{ borderRadius: 1 }}
                  >
                    <MenuItem value="">{t('Label.select')}</MenuItem>
                    <MenuItem value="completed">مكتمل</MenuItem>
                    <MenuItem value="pending">مؤكد</MenuItem>
                    <MenuItem value="confirmed">قيد التأكيد</MenuItem>
                    <MenuItem value="cancelled">ملغي</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
            </AccordionDetails>
          </Accordion>

          {/* Assembly Points */}
          <Accordion
            expanded={expandedSections.includes('gathering')}
            onChange={handleAccordionChange('gathering')}
            sx={{
              boxShadow: 'none !important',
              border: 'none',
              '&:before': { display: 'none' },
              mb: 0,
            }}
          >
            <AccordionSummary
              expandIcon={
                expandedSections.includes('gathering') ? (
                  <Iconify icon="mdi:chevron-down" width={20} color="#64748B" />
                ) : (
                  <Iconify icon="mdi:plus" width={20} color="#64748B" />
                )
              }
              sx={{
                px: 0,
                minHeight: 56,
                '& .MuiAccordionSummary-content': { my: 1.5, mx: 3 },
                '& .MuiAccordionSummary-expandIconWrapper': { mr: 3 },
                bgcolor: 'transparent',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: 24,
                  right: 24,
                  height: '1px',
                  bgcolor: 'divider',
                },
                '&:hover': {
                  bgcolor: 'transparent',
                },
                '&.Mui-expanded': {
                  minHeight: 56,
                  bgcolor: 'transparent',
                },
              }}
            >
              <Typography
                sx={{
                  color: '#64748B',
                  fontSize: 18,
                  fontWeight: 400,
                  lineHeight: '23px',
                }}
              >
                {t('Label.gathering_points')}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 3, pt: 3, pb: 3, bgcolor: 'transparent' }}>
              <Stack spacing={2.5}>
                <Stack direction="row" spacing={2}>
                  <FormControl fullWidth>
                    <Typography
                      sx={{
                        mb: 1,
                        color: '#64748B',
                        fontSize: 16,
                        fontWeight: 400,
                        lineHeight: '22px',
                        textTransform: 'capitalize',
                      }}
                    >
                      {t('Label.gathering_point_type')}
                    </Typography>
                    <Select
                      value={filters.gatheringPointType}
                      onChange={(e) =>
                        setFilters({ ...filters, gatheringPointType: e.target.value })
                      }
                      displayEmpty
                      sx={{ borderRadius: 1 }}
                    >
                      <MenuItem value="">{t('Label.select')}</MenuItem>
                      <MenuItem value="jeddah">جدة</MenuItem>
                      <MenuItem value="riyadh">الرياض</MenuItem>
                      <MenuItem value="dammam">الدمام</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <Typography
                      sx={{
                        mb: 1,
                        color: '#64748B',
                        fontSize: 16,
                        fontWeight: 400,
                        lineHeight: '22px',
                        textTransform: 'capitalize',
                      }}
                    >
                      {t('Label.gathering_point')}
                    </Typography>
                    <Select
                      value={filters.gatheringPoint}
                      onChange={(e) => setFilters({ ...filters, gatheringPoint: e.target.value })}
                      displayEmpty
                      sx={{ borderRadius: 1 }}
                    >
                      <MenuItem value="">{t('Label.select')}</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>

                <FormControl fullWidth>
                  <Typography
                    sx={{
                      mb: 1,
                      color: '#64748B',
                      fontSize: 16,
                      fontWeight: 400,
                      lineHeight: '22px',
                      textTransform: 'capitalize',
                    }}
                  >
                    {t('Label.destination')}
                  </Typography>
                  <Select
                    value={filters.destination}
                    onChange={(e) => setFilters({ ...filters, destination: e.target.value })}
                    displayEmpty
                    sx={{ borderRadius: 1 }}
                  >
                    <MenuItem value="">{t('Label.select')}</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
            </AccordionDetails>
          </Accordion>

          {/* Accommodation */}
          <Accordion
            expanded={expandedSections.includes('accommodation')}
            onChange={handleAccordionChange('accommodation')}
            sx={{
              boxShadow: 'none !important',
              border: 'none',
              '&:before': { display: 'none' },
              mb: 0,
            }}
          >
            <AccordionSummary
              expandIcon={
                expandedSections.includes('accommodation') ? (
                  <Iconify icon="mdi:chevron-down" width={20} color="#64748B" />
                ) : (
                  <Iconify icon="mdi:plus" width={20} color="#64748B" />
                )
              }
              sx={{
                px: 0,
                minHeight: 56,
                '& .MuiAccordionSummary-content': { my: 1.5, mx: 3 },
                '& .MuiAccordionSummary-expandIconWrapper': { mr: 3 },
                bgcolor: 'transparent',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: 24,
                  right: 24,
                  height: '1px',
                  bgcolor: 'divider',
                },
                '&:hover': {
                  bgcolor: 'transparent',
                },
                '&.Mui-expanded': {
                  minHeight: 56,
                  bgcolor: 'transparent',
                },
              }}
            >
              <Typography
                sx={{
                  color: '#64748B',
                  fontSize: 18,
                  fontWeight: 400,
                  lineHeight: '23px',
                }}
              >
                {t('Label.accommodation')}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 3, pt: 3, pb: 3, bgcolor: 'transparent' }}>
              <Stack spacing={2.5}>
                <Stack direction="row" spacing={2}>
                  <FormControl fullWidth>
                    <Typography
                      sx={{
                        mb: 1,
                        color: '#64748B',
                        fontSize: 16,
                        fontWeight: 400,
                        lineHeight: '22px',
                        textTransform: 'capitalize',
                      }}
                    >
                      {t('Label.room_group_number')}
                    </Typography>
                    <TextField
                      value={filters.roomNumber}
                      onChange={(e) => setFilters({ ...filters, roomNumber: e.target.value })}
                      placeholder="A12"
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1 } }}
                    />
                  </FormControl>
                  <FormControl fullWidth>
                    <Typography
                      sx={{
                        mb: 1,
                        color: '#64748B',
                        fontSize: 16,
                        fontWeight: 400,
                        lineHeight: '22px',
                        textTransform: 'capitalize',
                      }}
                    >
                      {t('Label.destination')}
                    </Typography>
                    <Select
                      value={filters.accommodationDestination}
                      onChange={(e) =>
                        setFilters({ ...filters, accommodationDestination: e.target.value })
                      }
                      displayEmpty
                      sx={{ borderRadius: 1 }}
                    >
                      <MenuItem value="">{t('Label.select')}</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>

                <FormControl fullWidth>
                  <Typography
                    sx={{
                      mb: 1,
                      color: '#64748B',
                      fontSize: 16,
                      fontWeight: 400,
                      lineHeight: '22px',
                      textTransform: 'capitalize',
                    }}
                  >
                    {t('Label.camp_status')}
                  </Typography>
                  <Select
                    value={filters.campStatus}
                    onChange={(e) => setFilters({ ...filters, campStatus: e.target.value })}
                    displayEmpty
                    sx={{ borderRadius: 1 }}
                  >
                    <MenuItem value="">{t('Label.select')}</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
            </AccordionDetails>
          </Accordion>

          {/* Transportation */}
          <Accordion
            expanded={expandedSections.includes('transportation')}
            onChange={handleAccordionChange('transportation')}
            sx={{
              boxShadow: 'none !important',
              border: 'none',
              '&:before': { display: 'none' },
              mb: 0,
            }}
          >
            <AccordionSummary
              expandIcon={
                expandedSections.includes('transportation') ? (
                  <Iconify icon="mdi:chevron-down" width={20} color="#64748B" />
                ) : (
                  <Iconify icon="mdi:plus" width={20} color="#64748B" />
                )
              }
              sx={{
                px: 0,
                minHeight: 56,
                '& .MuiAccordionSummary-content': { my: 1.5, mx: 3 },
                '& .MuiAccordionSummary-expandIconWrapper': { mr: 3 },
                bgcolor: 'transparent',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: 24,
                  right: 24,
                  height: '1px',
                  bgcolor: 'divider',
                },
                '&:hover': {
                  bgcolor: 'transparent',
                },
                '&.Mui-expanded': {
                  minHeight: 56,
                  bgcolor: 'transparent',
                },
              }}
            >
              <Typography
                sx={{
                  color: '#64748B',
                  fontSize: 18,
                  fontWeight: 400,
                  lineHeight: '23px',
                }}
              >
                {t('Label.transportation_data')}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 3, pt: 3, pb: 3, bgcolor: 'transparent' }}>
              <FormControl fullWidth>
                <Typography
                  sx={{
                    mb: 1,
                    color: '#64748B',
                    fontSize: 16,
                    fontWeight: 400,
                    lineHeight: '22px',
                    textTransform: 'capitalize',
                  }}
                >
                  {t('Label.bus_number')}
                </Typography>
                <Select
                  value={filters.busNumber}
                  onChange={(e) => setFilters({ ...filters, busNumber: e.target.value })}
                  displayEmpty
                  sx={{ borderRadius: 1 }}
                >
                  <MenuItem value="">{t('Label.select')}</MenuItem>
                  <MenuItem value="1">الأولى</MenuItem>
                  <MenuItem value="2">الثانية</MenuItem>
                  <MenuItem value="3">الثالثة</MenuItem>
                </Select>
              </FormControl>
            </AccordionDetails>
          </Accordion>

          {/* Health Status */}
          <Accordion
            expanded={expandedSections.includes('health')}
            onChange={handleAccordionChange('health')}
            sx={{
              boxShadow: 'none !important',
              border: 'none',
              '&:before': { display: 'none' },
              mb: 0,
            }}
          >
            <AccordionSummary
              expandIcon={
                expandedSections.includes('health') ? (
                  <Iconify icon="mdi:chevron-down" width={20} color="#64748B" />
                ) : (
                  <Iconify icon="mdi:plus" width={20} color="#64748B" />
                )
              }
              sx={{
                px: 0,
                minHeight: 56,
                '& .MuiAccordionSummary-content': { my: 1.5, mx: 3 },
                '& .MuiAccordionSummary-expandIconWrapper': { mr: 3 },
                bgcolor: 'transparent',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: 24,
                  right: 24,
                  height: '1px',
                  bgcolor: 'divider',
                },
                '&:hover': {
                  bgcolor: 'transparent',
                },
                '&.Mui-expanded': {
                  minHeight: 56,
                  bgcolor: 'transparent',
                },
              }}
            >
              <Typography
                sx={{
                  color: '#64748B',
                  fontSize: 18,
                  fontWeight: 400,
                  lineHeight: '23px',
                }}
              >
                {t('Label.health_status_data')}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 3, pt: 3, pb: 3, bgcolor: 'transparent' }}>
              <FormControl fullWidth>
                <Typography
                  sx={{
                    mb: 1,
                    color: '#64748B',
                    fontSize: 16,
                    fontWeight: 400,
                    lineHeight: '22px',
                    textTransform: 'capitalize',
                  }}
                >
                  {t('Label.general_health_status')}
                </Typography>
                <Select
                  value={filters.healthStatus}
                  onChange={(e) => setFilters({ ...filters, healthStatus: e.target.value })}
                  displayEmpty
                  sx={{ borderRadius: 1 }}
                >
                  <MenuItem value="">{t('Label.select')}</MenuItem>
                  <MenuItem value="good">جيد</MenuItem>
                  <MenuItem value="attention">يحتاج عناية</MenuItem>
                </Select>
              </FormControl>
            </AccordionDetails>
          </Accordion>

          {/* Supervision */}
          <Accordion
            expanded={expandedSections.includes('supervision')}
            onChange={handleAccordionChange('supervision')}
            sx={{
              boxShadow: 'none !important',
              border: 'none',
              '&:before': { display: 'none' },
              mb: 0,
            }}
          >
            <AccordionSummary
              expandIcon={
                expandedSections.includes('supervision') ? (
                  <Iconify icon="mdi:chevron-down" width={20} color="#64748B" />
                ) : (
                  <Iconify icon="mdi:plus" width={20} color="#64748B" />
                )
              }
              sx={{
                px: 0,
                minHeight: 56,
                '& .MuiAccordionSummary-content': { my: 1.5, mx: 3 },
                '& .MuiAccordionSummary-expandIconWrapper': { mr: 3 },
                bgcolor: 'transparent',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: 24,
                  right: 24,
                  height: '1px',
                  bgcolor: 'divider',
                },
                '&:hover': {
                  bgcolor: 'transparent',
                },
                '&.Mui-expanded': {
                  minHeight: 56,
                  bgcolor: 'transparent',
                },
              }}
            >
              <Typography
                sx={{
                  color: '#64748B',
                  fontSize: 18,
                  fontWeight: 400,
                  lineHeight: '23px',
                }}
              >
                {t('Label.supervision_organization')}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 3, pt: 3, pb: 3, bgcolor: 'transparent' }}>
              <Stack spacing={2.5}>
                <Stack direction="row" spacing={2}>
                  <FormControl fullWidth>
                    <Typography
                      sx={{
                        mb: 1,
                        color: '#64748B',
                        fontSize: 16,
                        fontWeight: 400,
                        lineHeight: '22px',
                        textTransform: 'capitalize',
                      }}
                    >
                      {t('Label.supervisors')}
                    </Typography>
                    <Autocomplete
                      multiple
                      value={filters.supervisors}
                      onChange={(event, newValue) => {
                        setFilters({ ...filters, supervisors: newValue });
                      }}
                      options={supervisorsList.filter(
                        (supervisor) =>
                          !filters.supervisors?.some((selected) => selected.id === supervisor.id)
                      )}
                      getOptionLabel={(option) => option.name}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder={t('Label.select')}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 1,
                            },
                          }}
                        />
                      )}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip
                            {...getTagProps({ index })}
                            key={option.id}
                            avatar={
                              <Avatar sx={{ width: 24, height: 24 }}>
                                {option.name.charAt(0)}
                              </Avatar>
                            }
                            label={option.name}
                            sx={{ borderRadius: 1 }}
                          />
                        ))
                      }
                    />
                  </FormControl>
                  <FormControl fullWidth>
                    <Typography
                      sx={{
                        mb: 1,
                        color: '#64748B',
                        fontSize: 16,
                        fontWeight: 400,
                        lineHeight: '22px',
                        textTransform: 'capitalize',
                      }}
                    >
                      {t('Label.import_file')}
                    </Typography>
                    <Select
                      value={filters.importFile}
                      onChange={(e) => setFilters({ ...filters, importFile: e.target.value })}
                      displayEmpty
                      sx={{ borderRadius: 1 }}
                    >
                      <MenuItem value="">{t('Label.select')}</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>
              </Stack>
            </AccordionDetails>
          </Accordion>

          {/* Shipping Operations */}
          <Accordion
            expanded={expandedSections.includes('shipping')}
            onChange={handleAccordionChange('shipping')}
            sx={{
              boxShadow: 'none !important',
              border: 'none',
              '&:before': { display: 'none' },
              mb: 0,
            }}
          >
            <AccordionSummary
              expandIcon={
                expandedSections.includes('shipping') ? (
                  <Iconify icon="mdi:chevron-down" width={20} color="#64748B" />
                ) : (
                  <Iconify icon="mdi:plus" width={20} color="#64748B" />
                )
              }
              sx={{
                px: 0,
                minHeight: 56,
                '& .MuiAccordionSummary-content': { my: 1.5, mx: 3 },
                '& .MuiAccordionSummary-expandIconWrapper': { mr: 3 },
                bgcolor: 'transparent',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: 24,
                  right: 24,
                  height: '1px',
                  bgcolor: 'divider',
                },
                '&:hover': {
                  bgcolor: 'transparent',
                },
                '&.Mui-expanded': {
                  minHeight: 56,
                  bgcolor: 'transparent',
                },
              }}
            >
              <Typography
                sx={{
                  color: '#64748B',
                  fontSize: 18,
                  fontWeight: 400,
                  lineHeight: '23px',
                }}
              >
                {t('Label.shipping_operations')}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 3, pt: 3, pb: 3, bgcolor: 'transparent' }}>
              <Stack spacing={2.5}>
                <Stack direction="row" spacing={2}>
                  <FormControl fullWidth>
                    <Typography
                      sx={{
                        mb: 1,
                        color: '#64748B',
                        fontSize: 16,
                        fontWeight: 400,
                        lineHeight: '22px',
                        textTransform: 'capitalize',
                      }}
                    >
                      {t('Label.shipping_tool')}
                    </Typography>
                    <Select
                      value={filters.shippingManagement}
                      onChange={(e) =>
                        setFilters({ ...filters, shippingManagement: e.target.value })
                      }
                      displayEmpty
                      sx={{ borderRadius: 1 }}
                    >
                      <MenuItem value="">{t('Label.select')}</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <Typography
                      sx={{
                        mb: 1,
                        color: '#64748B',
                        fontSize: 16,
                        fontWeight: 400,
                        lineHeight: '22px',
                        textTransform: 'capitalize',
                      }}
                    >
                      {t('Label.shipment_status')}
                    </Typography>
                    <Select
                      value={filters.shipmentStatus}
                      onChange={(e) => setFilters({ ...filters, shipmentStatus: e.target.value })}
                      displayEmpty
                      sx={{ borderRadius: 1 }}
                    >
                      <MenuItem value="">{t('Label.select')}</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>
              </Stack>
            </AccordionDetails>
          </Accordion>
        </Box>
      </DialogContent>

      {/* Dialog Actions */}
      <DialogActions
        sx={{
          px: 3,
          py: 2.5,
          gap: 1,
          justifyContent: 'flex-end',
        }}
      >
        <Button
          variant="contained"
          onClick={handleApply}
          sx={{
            borderRadius: 1,
            px: 4,
            py: .75,
            bgcolor: '#0d6efd',
            fontWeight: 600,
            '&:hover': {
              bgcolor: '#0b5ed7',
            },
          }}
        >
          {t('Button.filter')}
        </Button>
        <Button
          variant="outlined"
          onClick={handleReset}
          sx={{
            borderRadius: 1,
            px: 4,
            py: .75,
            borderColor: '#e0e0e0',
            color: '#64748B',
            '&:hover': {
              borderColor: '#bdbdbd',
              bgcolor: '#fafafa',
            },
          }}
        >
          {t('Button.clear_fields')}
        </Button>
        <Button
          variant="text"
          onClick={onClose}
          sx={{
            borderRadius: 1,
            px: 4,
            py: .75,
            color: '#EF4444',
            fontWeight: 600,
            '&:hover': {
              bgcolor: '#FEF2F2',
            },
          }}
        >
          {t('Button.cancel')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
