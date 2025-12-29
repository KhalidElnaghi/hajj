'use client';

import { Fragment, ReactNode, useMemo, useState } from 'react';

import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  InputAdornment,
  Menu,
  MenuItem,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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
import { BulkActionsDialog } from './components/bulk-actions';
import { ImportDialog } from './components/import-dialog';
import FilterDialog from './components/filter-dialog';
import { paths } from 'src/routes/paths';
import { useRouter, useSearchParams } from 'next/navigation';
import { useFetchPilgrims } from 'src/services/queries/pilgrims';
import { Pilgrim } from 'src/services/api/pilgrims';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function PilgrimsView() {
  const t = useTranslations('Pilgrims');
  const table = useTable();
  const bulkDialog = useDisclosure();
  const filterDialog = useDisclosure();
  const importDialog = useDisclosure();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [genderFilter, setGenderFilter] = useState<string>('all');
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);
  const filterMenuOpen = Boolean(filterAnchorEl);
  const router = useRouter();
  const searchParams = useSearchParams();
  // Applied filters from dialog
  const [appliedFilters, setAppliedFilters] = useState<any>({});

  // Get pagination from URL params
  const currentPage = Number(searchParams.get('page')) || 1;
  const currentLimit = Number(searchParams.get('per_page')) || 10;

  // Fetch pilgrims data using React Query
  const {
    data: pilgrimsData,
    isLoading: pilgrimsLoading,
    isError: pilgrimsError,
    refetch: refreshPilgrims,
  } = useFetchPilgrims({
    page: currentPage,
    limit: currentLimit,
    searchParam: searchTerm || undefined,
    status: statusFilter !== 'all' ? statusFilter : undefined,
    gender: genderFilter !== 'all' ? genderFilter : undefined,
  });



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

  const handleApplyFilters = (filters: any) => {
    setAppliedFilters(filters);
  };

  const handleClearFilterSection = (section: string) => {
    const updatedFilters = { ...appliedFilters };

    switch (section) {
      case 'personal':
        updatedFilters.nationality = '';
        updatedFilters.city = '';
        updatedFilters.package = '';
        updatedFilters.badge = '';
        updatedFilters.gender = '';
        updatedFilters.marriedLate = '';
        updatedFilters.bookingStatus = '';
        break;
      case 'gathering':
        updatedFilters.gatheringPointType = '';
        updatedFilters.gatheringPoint = '';
        updatedFilters.destination = '';
        break;
      case 'accommodation':
        updatedFilters.roomNumber = '';
        updatedFilters.accommodationDestination = '';
        updatedFilters.campStatus = '';
        break;
      case 'transportation':
        updatedFilters.busNumber = '';
        break;
      case 'health':
        updatedFilters.healthStatus = '';
        break;
      case 'supervision':
        updatedFilters.supervisors = [];
        updatedFilters.importFile = '';
        break;
      case 'shipping':
        updatedFilters.shippingManagement = '';
        updatedFilters.shipmentStatus = '';
        break;
    }

    setAppliedFilters(updatedFilters);
  };

  const getActiveFilterSections = () => {
    const sections = [];

    if (
      appliedFilters.nationality ||
      appliedFilters.city ||
      appliedFilters.package ||
      appliedFilters.badge ||
      appliedFilters.gender ||
      appliedFilters.marriedLate ||
      appliedFilters.bookingStatus
    ) {
      sections.push({ key: 'personal', label: t('Label.personal_information') });
    }

    if (
      appliedFilters.gatheringPointType ||
      appliedFilters.gatheringPoint ||
      appliedFilters.destination
    ) {
      sections.push({ key: 'gathering', label: t('Label.gathering_point') });
    }

    if (
      appliedFilters.roomNumber ||
      appliedFilters.accommodationDestination ||
      appliedFilters.campStatus
    ) {
      sections.push({ key: 'accommodation', label: t('Label.accommodation') });
    }

    if (appliedFilters.busNumber) {
      sections.push({ key: 'transportation', label: t('Label.transportation_data') });
    }

    if (appliedFilters.healthStatus) {
      sections.push({ key: 'health', label: t('Label.health_status_data') });
    }

    if (appliedFilters.supervisors?.length > 0 || appliedFilters.importFile) {
      sections.push({ key: 'supervision', label: t('Label.supervision_organization') });
    }

    if (appliedFilters.shippingManagement || appliedFilters.shipmentStatus) {
      sections.push({ key: 'shipping', label: t('Label.shipping_operations') });
    }

    return sections;
  };

  const activeFilterSections = getActiveFilterSections();
  const activeFilterCount = activeFilterSections.length;

  const tableHead: headCellType[] = [
    { id: 'haj_no', label: 'Pilgrims.Label.haj_no' },
    { id: 'name', label: 'Pilgrims.Label.name' },
    { id: 'national_id', label: 'Pilgrims.Label.identity_number' },
    { id: 'reservation_no', label: 'Pilgrims.Label.booking_number' },
    { id: 'mobile', label: 'Pilgrims.Label.phone' },
    { id: 'status_name', label: 'Pilgrims.Label.status' },
    { id: 'nationality', label: 'Pilgrims.Label.nationality' },
    { id: 'gender_name', label: 'Pilgrims.Label.gender' },
    { id: 'city', label: 'Pilgrims.Label.city' },
    { id: 'package', label: 'Pilgrims.Label.package' },
    { id: 'transport', label: 'Pilgrims.Label.transport' },
  ];

  const handleRowClick = (row: Pilgrim) => {
    router.push(paths.dashboard.pilgrims.view(String(row.id)));
  };

  const actions: Action<Pilgrim>[] = [
    {
      label: t('Label.message'),
      icon: '/assets/icons/table/sms.svg',
      onClick: (row) => console.log('message pilgrim', row.id),
    },
    {
      label: t('Label.view'),
      icon: '/assets/icons/table/view.svg',
      onClick: (row) => router.push(paths.dashboard.pilgrims.view(String(row.id))),
    },
    {
      label: t('Label.edit'),
      icon: '/assets/icons/table/edit.svg',
      onClick: (row) => router.push(`${paths.dashboard.pilgrims.view(String(row.id))}?isEdit=true`),
    },
    {
      label: t('Label.delete'),
      icon: '/assets/icons/table/delete.svg',
      onClick: (row) => console.log('delete pilgrim', row.id),
    },
  ];

  const registrationStatusColors: Record<string, { bg: string; color: string; label: string }> = {
    Active: { bg: '#E8F5E9', color: '#2E7D32', label: 'نشط' },
    Inactive: { bg: '#F3E5F5', color: '#7B1FA2', label: 'غير نشط' },
    Cancelled: { bg: '#FFEBEE', color: '#C62828', label: 'ملغي' },
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
    'باقة 1': { bg: '#E3F2FD', color: '#1976D2' },
    'باقة 2': { bg: '#F3E5F5', color: '#7B1FA2' },
    'باقة 3': { bg: '#E8F5E9', color: '#388E3C' },
    اقتصادية: { bg: '#FEF9E7', color: '#D4A017' },
    VIP: { bg: '#FFF8E1', color: '#F9A825' },
    مميزة: { bg: '#F3E5F5', color: '#9C27B0' },
    شؤون: { bg: '#E0F7FA', color: '#00ACC1' },
  };

  const customRender: Partial<Record<keyof Pilgrim, (row: Pilgrim) => ReactNode>> = {
    name: (row) => (
      <Typography variant="body2" sx={{ fontSize: 13 }}>
        {row.name?.ar || t('Label.not_available')}
      </Typography>
    ),
    mobile: (row) => (
      <Box sx={{ direction: 'ltr', textAlign: 'left' }}>
        {row.mobile ? `+966${row.mobile}` : t('Label.not_available')}
      </Box>
    ),
    status_name: (row) => {
      if (!row.status_name) {
        return (
          <Typography variant="body2" sx={{ fontSize: 13, color: 'text.secondary' }}>
            {t('Label.not_available')}
          </Typography>
        );
      }
      const statusInfo = registrationStatusColors[row.status_name] || {
        bg: '#F5F5F5',
        color: '#666',
        label: row.status_name,
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
    gender_name: (row) => (
      <Typography variant="body2" sx={{ fontSize: 13 }}>
        {t(`Label.${row.gender_name}`) || t('Label.not_available')}
      </Typography>
    ),
    nationality: (row) => {
      if (!row.nationality?.country) {
        return (
          <Typography variant="body2" sx={{ fontSize: 13, color: 'text.secondary' }}>
            {t('Label.not_available')}
          </Typography>
        );
      }
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {row.nationality.country.flag?.svg && (
            <Image
              src={row.nationality.country.flag.svg}
              alt={row.nationality.country.name?.ar || 'Flag'}
              width={20}
              height={15}
              style={{ borderRadius: 2 }}
            />
          )}
          <Typography variant="body2" sx={{ fontSize: 13 }}>
            {row.nationality.country.name?.ar || t('Label.not_available')}
          </Typography>
        </Box>
      );
    },
    city: (row) => (
      <Typography variant="body2" sx={{ fontSize: 13 }}>
        {row.city?.city?.name?.ar || t('Label.not_available')}
      </Typography>
    ),
    package: (row) => {
      if (!row.package?.name?.ar) {
        return (
          <Typography variant="body2" sx={{ fontSize: 13, color: 'text.secondary' }}>
            {t('Label.not_available')}
          </Typography>
        );
      }
      const pkgInfo = packageColors[row.package.name.ar] || {
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
          {row.package.name.ar}
        </Box>
      );
    },
    transport: (row) => (
      <Typography variant="body2" sx={{ fontSize: 13 }}>
        {row.transport?.name?.ar || t('Label.not_available')}
      </Typography>
    ),
  };

  // Use API data directly for server-side pagination
  const pilgrims = useMemo(() => {
    return pilgrimsData?.data || [];
  }, [pilgrimsData]);

  const selectedPilgrims = useMemo(
    () => pilgrims.filter((pilgrim) => (table.selected ?? []).includes(String(pilgrim.id))),
    [pilgrims, table.selected]
  );

  // Skeleton loader component for table
  const TableSkeleton = () => {
    const skeletonRows = currentLimit || 10;
    const skeletonCols = tableHead.length + 2; // +2 for checkbox and order columns

    return (
      <TableContainer>
        <Table
          sx={{
            minWidth: 400,
            borderCollapse: 'separate',
            '& .MuiTableCell-root': {
              border: 'none',
              padding: '12px 16px',
            },
          }}
        >
          <TableHead>
            <TableRow>
              {/* Checkbox column */}
              <TableCell sx={{ width: 52 }}>
                <Skeleton variant="rectangular" width={20} height={20} />
              </TableCell>
              {/* Order column */}
              <TableCell sx={{ width: 40 }}>
                <Skeleton variant="text" width={20} />
              </TableCell>
              {/* Data columns */}
              {tableHead.map((head) => (
                <TableCell key={head.id}>
                  <Skeleton variant="text" width="80%" />
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.from({ length: skeletonRows }).map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {/* Checkbox column */}
                <TableCell>
                  <Skeleton variant="rectangular" width={20} height={20} />
                </TableCell>
                {/* Order column */}
                <TableCell>
                  <Skeleton variant="text" width={20} />
                </TableCell>
                {/* Data columns */}
                {tableHead.map((head) => (
                  <TableCell key={head.id}>
                    <Skeleton variant="text" width="90%" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  const stats = [
    {
      key: 'pilgrims',
      label: t('Label.total_pilgrims'),
      value: pilgrimsData?.meta?.total?.toLocaleString() || '0',
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
          links={[
            {
              name: t('Label.breadcrumb_home'),
              href: '/',
            },
            { name: t('Label.pilgrims_management') },
          ]}
          action={
            <Button
              variant="contained"
              color="primary"
              onClick={() => router.push(paths.dashboard.pilgrims.addEdit)}
            >
              {t('Button.add')}
            </Button>
          }
          sx={{ mb: 2 }}
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
              {/* Absolute Filter Button with Dropdown - Only show if filters are applied */}
              {activeFilterCount > 0 && (
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
                        minWidth: 250,
                        boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.12)',
                      },
                    }}
                  >
                    {activeFilterSections.map((section) => (
                      <MenuItem
                        key={section.key}
                        onClick={() => handleClearFilterSection(section.key)}
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
                          {section.label}
                        </Box>
                        <Box
                          component="span"
                          sx={{
                            width: 24,
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <Iconify icon="mdi:close" width={18} sx={{ color: '#999' }} />
                        </Box>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              )}
              {/* Custom Bulk Actions Button that opens dialog */}
              {table.selected.length > 0 && (
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

                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    sx={{ marginInlineEnd: 3 }}
                  >
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
              )}
            </Stack>

            <Stack direction="row" spacing={1.25} alignItems="center">
              <Button
                variant="outlined"
                onClick={importDialog.onOpen}
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
                onClick={filterDialog.onOpen}
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

          {pilgrimsError ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 10 }}>
              <Typography variant="body1" color="error">
                Error loading pilgrims. Please try again.
              </Typography>
            </Box>
          ) : pilgrimsLoading ? (
            <TableSkeleton />
          ) : (
            <SharedTable<Pilgrim>
              tableHead={tableHead}
              data={pilgrims}
              count={pilgrimsData?.meta?.total || 0}
              actions={actions}
              customRender={customRender}
              disablePagination={false}
              order={true}
              enableSelection
              table={table}
              onRowClick={handleRowClick}
            />
          )}
        </Card>
      </Box>

      {/* Bulk Actions Dialog */}
      <BulkActionsDialog
        open={bulkDialog.open}
        onClose={bulkDialog.onClose}
        selectedCount={table.selected.length}
        selectedPilgrims={selectedPilgrims}
        allPilgrims={pilgrims}
        onClearSelection={() => table.setSelected([])}
      />

      {/* Filter Dialog */}
      <FilterDialog
        open={filterDialog.open}
        onClose={filterDialog.onClose}
        onApplyFilters={handleApplyFilters}
        externalFilters={appliedFilters}
      />

      {/* Import Dialog */}
      <ImportDialog open={importDialog.open} onClose={importDialog.onClose} />
    </Container>
  );
}
