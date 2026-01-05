'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
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
import { useTranslations, useLocale } from 'next-intl';
import Iconify from 'src/components/iconify';
import Image from 'next/image';
import { useFetchPilgrimInitData } from 'src/services/queries/pilgrims';
import FilterDropdown from './components/FilterDropdown';
import FilterToggleGroup from './components/FilterToggleGroup';
import FilterSection from './components/FilterSection';
import FilterAccommodationSection from './sections/FilterAccommodationSection';
import FilterGatheringSection from './sections/FilterGatheringSection';
import FilterTransportationSection from './sections/FilterTransportationSection';
import FilterHealthSection from './sections/FilterHealthSection';
import FilterSupervisionSection from './sections/FilterSupervisionSection';
import FilterImportSection from './sections/FilterImportSection';
import FilterPersonalSection from './sections/FilterPersonalSection';
import {
  transformPackagesToOptions,
  transformCitiesToOptions,
  transformCountriesToOptions,
  transformTransportsToOptions,
  transformPilgrimTypesToOptions,
  transformSimpleToDropdownOptions,
  transformSimpleToToggleOptions,
  transformEmployeesToOptions,
  transformTagsToOptions,
} from './utils';

// ----------------------------------------------------------------------

// Helper function to format time in 12-hour format with AM/PM
const formatTime = (time: string, locale: string = 'ar') => {
  if (!time) return '';

  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours, 10);
  const minute = minutes || '00';

  const isArabic = locale === 'ar';
  const am = isArabic ? 'ص' : 'AM';
  const pm = isArabic ? 'م' : 'PM';

  if (hour === 0) {
    return `12:${minute} ${am}`; // Midnight
  } else if (hour < 12) {
    return `${hour}:${minute} ${am}`; // AM
  } else if (hour === 12) {
    return `12:${minute} ${pm}`; // Noon
  } else {
    return `${hour - 12}:${minute} ${pm}`; // PM
  }
};

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
  const t = useTranslations('Pilgrims');
  const locale = useLocale();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const getLocalizedName = (name?: { ar?: string; en?: string } | null) =>
    name?.[locale as 'ar' | 'en'] || name?.en || name?.ar || '';

  // Fetch init data for dropdowns
  const { data: initData, isLoading: initDataLoading } = useFetchPilgrimInitData();

  // Transform API data to dropdown options
  const packageOptions = useMemo(
    () => transformPackagesToOptions(initData?.data?.packages, locale),
    [initData?.data?.packages, locale]
  );

  const cityOptions = useMemo(
    () => transformCitiesToOptions(initData?.data?.cities, locale),
    [initData?.data?.cities, locale]
  );

  const nationalityOptions = useMemo(
    () => transformCountriesToOptions(initData?.data?.countries, locale),
    [initData?.data?.countries, locale]
  );

  const transportOptions = useMemo(
    () => transformTransportsToOptions(initData?.data?.transports, locale),
    [initData?.data?.transports, locale]
  );

  const pilgrimTypeOptions = useMemo(
    () => transformPilgrimTypesToOptions(initData?.data?.pilgrimTypes, locale),
    [initData?.data?.pilgrimTypes, locale]
  );

  const muhrimStatusOptions = useMemo(
    () => transformSimpleToDropdownOptions(initData?.data?.muhrimStatuses, locale),
    [initData?.data?.muhrimStatuses, locale]
  );

  const pilgrimStatusOptions = useMemo(
    () => transformSimpleToDropdownOptions(initData?.data?.pilgrimStatuses, locale),
    [initData?.data?.pilgrimStatuses, locale]
  );

  const sourceOptions = useMemo(
    () => transformSimpleToDropdownOptions(initData?.data?.sources, locale),
    [initData?.data?.sources, locale]
  );

  const genderToggleOptions = useMemo(
    () => transformSimpleToToggleOptions(initData?.data?.genders, locale),
    [initData?.data?.genders, locale]
  );

  const departureToggleOptions = useMemo(
    () => transformSimpleToToggleOptions(initData?.data?.departureStatuses, locale),
    [initData?.data?.departureStatuses, locale]
  );

  const tagOptions = useMemo(
    () => transformTagsToOptions(initData?.data?.tags, locale),
    [initData?.data?.tags, locale]
  );

  const employeeOptions = useMemo(
    () => transformEmployeesToOptions(initData?.data?.employees, locale),
    [initData?.data?.employees, locale]
  );

  const searchValue = searchTerm.trim().toLowerCase();
  const matchesSearch = (texts: (string | undefined)[]) =>
    !searchValue || texts.some((text) => text?.toLowerCase().includes(searchValue));

  const sectionKeywords = {
    personal: [
      t('Label.personal_information'),
      t('Label.nationality'),
      t('Label.city'),
      t('Label.package_name'),
      t('Label.tags'),
      t('Label.gender'),
      t('Label.early_late'),
      t('Label.booking_status'),
      t('Label.pilgrim_type'),
      t('Label.muhrim_status'),
      t('Label.pilgrim_status'),
    ],
    gathering: [
      t('Label.gathering_points'),
      t('Label.gathering_point_type'),
      t('Label.gathering_point'),
      t('Label.destination'),
    ],
    accommodation: [
      t('Label.accommodation'),
      t('Label.room_number'),
      t('Label.accommodation_destination'),
      t('Label.camp_status'),
    ],
    transportation: [t('Label.transportation'), t('Label.transport')],
    health: [t('Label.health_status')],
    supervision: [t('Label.supervision'), t('Label.supervisors')],
    import: [t('Label.import_file'), t('Label.source')],
    shipping: [
      t('Label.shipping_operations'),
      t('Label.shipping_management'),
      t('Label.shipment_status'),
    ],
  };

  const showSection = {
    personal: matchesSearch(sectionKeywords.personal),
    gathering: matchesSearch(sectionKeywords.gathering),
    accommodation: matchesSearch(sectionKeywords.accommodation),
    transportation: matchesSearch(sectionKeywords.transportation),
    health: matchesSearch(sectionKeywords.health),
    supervision: matchesSearch(sectionKeywords.supervision),
    import: matchesSearch(sectionKeywords.import),
    shipping: matchesSearch(sectionKeywords.shipping),
  };

  const labelColor = (key: string) =>
    searchValue && t(key)?.toLowerCase().includes(searchValue) ? 'primary.main' : '#64748B';

  // Get supervisors list from init data
  const supervisorsList = initData?.data?.employees || [];

  // Get cities and countries lists from init data
  const citiesList = initData?.data?.cities || [];
  const countriesList = initData?.data?.countries || [];
  const campsList = initData?.data?.camps || [];
  const bookingStatusesList = initData?.data?.bookingStatuses || [];
  const importHistoryList = initData?.data?.importHistory || [];
  const excelActionsList = initData?.data?.excelActions || [];

  // Employee interface for autocomplete
  interface EmployeeOption {
    id: number;
    name: {
      ar: string;
      en: string;
    };
  }

  // City interface for autocomplete
  interface CityOption {
    city_id: number;
    city: {
      id: number;
      name: {
        ar: string;
        en: string;
      };
    };
  }

  // Country interface for autocomplete
  interface CountryOption {
    country: {
      id: number;
      name: {
        ar: string;
        en: string;
      };
      flag?: {
        svg: string;
      };
    };
  }

  // Camp interface for autocomplete
  interface CampOption {
    id: number;
    name: {
      ar: string;
      en: string;
    };
    camp_no: string;
    status: boolean;
  }

  // Booking Status interface for autocomplete
  interface BookingStatusOption {
    id: number;
    name: {
      ar: string;
      en: string;
    };
    status?: boolean;
  }

  // Form state
  const [filters, setFilters] = useState({
    // Personal Information
    nationality: null as CountryOption | null,
    city: null as CityOption | null,
    tag_id: '',
    gender: '',
    marriedLate: '',
    reservation_id: null as BookingStatusOption | null,
    package: '',
    pilgrimType: '',
    muhrimStatus: '',
    pilgrimStatus: '',

    // Assembly Points
    gathering_point_type_id: '' as string | number,
    gathering_point_id: '' as string | number,
    destination_id: '' as string | number,
    gathering_point_time_id: '' as string | number,

    // Accommodation
    roomNumber: '',
    camp_id: null as CampOption | null,
    campStatus: '',

    // Transportation
    transport: '',

    // Health Status
    healthStatus: '',

    // Supervision
    supervisor: null as EmployeeOption | null,

    // Import File
    excel_action_status: '',
    source: '',
    import_history_id: '',

    // Shipping Operations
    shippingManagement: '',
    shipmentStatus: '',
  });

  // Ref to track if we've synced with external filters
  const prevExternalFiltersRef = useRef<string>('');

  // Sync with external filters when they change
  useEffect(() => {
    if (externalFilters) {
      // Check if external filters actually changed
      const externalFiltersStr = JSON.stringify(externalFilters);
      if (prevExternalFiltersRef.current === externalFiltersStr) {
        return; // No change, skip update
      }
      prevExternalFiltersRef.current = externalFiltersStr;
      // Handle supervisor - if it only has an id, find the full object from supervisorsList
      let supervisorValue = externalFilters.supervisor || null;
      if (
        supervisorValue &&
        supervisorValue.id &&
        !supervisorValue.name &&
        supervisorsList.length > 0
      ) {
        const foundSupervisor = supervisorsList.find(
          (emp: EmployeeOption) => emp.id === supervisorValue.id
        );
        if (foundSupervisor) {
          supervisorValue = foundSupervisor;
        }
      }

      // Handle nationality - if it only has an id, find the full object from countriesList
      let nationalityValue = externalFilters.nationality || null;
      if (
        nationalityValue &&
        nationalityValue.id &&
        !nationalityValue.country &&
        countriesList.length > 0
      ) {
        const foundCountry = countriesList.find(
          (country: CountryOption) => country.country.id === nationalityValue.id
        );
        if (foundCountry) {
          nationalityValue = foundCountry;
        }
      }

      // Handle city - if it only has an id, find the full object from citiesList
      let cityValue = externalFilters.city || null;
      if (cityValue && cityValue.id && !cityValue.city && citiesList.length > 0) {
        const foundCity = citiesList.find((city: CityOption) => city.city_id === cityValue.id);
        if (foundCity) {
          cityValue = foundCity;
        }
      }

      // Handle camp - if it only has an id, find the full object from campsList
      let campValue = externalFilters.camp_id || null;
      if (campValue && campValue.id && !campValue.name && campsList.length > 0) {
        const foundCamp = campsList.find((camp: CampOption) => camp.id === campValue.id);
        if (foundCamp) {
          campValue = foundCamp;
        }
      }

      // Handle booking status - if it only has an id, find the full object from bookingStatusesList
      let bookingStatusValue = externalFilters.reservation_id || null;
      if (
        bookingStatusValue &&
        bookingStatusValue.id &&
        !bookingStatusValue.name &&
        bookingStatusesList.length > 0
      ) {
        const foundBookingStatus = bookingStatusesList.find(
          (status: BookingStatusOption) => status.id === bookingStatusValue.id
        );
        if (foundBookingStatus) {
          bookingStatusValue = foundBookingStatus;
        }
      }

      const updatedFilters = {
        nationality: nationalityValue,
        city: cityValue,
        tag_id: externalFilters.tag_id || '',
        gender: externalFilters.gender || '',
        marriedLate: externalFilters.marriedLate || '',
        reservation_id: bookingStatusValue,
        package: externalFilters.package || '',
        pilgrimType: externalFilters.pilgrimType || '',
        muhrimStatus: externalFilters.muhrimStatus || '',
        pilgrimStatus: externalFilters.pilgrimStatus || '',
        gathering_point_type_id: externalFilters.gathering_point_type_id
          ? Number(externalFilters.gathering_point_type_id)
          : '',
        gathering_point_id: externalFilters.gathering_point_id
          ? Number(externalFilters.gathering_point_id)
          : '',
        destination_id: externalFilters.destination_id
          ? Number(externalFilters.destination_id)
          : '',
        gathering_point_time_id: externalFilters.gathering_point_time_id
          ? Number(externalFilters.gathering_point_time_id)
          : '',
        roomNumber: externalFilters.roomNumber || '',
        camp_id: campValue,
        campStatus: externalFilters.campStatus || '',
        transport: externalFilters.transport || '',
        healthStatus: externalFilters.healthStatus || '',
        supervisor: supervisorValue,
        excel_action_status: externalFilters.excel_action_status || '',
        source: externalFilters.source || '',
        import_history_id: externalFilters.import_history_id || '',
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
        updatedFilters.tag_id ||
        updatedFilters.gender ||
        updatedFilters.marriedLate ||
        updatedFilters.reservation_id ||
        updatedFilters.pilgrimType ||
        updatedFilters.muhrimStatus ||
        updatedFilters.pilgrimStatus
      ) {
        sectionsToExpand.push('personal');
      }

      if (
        updatedFilters.gathering_point_type_id ||
        updatedFilters.gathering_point_id ||
        updatedFilters.destination_id ||
        updatedFilters.gathering_point_time_id
      ) {
        sectionsToExpand.push('gathering');
      }

      if (updatedFilters.roomNumber || updatedFilters.camp_id || updatedFilters.campStatus) {
        sectionsToExpand.push('accommodation');
      }

      if (updatedFilters.transport) {
        sectionsToExpand.push('transportation');
      }

      if (updatedFilters.healthStatus) {
        sectionsToExpand.push('health');
      }

      if (updatedFilters.supervisor) {
        sectionsToExpand.push('supervision');
      }

      if (
        updatedFilters.excel_action_status ||
        updatedFilters.source ||
        updatedFilters.import_history_id
      ) {
        sectionsToExpand.push('import');
      }

      if (updatedFilters.shippingManagement || updatedFilters.shipmentStatus) {
        sectionsToExpand.push('shipping');
      }

      setExpandedSections(sectionsToExpand);
    }
  }, [externalFilters, supervisorsList, citiesList, countriesList, campsList, bookingStatusesList]);

  const handleAccordionChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpandedSections((prev) =>
        isExpanded ? [...prev, panel] : prev.filter((item) => item !== panel)
      );
    };

  const handleReset = () => {
    setFilters({
      nationality: null,
      city: null,
      package: '',
      tag_id: '',
      gender: '',
      marriedLate: '',
      reservation_id: null,
      pilgrimType: '',
      muhrimStatus: '',
      pilgrimStatus: '',
      gathering_point_type_id: '',
      gathering_point_id: '',
      destination_id: '',
      gathering_point_time_id: '',
      roomNumber: '',
      camp_id: null,
      campStatus: '',
      transport: '',
      healthStatus: '',
      supervisor: null,
      excel_action_status: '',
      source: '',
      import_history_id: '',
      shippingManagement: '',
      shipmentStatus: '',
    });
    setSearchTerm('');
    setExpandedSections([]);
  };

  const handleApply = () => {
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
                  <Box
                    component="img"
                    src="/assets/images/pilgrims/search.svg"
                    alt="search"
                    sx={{ width: 20, height: 20 }}
                  />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Accordion Sections */}
        <Box sx={{ mt: 2 }}>
          {/* Personal Information */}
          {showSection.personal && (
            <FilterPersonalSection
              title={t('Label.personal_information')}
              expanded={
                expandedSections.includes('personal') || (!!searchValue && showSection.personal)
              }
              onChange={handleAccordionChange('personal')}
              filters={filters}
              setFilters={setFilters as any}
              countriesList={countriesList}
              citiesList={citiesList}
              packageOptions={packageOptions}
              tagOptions={tagOptions}
              bookingStatusesList={bookingStatusesList}
              pilgrimStatusOptions={pilgrimStatusOptions}
              pilgrimTypeOptions={pilgrimTypeOptions}
              muhrimStatusOptions={muhrimStatusOptions}
              genderToggleOptions={genderToggleOptions}
              departureToggleOptions={departureToggleOptions}
              sourceOptions={sourceOptions}
              getLocalizedName={getLocalizedName}
              labelColor={labelColor}
              t={t}
              initDataLoading={initDataLoading}
              searchValue={searchValue}
            />
          )}

          {/* Gathering Points */}
          {showSection.gathering && (
            <FilterGatheringSection
              title={t('Label.gathering_points')}
              expanded={
                expandedSections.includes('gathering') || (!!searchValue && showSection.gathering)
              }
              onChange={handleAccordionChange('gathering')}
              filters={filters}
              setFilters={setFilters as any}
              initData={initData}
              getLocalizedName={getLocalizedName}
              labelColor={labelColor}
              t={t}
              initDataLoading={initDataLoading}
              formatTime={formatTime}
              locale={locale}
            />
          )}

          {/* Accommodation */}
          {showSection.accommodation && (
            <FilterAccommodationSection
              title={t('Label.accommodation')}
              expanded={
                expandedSections.includes('accommodation') ||
                (!!searchValue && showSection.accommodation)
              }
              onChange={handleAccordionChange('accommodation')}
              filters={filters}
              setFilters={setFilters as any}
              campsList={campsList}
              getLocalizedName={getLocalizedName}
              labelColor={labelColor}
              t={t}
              initDataLoading={initDataLoading}
            />
          )}

          {/* Transportation */}
          {showSection.transportation && (
            <FilterTransportationSection
              title={t('Label.transportation_data')}
              expanded={
                expandedSections.includes('transportation') ||
                (!!searchValue && showSection.transportation)
              }
              onChange={handleAccordionChange('transportation')}
              filters={filters}
              setFilters={setFilters as any}
              transportOptions={transportOptions}
              t={t}
              initDataLoading={initDataLoading}
              searchValue={searchValue}
            />
          )}

          {/* Health Status */}
          {showSection.health && (
            <FilterHealthSection
              title={t('Label.health_status_data')}
              expanded={
                expandedSections.includes('health') || (!!searchValue && showSection.health)
              }
              onChange={handleAccordionChange('health')}
              filters={filters}
              setFilters={setFilters as any}
              labelColor={labelColor}
              t={t}
            />
          )}

          {/* Supervision */}
          {showSection.supervision && (
            <FilterSupervisionSection
              title={t('Label.supervision_organization')}
              expanded={
                expandedSections.includes('supervision') ||
                (!!searchValue && showSection.supervision)
              }
              onChange={handleAccordionChange('supervision')}
              filters={filters}
              setFilters={setFilters as any}
              supervisorsList={supervisorsList}
              getLocalizedName={getLocalizedName}
              labelColor={labelColor}
              t={t}
            />
          )}

          {/* Import File */}
          {showSection.import && (
            <FilterImportSection
              title={t('Label.import_file')}
              expanded={
                expandedSections.includes('import') || (!!searchValue && showSection.import)
              }
              onChange={handleAccordionChange('import')}
              filters={filters}
              setFilters={setFilters as any}
              excelActionsList={excelActionsList}
              importHistoryList={importHistoryList}
              labelColor={labelColor}
              t={t}
              initDataLoading={initDataLoading}
              locale={locale}
            />
          )}
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
            py: 0.75,
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
            py: 0.75,
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
            py: 0.75,
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
