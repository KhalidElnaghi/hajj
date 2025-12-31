'use client';

import { Fragment, ReactNode, useMemo, useState, useEffect } from 'react';

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
  useMediaQuery,
  useTheme,
} from '@mui/material';

import { useLocale, useTranslations } from 'next-intl';

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
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useFetchPilgrims, useDeletePilgrim } from 'src/services/queries/pilgrims';
import { Pilgrim } from 'src/services/api/pilgrims';
import { useSnackbar } from 'notistack';
import { ConfirmDialog } from 'src/components/custom-dialog';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function PilgrimsView() {
  const t = useTranslations('Pilgrims');
  const locale = useLocale();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const table = useTable();
  const bulkDialog = useDisclosure();
  const filterDialog = useDisclosure();
  const importDialog = useDisclosure();
  const deleteDialog = useDisclosure();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [genderFilter, setGenderFilter] = useState<string>('all');
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);
  const filterMenuOpen = Boolean(filterAnchorEl);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { enqueueSnackbar } = useSnackbar();
  const filterMenuWidth = isMobile ? '100%' : filterAnchorEl?.clientWidth || 250;
  // Applied filters from dialog
  const [appliedFilters, setAppliedFilters] = useState<any>({});
  const [pilgrimToDelete, setPilgrimToDelete] = useState<Pilgrim | null>(null);

  // Get pagination and filters from URL params
  const currentPage = Number(searchParams.get('page')) || 1;
  const currentLimit = Number(searchParams.get('per_page')) || 10;

  // Get filter params from URL
  const urlFilters = {
    query: searchParams.get('query') || undefined,
    package_id: searchParams.get('package_id') || undefined,
    city_id: searchParams.get('city_id') || undefined,
    nationality_id: searchParams.get('nationality_id') || undefined,
    transport_id: searchParams.get('transport_id') || undefined,
    pilgrim_type_id: searchParams.get('pilgrim_type_id') || undefined,
    tag_id: searchParams.get('tag_id') || undefined,
    camp_id: searchParams.get('camp_id') || undefined,
    reservation_id: searchParams.get('reservation_id') || undefined,
    supervisor_id: searchParams.get('supervisor_id') || undefined,
    source: searchParams.get('source') || undefined,
    gender: searchParams.get('gender') || undefined,
    departure_status: searchParams.get('departure_status') || undefined,
    muhrim_status: searchParams.get('muhrim_status') || undefined,
    status: searchParams.get('status') || undefined,
    gathering_point_type_id: searchParams.get('gathering_point_type_id') || undefined,
    gathering_point_id: searchParams.get('gathering_point_id') || undefined,
    destination_id: searchParams.get('destination_id') || undefined,
    gathering_point_time_id: searchParams.get('gathering_point_time_id') || undefined,
    import_history_id: searchParams.get('import_history_id') || undefined,
    excel_action_status: searchParams.get('excel_action_status') || undefined,
  };

  // Initialize appliedFilters and searchTerm from URL params on mount
  useEffect(() => {
    const filtersFromUrl: any = {};

    if (searchParams.get('query')) setSearchTerm(searchParams.get('query') || '');
    if (searchParams.get('package_id')) filtersFromUrl.package = searchParams.get('package_id');
    if (searchParams.get('city_id')) {
      // Store as an object with id for the filter dialog
      filtersFromUrl.city = { id: Number(searchParams.get('city_id')) };
    }
    if (searchParams.get('nationality_id')) {
      // Store as an object with id for the filter dialog
      filtersFromUrl.nationality = { id: Number(searchParams.get('nationality_id')) };
    }
    if (searchParams.get('transport_id'))
      filtersFromUrl.transport = searchParams.get('transport_id');
    if (searchParams.get('pilgrim_type_id'))
      filtersFromUrl.pilgrimType = searchParams.get('pilgrim_type_id');
    if (searchParams.get('tag_id')) filtersFromUrl.tag_id = searchParams.get('tag_id');
    if (searchParams.get('camp_id')) {
      // Store as an object with id for the filter dialog
      filtersFromUrl.camp_id = { id: Number(searchParams.get('camp_id')) };
    }
    if (searchParams.get('reservation_id')) {
      // Store as an object with id for the filter dialog
      filtersFromUrl.reservation_id = { id: Number(searchParams.get('reservation_id')) };
    }
    if (searchParams.get('supervisor_id')) {
      // Store as an object with id for the filter dialog
      filtersFromUrl.supervisor = { id: Number(searchParams.get('supervisor_id')) };
    }
    if (searchParams.get('source')) filtersFromUrl.source = searchParams.get('source');
    if (searchParams.get('gender')) filtersFromUrl.gender = searchParams.get('gender');
    if (searchParams.get('departure_status'))
      filtersFromUrl.marriedLate = searchParams.get('departure_status');
    if (searchParams.get('muhrim_status'))
      filtersFromUrl.muhrimStatus = searchParams.get('muhrim_status');
    if (searchParams.get('status')) filtersFromUrl.pilgrimStatus = searchParams.get('status');
    if (searchParams.get('gathering_point_type_id'))
      filtersFromUrl.gathering_point_type_id = searchParams.get('gathering_point_type_id');
    if (searchParams.get('gathering_point_id'))
      filtersFromUrl.gathering_point_id = searchParams.get('gathering_point_id');
    if (searchParams.get('destination_id'))
      filtersFromUrl.destination_id = searchParams.get('destination_id');
    if (searchParams.get('gathering_point_time_id'))
      filtersFromUrl.gathering_point_time_id = searchParams.get('gathering_point_time_id');
    if (searchParams.get('import_history_id'))
      filtersFromUrl.import_history_id = searchParams.get('import_history_id');
    if (searchParams.get('excel_action_status'))
      filtersFromUrl.excel_action_status = searchParams.get('excel_action_status');

    setAppliedFilters(filtersFromUrl);
  }, [searchParams]);

  // Update URL query parameter when search term changes (with debounce)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (searchTerm) {
        params.set('query', searchTerm);
      } else {
        params.delete('query');
      }

      // Reset to page 1 when search changes
      params.set('page', '1');

      router.push(`${pathname}?${params.toString()}`);
    }, 500); // 500ms debounce

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  // Fetch pilgrims data using React Query
  const {
    data: pilgrimsData,
    isLoading: pilgrimsLoading,
    isError: pilgrimsError,
    refetch: refreshPilgrims,
  } = useFetchPilgrims({
    page: currentPage,
    limit: currentLimit,
    // Use filter params from URL (including query)
    ...urlFilters,
  });

  // Delete pilgrim mutation
  const deleteMutation = useDeletePilgrim();

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

    // Update URL query parameters
    const params = new URLSearchParams(searchParams.toString());

    // Remove old filter params
    params.delete('package_id');
    params.delete('city_id');
    params.delete('nationality_id');
    params.delete('transport_id');
    params.delete('pilgrim_type_id');
    params.delete('tag_id');
    params.delete('camp_id');
    params.delete('reservation_id');
    params.delete('supervisor_id');
    params.delete('source');
    params.delete('gender');
    params.delete('departure_status');
    params.delete('muhrim_status');
    params.delete('status');
    params.delete('gathering_point_type_id');
    params.delete('gathering_point_id');
    params.delete('destination_id');
    params.delete('gathering_point_time_id');
    params.delete('import_history_id');
    params.delete('excel_action_status');

    // Add new filter params
    if (filters.package) params.set('package_id', filters.package);
    if (filters.city?.city_id) params.set('city_id', String(filters.city.city_id));
    if (filters.nationality?.country?.id)
      params.set('nationality_id', String(filters.nationality.country.id));
    if (filters.transport) params.set('transport_id', filters.transport);
    if (filters.pilgrimType) params.set('pilgrim_type_id', filters.pilgrimType);
    if (filters.tag_id) params.set('tag_id', filters.tag_id);
    if (filters.camp_id?.id) params.set('camp_id', String(filters.camp_id.id));
    if (filters.reservation_id?.id) params.set('reservation_id', String(filters.reservation_id.id));
    if (filters.supervisor?.id) params.set('supervisor_id', String(filters.supervisor.id));
    if (filters.source) params.set('source', filters.source);
    if (filters.gender) params.set('gender', filters.gender);
    if (filters.marriedLate) params.set('departure_status', filters.marriedLate);
    if (filters.muhrimStatus) params.set('muhrim_status', filters.muhrimStatus);
    if (filters.pilgrimStatus) params.set('status', filters.pilgrimStatus);
    if (filters.gathering_point_type_id)
      params.set('gathering_point_type_id', filters.gathering_point_type_id);
    if (filters.gathering_point_id) params.set('gathering_point_id', filters.gathering_point_id);
    if (filters.destination_id) params.set('destination_id', filters.destination_id);
    if (filters.gathering_point_time_id)
      params.set('gathering_point_time_id', filters.gathering_point_time_id);
    if (filters.import_history_id) params.set('import_history_id', filters.import_history_id);
    if (filters.excel_action_status) params.set('excel_action_status', filters.excel_action_status);

    // Reset to page 1 when filters change
    params.set('page', '1');

    // Update URL
    router.push(`${pathname}?${params.toString()}`);
  };

  // Count active filters from URL params
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (urlFilters.package_id) count++;
    if (urlFilters.city_id) count++;
    if (urlFilters.nationality_id) count++;
    if (urlFilters.transport_id) count++;
    if (urlFilters.pilgrim_type_id) count++;
    if (urlFilters.tag_id) count++;
    if (urlFilters.camp_id) count++;
    if (urlFilters.reservation_id) count++;
    if (urlFilters.supervisor_id) count++;
    if (urlFilters.source) count++;
    if (urlFilters.gender) count++;
    if (urlFilters.departure_status) count++;
    if (urlFilters.muhrim_status) count++;
    if (urlFilters.status) count++;
    if (urlFilters.gathering_point_type_id) count++;
    if (urlFilters.gathering_point_id) count++;
    if (urlFilters.destination_id) count++;
    if (urlFilters.gathering_point_time_id) count++;
    if (urlFilters.import_history_id) count++;
    if (urlFilters.excel_action_status) count++;
    return count;
  }, [urlFilters]);

  // Clear all filters
  const handleClearAllFilters = () => {
    setAppliedFilters({});
    setSearchTerm('');

    // Clear filter params from URL
    const params = new URLSearchParams(searchParams.toString());
    params.delete('query');
    params.delete('package_id');
    params.delete('city_id');
    params.delete('nationality_id');
    params.delete('transport_id');
    params.delete('pilgrim_type_id');
    params.delete('tag_id');
    params.delete('camp_id');
    params.delete('reservation_id');
    params.delete('supervisor_id');
    params.delete('source');
    params.delete('gender');
    params.delete('departure_status');
    params.delete('muhrim_status');
    params.delete('status');
    params.delete('gathering_point_type_id');
    params.delete('gathering_point_id');
    params.delete('destination_id');
    params.delete('gathering_point_time_id');
    params.delete('import_history_id');
    params.delete('excel_action_status');

    // Reset to page 1
    params.set('page', '1');

    // Update URL
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleClearFilterSection = (section: string) => {
    const updatedFilters = { ...appliedFilters };
    const params = new URLSearchParams(searchParams.toString());

    switch (section) {
      case 'personal':
        updatedFilters.nationality = null;
        updatedFilters.city = null;
        updatedFilters.package = '';
        updatedFilters.tag_id = '';
        updatedFilters.gender = '';
        updatedFilters.marriedLate = '';
        updatedFilters.reservation_id = null;
        updatedFilters.pilgrimType = '';
        updatedFilters.muhrimStatus = '';
        updatedFilters.pilgrimStatus = '';
        // Clear URL params
        params.delete('nationality_id');
        params.delete('city_id');
        params.delete('package_id');
        params.delete('tag_id');
        params.delete('reservation_id');
        params.delete('gender');
        params.delete('departure_status');
        params.delete('pilgrim_type_id');
        params.delete('muhrim_status');
        params.delete('status');
        break;
      case 'gathering':
        updatedFilters.gathering_point_type_id = '';
        updatedFilters.gathering_point_id = '';
        updatedFilters.destination_id = '';
        updatedFilters.gathering_point_time_id = '';
        // Clear URL params
        params.delete('gathering_point_type_id');
        params.delete('gathering_point_id');
        params.delete('destination_id');
        params.delete('gathering_point_time_id');
        break;
      case 'accommodation':
        updatedFilters.roomNumber = '';
        updatedFilters.camp_id = null;
        updatedFilters.campStatus = '';
        // Clear URL params
        params.delete('camp_id');
        break;
      case 'transportation':
        updatedFilters.transport = '';
        // Clear URL params
        params.delete('transport_id');
        break;
      case 'health':
        updatedFilters.healthStatus = '';
        break;
      case 'supervision':
        updatedFilters.supervisor = null;
        // Clear URL params
        params.delete('supervisor_id');
        break;
      case 'import':
        updatedFilters.excel_action_status = '';
        updatedFilters.source = '';
        updatedFilters.import_history_id = '';
        // Clear URL params
        params.delete('source');
        params.delete('import_history_id');
        params.delete('excel_action_status');
        break;
      case 'shipping':
        updatedFilters.shippingManagement = '';
        updatedFilters.shipmentStatus = '';
        break;
    }

    setAppliedFilters(updatedFilters);

    // Reset to page 1
    params.set('page', '1');

    // Update URL
    router.push(`${pathname}?${params.toString()}`);
  };

  const getActiveFilterSections = () => {
    const sections = [];

    if (
      appliedFilters.nationality ||
      appliedFilters.city ||
      appliedFilters.package ||
      appliedFilters.tag_id ||
      appliedFilters.gender ||
      appliedFilters.marriedLate ||
      appliedFilters.reservation_id ||
      appliedFilters.pilgrimType ||
      appliedFilters.muhrimStatus ||
      appliedFilters.pilgrimStatus
    ) {
      sections.push({ key: 'personal', label: t('Label.personal_information') });
    }

    if (
      appliedFilters.gathering_point_type_id ||
      appliedFilters.gathering_point_id ||
      appliedFilters.destination_id ||
      appliedFilters.gathering_point_time_id
    ) {
      sections.push({ key: 'gathering', label: t('Label.gathering_point') });
    }

    if (appliedFilters.roomNumber || appliedFilters.camp_id || appliedFilters.campStatus) {
      sections.push({ key: 'accommodation', label: t('Label.accommodation') });
    }

    if (appliedFilters.transport) {
      sections.push({ key: 'transportation', label: t('Label.transportation_data') });
    }

    if (appliedFilters.healthStatus) {
      sections.push({ key: 'health', label: t('Label.health_status_data') });
    }

    if (appliedFilters.supervisor) {
      sections.push({ key: 'supervision', label: t('Label.supervision_organization') });
    }

    if (
      appliedFilters.excel_action_status ||
      appliedFilters.source ||
      appliedFilters.import_history_id
    ) {
      sections.push({ key: 'import', label: t('Label.import_file') });
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

  const handleDeleteClick = (row: Pilgrim) => {
    setPilgrimToDelete(row);
    deleteDialog.onOpen();
  };

  const handleDeleteConfirm = async () => {
    if (!pilgrimToDelete) return;

    try {
      const result = await deleteMutation.mutateAsync(pilgrimToDelete.id);
      console.log('Delete result:', result);
      enqueueSnackbar(t('Message.delete_success'), { variant: 'success' });
      deleteDialog.onClose();
      setPilgrimToDelete(null);
    } catch (error) {
      console.error('Delete error:', error);
      enqueueSnackbar(t('Message.delete_error'), { variant: 'error' });
    }
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
      onClick: handleDeleteClick,
    },
  ];

  const registrationStatusColors: Record<
    string,
    { bg: string; color: string; label: { ar: string; en: string } }
  > = {
    Active: { bg: '#E8F5E9', color: '#2E7D32', label: { ar: 'نشط', en: 'Active' } },
    Inactive: { bg: '#F3E5F5', color: '#7B1FA2', label: { ar: 'غير نشط', en: 'Inactive' } },
    Cancelled: { bg: '#FFEBEE', color: '#C62828', label: { ar: 'ملغي', en: 'Cancelled' } },
    completed: { bg: '#E8F5E9', color: '#2E7D32', label: { ar: 'مكتمل', en: 'Completed' } },
    pending: { bg: '#F3E5F5', color: '#7B1FA2', label: { ar: 'مؤكد', en: 'Pending' } },
    confirmed: {
      bg: '#FFEDD4',
      color: '#F54900',
      label: { ar: 'قيد التأكيد', en: 'Pending Confirmation' },
    },
    cancelled: { bg: '#FFEBEE', color: '#C62828', label: { ar: 'ملغي', en: 'Cancelled' } },
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

  const getLocalizedName = (name?: { ar?: string; en?: string } | null) =>
    name?.[locale as 'ar' | 'en'] || name?.en || name?.ar || '';

  const customRender: Partial<Record<keyof Pilgrim, (row: Pilgrim) => ReactNode>> = {
    name: (row) => (
      <Typography variant="body2" sx={{ fontSize: 13 }}>
        {getLocalizedName(row.name) || t('Label.not_available')}
      </Typography>
    ),
    mobile: (row) => (
      <Box sx={{ direction: locale === 'ar' ? 'rtl' : 'ltr', textAlign: 'left' }}>
        {row.mobile ? `+966${row.mobile}` : t('Label.not_available')}
      </Box>
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
              alt={getLocalizedName(row.nationality.country.name) || 'Flag'}
              width={20}
              height={15}
              style={{ borderRadius: 2 }}
            />
          )}
          <Typography variant="body2" sx={{ fontSize: 13 }}>
            {getLocalizedName(row.nationality.country.name) || t('Label.not_available')}
          </Typography>
        </Box>
      );
    },
    city: (row) => (
      <Typography variant="body2" sx={{ fontSize: 13 }}>
        {getLocalizedName(row.city?.city?.name) || t('Label.not_available')}
      </Typography>
    ),
    package: (row) => {
      const packageLabel = getLocalizedName(row.package?.name);
      if (!packageLabel) {
        return (
          <Typography variant="body2" sx={{ fontSize: 13, color: 'text.secondary' }}>
            {t('Label.not_available')}
          </Typography>
        );
      }
      const pkgColorKey = row.package?.name?.ar || row.package?.name?.en || '';
      const pkgInfo = packageColors[pkgColorKey] || {
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
          {packageLabel}
        </Box>
      );
    },
    transport: (row) => (
      <Typography variant="body2" sx={{ fontSize: 13 }}>
        {getLocalizedName(row.transport?.name) || t('Label.not_available')}
      </Typography>
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
        label: { ar: row.status_name, en: row.status_name },
      };
      const statusLabel =
        statusInfo.label?.[locale as 'ar' | 'en'] ||
        statusInfo.label?.en ||
        statusInfo.label?.ar ||
        row.status_name;
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
          {statusLabel}
        </Box>
      );
    },
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
      value: '751',
      icon: '/assets/images/pilgrims/total.svg',
    },
    {
      key: 'permits',
      label: t('Label.support_messages'),
      value: '423',
      icon: '/assets/images/pilgrims/messages.svg',
    },
    {
      key: 'accommodation',
      label: t('Label.accommodation_capacity'),
      value: '0',
      icon: '/assets/images/pilgrims/home.svg',
    },
    {
      key: 'gatherings',
      label: t('Label.tracked_locations'),
      value: '0',
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
                  transition: 'max-width 0.3s ease-in-out',
                  '&:focus-within': {
                    maxWidth: 350,
                  },
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
                <Box sx={{ width: { xs: '100%', md: 'auto' } }}>
                  <Button
                    variant="outlined"
                    onClick={handleFilterClick}
                    fullWidth={isMobile}
                    sx={{
                      borderRadius: 1,
                      height: 44,
                      paddingInlineStart: 2,
                      paddingInlineEnd: 5,
                      minWidth: { xs: '100%', md: 200 },
                      width: { xs: '100%', md: 200 },
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
                        width: filterMenuWidth,
                        minWidth: filterMenuWidth,
                        maxWidth: isMobile ? '100%' : undefined,
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
                  fullWidth={isMobile}
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
                    minWidth: isMobile ? '100%' : 200,
                    width: isMobile ? '100%' : 200,
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

            <Stack
              direction={'row'}
              spacing={1.25}
              alignItems={isMobile ? 'stretch' : 'center'}
              sx={{ width: { xs: '100%', md: 'auto' } }}
            >
              <Button
                variant="outlined"
                onClick={importDialog.onOpen}
                startIcon={
                  !isMobile ? (
                    <Image
                      src="/assets/images/pilgrims/import.svg"
                      alt="import"
                      width={15}
                      height={15}
                    />
                  ) : undefined
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
                  !isMobile ? (
                    <Image
                      src="/assets/images/pilgrims/export.svg"
                      alt="export"
                      width={15}
                      height={15}
                    />
                  ) : undefined
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
                  p: isMobile ? '8px 12px' : 0,
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

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={deleteDialog.open}
        onClose={deleteDialog.onClose}
        title={t('Title.delete_pilgrim')}
        content={
          pilgrimToDelete
            ? t('Message.delete_pilgrim_confirm', { name: getLocalizedName(pilgrimToDelete.name) })
            : ''
        }
        buttonTitle={t('Button.delete')}
        buttonColor="error"
        handleConfirmDelete={handleDeleteConfirm}
        loading={deleteMutation.isPending}
      />
    </Container>
  );
}
