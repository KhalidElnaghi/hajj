'use client';

import { Fragment, ReactNode, useMemo, useState } from 'react';

import {
  Box,
  Button,
  Card,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { useTranslations } from 'next-intl';

import { useDisclosure } from 'src/hooks/useDisclosure';

import SharedTable from 'src/components/custom-shared-table/shared-table/SharedTable';
import useTable from 'src/components/custom-shared-table/shared-table/use-table';
import { headCellType, Action } from 'src/components/custom-shared-table/shared-table/types';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import Iconify from 'src/components/iconify';
import Image from 'next/image';

// ----------------------------------------------------------------------

type Pilgrim = {
  id: number;
  name: string;
  idNumber: string;
  bookingNumber: string;
  registrationStatus: string;
  gender: string;
  city: string;
  healthStatus: string;
  accommodation: string;
  hajjOperations: string;
  busStatus: string;
  funding: string;
  sponsor: string;
  phone: string;
  gatheringPointType: string;
  nationality: string;
  package: string;
  bus: string;
};

// Dummy data for pilgrims
const dummyPilgrims: Pilgrim[] = [
  {
    id: 1,
    name: 'حامد الصرفي',
    idNumber: '3234567991011',
    bookingNumber: '9370323330',
    registrationStatus: 'completed',
    gender: 'Male',
    city: 'اليمن',
    healthStatus: 'good',
    accommodation: 'منى - الرجال الأول',
    hajjOperations: '',
    busStatus: 'error',
    funding: 'مصر',
    sponsor: 'غير متوفر خالد',
    phone: '+99657839475',
    gatheringPointType: 'جده',
    nationality: 'اليمن',
    package: 'اقتصادية',
    bus: 'الاولى',
  },
  {
    id: 2,
    name: 'حامد الصرفي',
    idNumber: '3234567991011',
    bookingNumber: '12303239066',
    registrationStatus: 'pending',
    gender: 'Male',
    city: 'الإمارات',
    healthStatus: 'good',
    accommodation: 'منى - الرجال الأول',
    hajjOperations: '',
    busStatus: 'error',
    funding: 'مصر',
    sponsor: 'غير متوفر',
    phone: '+99657839475',
    gatheringPointType: 'جده',
    nationality: 'الإمارات',
    package: 'اقتصادية',
    bus: 'الثانية',
  },
  {
    id: 3,
    name: 'محمد إسماعيل',
    idNumber: '3234567991011',
    bookingNumber: '9370323330',
    registrationStatus: 'completed',
    gender: 'Male',
    city: 'ليبيا',
    healthStatus: 'good',
    accommodation: 'منى - الرجال الأول',
    hajjOperations: '',
    busStatus: 'error',
    funding: 'سوريا',
    sponsor: 'غير متوفر',
    phone: '+99657839475',
    gatheringPointType: 'الرياض',
    nationality: 'ليبيا',
    package: 'VIP',
    bus: 'الرابعة',
  },
  {
    id: 4,
    name: 'محمد إسماعيل',
    idNumber: '3234567991011',
    bookingNumber: '9370323330',
    registrationStatus: 'cancelled',
    gender: 'Female',
    city: 'الفلبين',
    healthStatus: 'attention',
    accommodation: 'منى - الرجال الأول',
    hajjOperations: '',
    busStatus: 'error',
    funding: 'مصر',
    sponsor: 'غير متوفر خالد',
    phone: '+99657839475',
    gatheringPointType: 'الرياض',
    nationality: 'الفلبين',
    package: 'مميزة',
    bus: 'الاولى',
  },
  {
    id: 5,
    name: 'محمد الصرفي',
    idNumber: '3234567991011',
    bookingNumber: '9370323330',
    registrationStatus: 'pending',
    gender: 'Male',
    city: 'مصر',
    healthStatus: 'attention',
    accommodation: 'منى - الرجال الأول',
    hajjOperations: '',
    busStatus: 'error',
    funding: 'مصر',
    sponsor: 'المستر',
    phone: '+99657839475',
    gatheringPointType: 'الدمام',
    nationality: 'الفلبين',
    package: 'شؤون',
    bus: 'الثانية',
  },
  {
    id: 6,
    name: 'يحيى المسالاني',
    idNumber: '3234567991011',
    bookingNumber: '9370323330',
    registrationStatus: 'confirmed',
    gender: 'Male',
    city: 'السعودية',
    healthStatus: 'good',
    accommodation: 'منى - الرجال الأول',
    hajjOperations: '',
    busStatus: 'warning',
    funding: 'مصر',
    sponsor: 'غير متوفر',
    phone: '+99657839475',
    gatheringPointType: 'الدمام',
    nationality: 'السعودية',
    package: 'شؤون',
    bus: 'الخامسة',
  },
  {
    id: 7,
    name: 'شوبكتا بريامايل',
    idNumber: '3234567991011',
    bookingNumber: '9370323330',
    registrationStatus: 'completed',
    gender: 'Male',
    city: 'اليمن',
    healthStatus: 'good',
    accommodation: 'منى - الرجال الأول',
    hajjOperations: '',
    busStatus: 'error',
    funding: 'مصر',
    sponsor: 'بانفس',
    phone: '+99657839475',
    gatheringPointType: 'الدمام',
    nationality: 'اليمن',
    package: 'VIP',
    bus: 'الاولى',
  },
  {
    id: 8,
    name: 'عطاءاللة الشيخ',
    idNumber: '3234567991011',
    bookingNumber: '9370323330',
    registrationStatus: 'confirmed',
    gender: 'Male',
    city: 'حقة',
    healthStatus: 'attention',
    accommodation: 'منى - الرجال الأول',
    hajjOperations: '',
    busStatus: 'error',
    funding: 'مصر',
    sponsor: 'غير متوفر خالد',
    phone: '+99657839475',
    gatheringPointType: 'جده',
    nationality: 'اليمن',
    package: 'مميزة',
    bus: 'الاولى',
  },
];

// ----------------------------------------------------------------------

export default function PilgrimsView() {
  const t = useTranslations();
  const table = useTable();
  const bulkDialog = useDisclosure();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [genderFilter, setGenderFilter] = useState<string>('all');
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);
  const filterMenuOpen = Boolean(filterAnchorEl);

  const filterOptions = [
    { key: 'gathering_point_type', label: t('Label.gathering_point_type') },
    { key: 'gender', label: t('Label.gender') },
    { key: 'destination', label: t('Label.destination') },
    { key: 'bus_number', label: t('Label.bus_number') },
  ];

  const [selectedFilters, setSelectedFilters] = useState<string[]>(
    filterOptions.map((opt) => opt.key)
  );

  const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleToggleFilter = (filterKey: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filterKey) ? prev.filter((key) => key !== filterKey) : [...prev, filterKey]
    );
  };

  const activeFilterCount = selectedFilters.length;

  const tableHead: headCellType[] = [
    { id: 'name', label: 'Label.name' },
    { id: 'idNumber', label: 'Label.identity_number' },
    { id: 'bookingNumber', label: 'Label.booking_number' },
    { id: 'phone', label: 'Label.phone' },
    { id: 'registrationStatus', label: 'Label.status' },
    { id: 'gatheringPointType', label: 'Label.gathering_point' },
    { id: 'nationality', label: 'Label.nationality' },
    { id: 'gender', label: 'Label.gender' },
    { id: 'city', label: 'Label.city' },
    { id: 'package', label: 'Label.package' },
    { id: 'bus', label: 'Label.bus' },
    { id: 'accommodation', label: 'Label.housing' },
  ];

  const actions: Action<Pilgrim>[] = [
    {
      label: t('Label.message'),
      icon: '/assets/icons/table/sms.svg',
      onClick: (row) => console.log('message pilgrim', row.id),
    },
    {
      label: t('Label.view'),
      icon: '/assets/icons/table/view.svg',
      onClick: (row) => console.log('view pilgrim', row.id),
    },
    {
      label: t('Label.edit'),
      icon: '/assets/icons/table/edit.svg',
      onClick: (row) => console.log('edit pilgrim', row.id),
    },
    {
      label: t('Label.delete'),
      icon: '/assets/icons/table/delete.svg',
      onClick: (row) => console.log('delete pilgrim', row.id),
    },
  ];

  // Bulk dialog options based on the image
  const bulkDialogOptions = [
    {
      key: 'send-message',
      label: t('Label.send_emergency_message'),
      icon: '/assets/images/pilgrims/bulk-action/sms.svg',
      action: () => console.log('Send message to pilgrims'),
    },
    {
      key: 'today',
      label: t('Label.today'),
      icon: '/assets/images/pilgrims/bulk-action/tags.svg',
      action: () => console.log('Today actions'),
    },
    {
      key: 'accommodation-needs',
      label: t('Label.accommodation_needs_in_rituals'),
      icon: '/assets/images/pilgrims/bulk-action/accommodation.svg',
      action: () => console.log('Accommodation needs'),
    },
    {
      key: 'transportation',
      label: t('Label.transportation_vehicles'),
      icon: '/assets/images/pilgrims/bulk-action/transport.svg',
      action: () => console.log('Transportation'),
    },
    {
      key: 'camp',
      label: t('Label.camp'),
      icon: '/assets/images/pilgrims/bulk-action/tents.svg',
      action: () => console.log('Camp'),
    },
    {
      key: 'gathering-points',
      label: t('Label.gathering_points'),
      icon: '/assets/images/pilgrims/bulk-action/location.svg',
      action: () => console.log('Gathering points'),
    },
    {
      key: 'link-supervisors',
      label: t('Label.link_supervisors'),
      icon: '/assets/images/pilgrims/bulk-action/link.svg',
      action: () => console.log('Link supervisors'),
    },
    {
      key: 'arrival-time',
      label: t('Label.arrival_time'),
      icon: '/assets/images/pilgrims/bulk-action/time.svg',
      action: () => console.log('Arrival time'),
    },
    {
      key: 'shipping-management',
      label: t('Label.shipping_management'),
      icon: '/assets/images/pilgrims/bulk-action/shipping.svg',
      action: () => console.log('Shipping management'),
    },
    {
      key: 'send-receipt-notification',
      label: t('Label.send_receipt_notification'),
      icon: '/assets/images/pilgrims/bulk-action/receive.svg',
      action: () => console.log('Send receipt notification'),
    },
  ];

  const handleDialogOptionClick = (option: (typeof bulkDialogOptions)[0]) => {
    option.action();
    bulkDialog.onClose();
    // You can add navigation or state changes here based on the option
    // For example: router.push(`/pilgrims/${option.key}`);
  };

  const registrationStatusColors: Record<string, { bg: string; color: string; label: string }> = {
    completed: { bg: '#E8F5E9', color: '#2E7D32', label: 'مكتمل' },
    pending: { bg: '#F3E5F5', color: '#7B1FA2', label: 'مؤكد' },
    confirmed: { bg: '#FFEDD4', color: '#F54900', label: 'قيد التأكيد' },
    cancelled: { bg: '#FFEBEE', color: '#C62828', label: 'ملغي' },
  };

  const healthStatusColors: Record<string, { bg: string; color: string; label: string }> = {
    good: { bg: '#E8F5E9', color: '#2E7D32', label: 'جيد' },
    attention: { bg: '#FFF3E0', color: '#EF6C00', label: 'احتياج' },
  };

  const packageColors: Record<string, { bg: string; color: string }> = {
    اقتصادية: { bg: '#FEF9E7', color: '#D4A017' },
    VIP: { bg: '#FFF8E1', color: '#F9A825' },
    مميزة: { bg: '#F3E5F5', color: '#9C27B0' },
    شؤون: { bg: '#E0F7FA', color: '#00ACC1' },
  };

  const customRender: Partial<Record<keyof Pilgrim, (row: Pilgrim) => ReactNode>> = {
    registrationStatus: (row) => {
      const statusInfo = registrationStatusColors[row.registrationStatus] || {
        bg: '#F5F5F5',
        color: '#666',
        label: row.registrationStatus,
      };
      return (
        <Box
          component="span"
          sx={{
            px: 1.5,
            py: 0.5,
            borderRadius: 2,
            bgcolor: statusInfo.bg,
            color: statusInfo.color,
            fontSize: 12,
            fontWeight: 600,
            display: 'inline-block',
          }}
        >
          {statusInfo.label}
        </Box>
      );
    },
    gender: (row) => (
      <Typography variant="body2" sx={{ fontSize: 13 }}>
        {row.gender === 'Male' ? 'ذكر' : 'أنثى'}
      </Typography>
    ),
    healthStatus: (row) => {
      const statusInfo = healthStatusColors[row.healthStatus] || {
        bg: '#F5F5F5',
        color: '#666',
        label: row.healthStatus,
      };
      return (
        <Box
          component="span"
          sx={{
            px: 1.5,
            py: 0.5,
            borderRadius: 1,
            bgcolor: statusInfo.bg,
            color: statusInfo.color,
            fontSize: 12,
            fontWeight: 600,
            display: 'inline-block',
          }}
        >
          {statusInfo.label}
        </Box>
      );
    },
    accommodation: (row) => (
      <Typography variant="body2" sx={{ fontSize: 13, color: 'text.secondary' }}>
        {row.accommodation || '-'}
      </Typography>
    ),
    bus: (row) => (
      <Typography variant="body2" sx={{ fontSize: 13, color: 'text.secondary' }}>
        {row.bus || '-'}
      </Typography>
    ),
    hajjOperations: (row) => (
      <Typography variant="body2" sx={{ fontSize: 13, color: 'text.secondary' }}>
        {row.hajjOperations || '-'}
      </Typography>
    ),
    phone: (row) => <Box sx={{ direction: 'rtl' }}>{row.phone || '-'}</Box>,
    gatheringPointType: (row) => (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.9 }}>
        <Image
          src={`/assets/images/pilgrims/dot.svg`}
          alt={row.gatheringPointType}
          width={8}
          height={8}
        />
        {row.gatheringPointType || '-'}
      </Box>
    ),
    package: (row) => {
      if (!row.package) return <Typography variant="body2">-</Typography>;
      const pkgInfo = packageColors[row.package] || {
        bg: '#F5F5F5',
        color: '#666',
      };
      return (
        <Box
          component="span"
          sx={{
            px: 1.5,
            py: 0.5,
            borderRadius: 2,
            bgcolor: pkgInfo.bg,
            color: pkgInfo.color,
            fontSize: 12,
            fontWeight: 600,
            display: 'inline-block',
          }}
        >
          {row.package}
        </Box>
      );
    },
  };

  const filteredPilgrims = useMemo(() => {
    const searchLower = searchTerm.toLowerCase();
    return dummyPilgrims.filter((pilgrim) => {
      const matchesSearch =
        !searchLower ||
        pilgrim.name.toLowerCase().includes(searchLower) ||
        pilgrim.bookingNumber.toLowerCase().includes(searchLower) ||
        pilgrim.idNumber.toLowerCase().includes(searchLower);
      const matchesStatus = statusFilter === 'all' || pilgrim.registrationStatus === statusFilter;
      const matchesGender = genderFilter === 'all' || pilgrim.gender === genderFilter;
      return matchesSearch && matchesStatus && matchesGender;
    });
  }, [genderFilter, searchTerm, statusFilter]);

  const selectedPilgrims = useMemo(
    () => filteredPilgrims.filter((pilgrim) => (table.selected ?? []).includes(String(pilgrim.id))),
    [filteredPilgrims, table.selected]
  );

  const stats = [
    {
      key: 'pilgrims',
      label: t('Label.total_pilgrims'),
      value: '1,422',
      icon: '/assets/images/pilgrims/total.svg',
    },
    {
      key: 'permits',
      label: t('Label.support_messages'),
      value: '232',
      icon: '/assets/images/pilgrims/messages.svg',
    },
    {
      key: 'accommodation',
      label: t('Label.accommodation_capacity'),
      value: '456',
      icon: '/assets/images/pilgrims/home.svg',
    },
    {
      key: 'gatherings',
      label: t('Label.tracked_locations'),
      value: '16',
      icon: '/assets/images/pilgrims/location.svg',
    },
  ];

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        <CustomBreadcrumbs
          heading={t('Title.pilgrims_management')}
          links={[
            {
              name: t('Nav.main'),
              href: '/',
            },
          ]}
          action={
            <Button variant="contained" color="primary" sx={{ borderRadius: 1, px: 2.5, py: 1 }}>
              {t('Button.add')}
            </Button>
          }
        />

        <Card
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'stretch', sm: 'center' },
            justifyContent: 'space-between',
            width: '100%',
            px: { xs: 2, md: 4 },
            py: { xs: 2, sm: 1 },
          }}
        >
          {stats.map((item, index) => (
            <Fragment key={item.key}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flex: 1,
                }}
              >
                {/* Vertical Divider */}
                {index > 0 && (
                  <Divider
                    orientation="vertical"
                    flexItem
                    sx={{
                      display: { xs: 'none', sm: 'block' },
                      height: 120,
                      alignSelf: 'center',
                      borderColor: '#CBD5E1',
                    }}
                  />
                )}
                <Box
                  sx={{
                    p: { xs: 2, md: 2.5 },
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'start',
                    gap: 1.5,
                    width: '100%',
                    borderBottom: {
                      xs: index < stats.length - 1 ? '1px solid #CBD5E1' : 'none',
                      sm: 'none',
                    },
                  }}
                >
                  <Image src={item.icon} alt={item.label} width={25} height={25} />
                  <Box>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      sx={{ fontSize: { xs: 12, md: 13 } }}
                    >
                      {item.label}
                    </Typography>
                    <Typography variant="h5" sx={{ mt: 0.5, fontSize: { xs: 20, md: 24 } }}>
                      {item.value}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Fragment>
          ))}
        </Card>

        <Card sx={{ mt: 4, borderRadius: 2, p: 3 }}>
          {/* Filter and Action Row */}
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="space-between"
            flexWrap="wrap"
            rowGap={1.5}
            sx={{ mb: 3 }}
          >
            <Stack
              direction="row"
              spacing={1.5}
              alignItems="center"
              flexWrap="wrap"
              rowGap={1.5}
              sx={{ flex: 1, minWidth: { xs: '100%', md: 520 } }}
            >
              {' '}
              {/* Search Field */}
              <TextField
                placeholder={t('Label.search')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{
                  flex: 1,
                  minWidth: { xs: '100%', md: 200 },
                  maxWidth: 200,
                  '& .MuiOutlinedInput-root': {
                    height: 44,
                    borderRadius: 1,
                    bgcolor: '#fff',
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Image
                        src="/assets/images/pilgrims/search.svg"
                        alt="search"
                        width={20}
                        height={20}
                      />
                    </InputAdornment>
                  ),
                }}
              />
              {/* Absolute Filter Button with Dropdown */}
              <Box>
                <Button
                  variant="outlined"
                  onClick={handleFilterClick}
                  sx={{
                    borderRadius: 1,
                    height: 44,
                    paddingInlineStart: 2,
                    paddingInlineEnd: 5,
                    minWidth: 200,
                    borderColor: '#e0e0e0',
                    color: '#333',
                    bgcolor: '#fff',
                    position: 'relative',
                    '&:hover': { borderColor: '#bdbdbd', bgcolor: '#fafafa' },
                  }}
                >
                  {/* Badge at the end */}
                  {activeFilterCount > 0 && (
                    <Box
                      component="span"
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        insetInlineEnd: 12,
                        transform: 'translateY(-50%)',
                        bgcolor: '#dc3545',
                        color: 'white',
                        borderRadius: '50%',
                        width: 24,
                        height: 24,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 12,
                        fontWeight: 700,
                      }}
                    >
                      {activeFilterCount}
                    </Box>
                  )}

                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={0.75}
                    sx={{ marginInlineEnd: 3 }}
                  >
                    <Iconify icon="mdi:chevron-down" width={20} sx={{ color: '#333' }} />
                    <Box component="span" sx={{ fontWeight: 600, fontSize: 14 }}>
                      {t('Label.absolute_filter')}
                    </Box>
                  </Stack>
                </Button>

                <Menu
                  anchorEl={filterAnchorEl}
                  open={filterMenuOpen}
                  onClose={handleFilterClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  PaperProps={{
                    sx: {
                      mt: 1,
                      borderRadius: 1,
                      minWidth: 200,
                      boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.12)',
                    },
                  }}
                >
                  {filterOptions.map((option) => {
                    const isSelected = selectedFilters.includes(option.key);
                    return (
                      <MenuItem
                        key={option.key}
                        onClick={() => handleToggleFilter(option.key)}
                        sx={{
                          py: 1.5,
                          px: 2,
                          fontSize: 14,
                          color: 'text.secondary',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          '&:hover': { bgcolor: 'action.hover' },
                        }}
                      >
                        <Box component="span" sx={{ color: '#333', fontWeight: 500 }}>
                          {option.label}
                        </Box>{' '}
                        <Box
                          component="span"
                          sx={{
                            width: 24,
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          {isSelected && (
                            <Iconify icon="mdi:close" width={18} sx={{ color: '#999' }} />
                          )}
                        </Box>
                      </MenuItem>
                    );
                  })}
                </Menu>
              </Box>
              {/* Custom Bulk Actions Button that opens dialog */}
              <Button
                variant={table.selected.length > 0 ? 'contained' : 'outlined'}
                onClick={bulkDialog.onOpen}
                disabled={table.selected.length === 0}
                sx={{
                  bgcolor:
                    table.selected.length === 0
                      ? '#fff'
                      : table.selected.length > 0
                        ? '#0b0b0b'
                        : '#fff',
                  color:
                    table.selected.length === 0
                      ? '#333'
                      : table.selected.length > 0
                        ? '#fff'
                        : '#333',
                  borderRadius: 1,
                  height: 44,
                  paddingInlineStart: 2,
                  paddingInlineEnd: 5,
                  minWidth: 200,
                  position: 'relative',
                  boxShadow: 'none',
                  border:
                    table.selected.length === 0 || table.selected.length === 0
                      ? '1px solid #dce5ef'
                      : 'none',
                  '&:hover': {
                    bgcolor:
                      table.selected.length === 0
                        ? '#fff'
                        : table.selected.length > 0
                          ? '#1c1c1c'
                          : '#fff',
                    boxShadow: 'none',
                  },
                  '&.Mui-disabled': {
                    bgcolor: '#fff !important',
                    color: '#333 !important',
                    border: '1px solid #dce5ef !important',
                    opacity: 1,
                  },
                }}
              >
                <Box
                  component="span"
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    insetInlineEnd: 12,
                    transform: 'translateY(-50%)',
                    bgcolor: '#dc3545',
                    color: 'white',
                    borderRadius: '50%',
                    width: 24,
                    height: 24,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                >
                  {table.selected.length}
                </Box>

                <Stack direction="row" alignItems="center" spacing={1} sx={{ marginInlineEnd: 3 }}>
                  <Image
                    src={
                      table.selected.length > 0
                        ? '/assets/images/pilgrims/bulk-actions.svg'
                        : '/assets/images/pilgrims/bulk-actions-dark.svg'
                    }
                    alt="bulk actions"
                    width={20}
                    height={20}
                  />
                  <Box component="span" sx={{ fontWeight: 600, fontSize: 14 }}>
                    {t('Label.bulk_actions')}
                  </Box>
                </Stack>
              </Button>
            </Stack>

            <Stack direction="row" spacing={1.25} alignItems="center">
              <Button
                variant="outlined"
                startIcon={
                  <Image
                    src="/assets/images/pilgrims/import.svg"
                    alt="import"
                    width={15}
                    height={15}
                  />
                }
                sx={{
                  height: 44,
                  px: 4,
                  borderRadius: 1,
                  borderColor: '#dce5ef',
                  bgcolor: '#fff',
                  color: '#333',
                  fontWeight: 500,
                  fontSize: 14,
                  '&:hover': { borderColor: '#0d6efd', bgcolor: '#f3f7ff' },
                }}
              >
                {t('Label.import')}
              </Button>

              <Button
                variant="outlined"
                startIcon={
                  <Image
                    src="/assets/images/pilgrims/export.svg"
                    alt="export"
                    width={15}
                    height={15}
                  />
                }
                sx={{
                  height: 44,
                  px: 4,
                  borderRadius: 1,
                  borderColor: '#dce5ef',
                  bgcolor: '#fff',
                  color: '#333',
                  fontWeight: 500,
                  fontSize: 14,
                  '&:hover': { borderColor: '#0d6efd', bgcolor: '#f3f7ff' },
                }}
              >
                {t('Label.export')}
              </Button>

              <Button
                variant="outlined"
                sx={{
                  minWidth: 'auto',
                  width: 44,
                  height: 44,
                  p: 0,
                  borderRadius: 1,
                  borderColor: '#0d6efd',
                  color: '#0d6efd',
                  bgcolor: '#f3f7ff',
                  '&:hover': { borderColor: '#0d6efd', bgcolor: '#e6f0ff' },
                }}
              >
                <Image
                  src="/assets/images/pilgrims/filters.svg"
                  alt="filters"
                  width={15}
                  height={15}
                />
              </Button>
            </Stack>
          </Stack>

          <SharedTable<Pilgrim>
            tableHead={tableHead}
            data={filteredPilgrims}
            count={filteredPilgrims.length}
            actions={actions}
            customRender={customRender}
            disablePagination={false}
            order={false}
            enableSelection
            table={table}
          />
        </Card>
      </Box>

      {/* Bulk Actions Dialog */}
      <Dialog
        open={bulkDialog.open}
        onClose={bulkDialog.onClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 2,
          },
        }}
      >
        <DialogTitle sx={{ p: 1, mb: 2 }}>
          <Stack direction="row" alignItems="flex-start" justifyContent="space-between" spacing={2}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: 18 }}>
                {t('Title.group_actions')}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1, fontSize: 13 }}>
                {t('Description.group_actions_description')}
              </Typography>
            </Box>
            <IconButton
              onClick={bulkDialog.onClose}
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
        <DialogContent sx={{ p: 0.5 }}>
          <Stack spacing={1.5}>
            {/* Other Options */}
            {bulkDialogOptions.map((option) => (
              <Button
                key={option.key}
                fullWidth
                variant="outlined"
                onClick={() => handleDialogOptionClick(option)}
                sx={{
                  bgcolor: '#fff',
                  borderColor: '#e5e7eb',
                  color: '#1f2937',
                  borderRadius: 1,
                  py: 0.5,
                  fontSize: 14,
                  fontWeight: 500,
                 justifyContent: 'flex-start',
                  gap: 1,
                  '&:hover': {
                    bgcolor: '#f3f7ff',
                    borderColor: '#0d6efd',
                  },
                }}
              >
                <Image src={option.icon} alt={option.label} width={20} height={20} />
                <Box component="span">{option.label}</Box>
              </Button>
            ))}
          </Stack>
        </DialogContent>
      </Dialog>
    </Container>
  );
}
