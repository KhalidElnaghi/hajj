'use client';

import { useState, useEffect, useMemo } from 'react';
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
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useFetchPilgrimInitData } from 'src/services/queries/pilgrims';
import FilterDropdown from './filter-dialog/FilterDropdown';
import FilterToggleGroup from './filter-dialog/FilterToggleGroup';
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
} from './filter-dialog/utils';

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
  const t = useTranslations('Pilgrims');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  // Fetch init data for dropdowns
  const { data: initData, isLoading: initDataLoading } = useFetchPilgrimInitData();

  // Transform API data to dropdown options
  const packageOptions = useMemo(
    () => transformPackagesToOptions(initData?.data?.packages),
    [initData?.data?.packages]
  );

  const cityOptions = useMemo(
    () => transformCitiesToOptions(initData?.data?.cities),
    [initData?.data?.cities]
  );

  const nationalityOptions = useMemo(
    () => transformCountriesToOptions(initData?.data?.countries),
    [initData?.data?.countries]
  );

  const transportOptions = useMemo(
    () => transformTransportsToOptions(initData?.data?.transports),
    [initData?.data?.transports]
  );

  const pilgrimTypeOptions = useMemo(
    () => transformPilgrimTypesToOptions(initData?.data?.pilgrimTypes),
    [initData?.data?.pilgrimTypes]
  );

  const muhrimStatusOptions = useMemo(
    () => transformSimpleToDropdownOptions(initData?.data?.muhrimStatuses),
    [initData?.data?.muhrimStatuses]
  );

  const pilgrimStatusOptions = useMemo(
    () => transformSimpleToDropdownOptions(initData?.data?.pilgrimStatuses),
    [initData?.data?.pilgrimStatuses]
  );

  const sourceOptions = useMemo(
    () => transformSimpleToDropdownOptions(initData?.data?.sources),
    [initData?.data?.sources]
  );

  const genderToggleOptions = useMemo(
    () => transformSimpleToToggleOptions(initData?.data?.genders),
    [initData?.data?.genders]
  );

  const departureToggleOptions = useMemo(
    () => transformSimpleToToggleOptions(initData?.data?.departureStatuses),
    [initData?.data?.departureStatuses]
  );

  const tagOptions = useMemo(
    () => transformTagsToOptions(initData?.data?.tags),
    [initData?.data?.tags]
  );

  const employeeOptions = useMemo(
    () => transformEmployeesToOptions(initData?.data?.employees),
    [initData?.data?.employees]
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
    gatheringPointType: '',
    gatheringPoint: '',
    destination: '',
    gatheringDate: null as any,

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
    importFile: '',
    source: '',

    // Shipping Operations
    shippingManagement: '',
    shipmentStatus: '',
  });

  // Sync with external filters when they change
  useEffect(() => {
    if (externalFilters) {
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
        gatheringPointType: externalFilters.gatheringPointType || '',
        gatheringPoint: externalFilters.gatheringPoint || '',
        destination: externalFilters.destination || '',
        gatheringDate: externalFilters.gatheringDate || null,
        roomNumber: externalFilters.roomNumber || '',
        camp_id: campValue,
        campStatus: externalFilters.campStatus || '',
        transport: externalFilters.transport || '',
        healthStatus: externalFilters.healthStatus || '',
        supervisor: supervisorValue,
        importFile: externalFilters.importFile || '',
        source: externalFilters.source || '',
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
        updatedFilters.gatheringPointType ||
        updatedFilters.gatheringPoint ||
        updatedFilters.destination
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

      if (updatedFilters.importFile || updatedFilters.source) {
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
      gatheringPointType: '',
      gatheringPoint: '',
      destination: '',
      gatheringDate: null,
      roomNumber: '',
      camp_id: null,
      campStatus: '',
      transport: '',
      healthStatus: '',
      supervisor: null,
      importFile: '',
      source: '',
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
            <Accordion
              expanded={
                expandedSections.includes('personal') || (!!searchValue && showSection.personal)
              }
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
                  '& .MuiAccordionSummary-content.Mui-expanded': { my: 1.5, mx: 3 },
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
                          color: labelColor('Label.nationality'),
                          fontSize: 16,
                          fontWeight: 400,
                          lineHeight: '22px',
                          textTransform: 'capitalize',
                        }}
                      >
                        {t('Label.nationality')}
                      </Typography>
                      <Autocomplete
                        value={filters.nationality || null}
                        onChange={(event, newValue) => {
                          setFilters({ ...filters, nationality: newValue as CountryOption | null });
                        }}
                        options={countriesList}
                        getOptionLabel={(option) => option?.country?.name?.ar || ''}
                        getOptionKey={(option) => option?.country?.id}
                        isOptionEqualToValue={(option, value) =>
                          option?.country?.id === value?.country?.id
                        }
                        disabled={initDataLoading}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder={t('Label.all')}
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                borderRadius: 1,
                              },
                            }}
                          />
                        )}
                        renderOption={(props, option) => {
                          const { key, ...otherProps } = props as any;
                          return (
                            <li key={option?.country?.id} {...otherProps}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                {option?.country?.flag?.svg && (
                                  <Image
                                    src={option.country.flag.svg}
                                    alt={option?.country?.name?.ar || 'Flag'}
                                    width={20}
                                    height={15}
                                    style={{ borderRadius: 2 }}
                                  />
                                )}
                                <Typography variant="body2">
                                  {option?.country?.name?.ar || ''}
                                </Typography>
                              </Box>
                            </li>
                          );
                        }}
                      />
                    </FormControl>

                    <FormControl fullWidth>
                      <Typography
                        sx={{
                          mb: 1,
                          color: labelColor('Label.city'),
                          fontSize: 16,
                          fontWeight: 400,
                          lineHeight: '22px',
                          textTransform: 'capitalize',
                        }}
                      >
                        {t('Label.city')}
                      </Typography>
                      <Autocomplete
                        value={filters.city || null}
                        onChange={(event, newValue) => {
                          setFilters({ ...filters, city: newValue as CityOption | null });
                        }}
                        options={citiesList}
                        getOptionLabel={(option) => option?.city?.name?.ar || ''}
                        getOptionKey={(option) => option?.city_id}
                        isOptionEqualToValue={(option, value) => option?.city_id === value?.city_id}
                        disabled={initDataLoading}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder={t('Label.all')}
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                borderRadius: 1,
                              },
                            }}
                          />
                        )}
                        renderOption={(props, option) => {
                          const { key, ...otherProps } = props as any;
                          return (
                            <li key={option?.city_id} {...otherProps}>
                              {option?.city?.name?.ar || ''}
                            </li>
                          );
                        }}
                      />
                    </FormControl>
                  </Stack>

                  <Stack direction="row" spacing={2}>
                    <FilterDropdown
                      label={t('Label.package_name')}
                      value={filters.package}
                      onChange={(value: string) => setFilters({ ...filters, package: value })}
                      options={packageOptions}
                      allLabel={t('Label.all')}
                      disabled={initDataLoading}
                      highlighted={
                        !!(
                          searchValue &&
                          t('Label.package_name')?.toLowerCase().includes(searchValue)
                        )
                      }
                    />
                    <FilterDropdown
                      label={t('Label.tags')}
                      value={filters.tag_id}
                      onChange={(value: string) => setFilters({ ...filters, tag_id: value })}
                      options={tagOptions}
                      allLabel={t('Label.all')}
                      disabled={initDataLoading}
                      highlighted={
                        !!(searchValue && t('Label.tags')?.toLowerCase().includes(searchValue))
                      }
                    />
                  </Stack>
                  <Stack direction="row" spacing={2}>
                    <FormControl fullWidth>
                      <Typography
                        sx={{
                          mb: 1,
                          color: labelColor('Label.booking_status'),
                          fontSize: 16,
                          fontWeight: 400,
                          lineHeight: '22px',
                          textTransform: 'capitalize',
                        }}
                      >
                        {t('Label.booking_status')}
                      </Typography>
                      <Autocomplete
                        value={filters.reservation_id || null}
                        onChange={(event, newValue) => {
                          setFilters({
                            ...filters,
                            reservation_id: newValue as BookingStatusOption | null,
                          });
                        }}
                        options={bookingStatusesList}
                        getOptionLabel={(option) => option?.name?.ar || ''}
                        getOptionKey={(option) => option?.id}
                        isOptionEqualToValue={(option, value) => option?.id === value?.id}
                        disabled={initDataLoading}
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
                        renderOption={(props, option) => {
                          const { key, ...otherProps } = props as any;
                          return (
                            <li key={option?.id} {...otherProps}>
                              {option?.name?.ar || ''}
                            </li>
                          );
                        }}
                      />
                    </FormControl>
                    <FilterDropdown
                      label={t('Label.pilgrim_status')}
                      value={filters.pilgrimStatus}
                      onChange={(value: string) => setFilters({ ...filters, pilgrimStatus: value })}
                      options={pilgrimStatusOptions}
                      allLabel={t('Label.all')}
                      disabled={initDataLoading}
                      highlighted={
                        !!(
                          searchValue &&
                          t('Label.pilgrim_status')?.toLowerCase().includes(searchValue)
                        )
                      }
                    />
                  </Stack>
                  <Stack direction="row" spacing={2}>
                    <FilterDropdown
                      label={t('Label.pilgrim_type')}
                      value={filters.pilgrimType}
                      onChange={(value: string) => setFilters({ ...filters, pilgrimType: value })}
                      options={pilgrimTypeOptions}
                      allLabel={t('Label.all')}
                      disabled={initDataLoading}
                      highlighted={
                        !!(
                          searchValue &&
                          t('Label.pilgrim_type')?.toLowerCase().includes(searchValue)
                        )
                      }
                    />

                    <FilterDropdown
                      label={t('Label.muhrim_status')}
                      value={filters.muhrimStatus}
                      onChange={(value: string) => setFilters({ ...filters, muhrimStatus: value })}
                      options={muhrimStatusOptions}
                      allLabel={t('Label.all')}
                      disabled={initDataLoading}
                      highlighted={
                        !!(
                          searchValue &&
                          t('Label.muhrim_status')?.toLowerCase().includes(searchValue)
                        )
                      }
                    />
                  </Stack>
                  <Stack direction="row" spacing={2}>
                    <FilterToggleGroup
                      label={t('Label.gender')}
                      value={filters.gender}
                      onChange={(value: string) => setFilters({ ...filters, gender: value })}
                      options={genderToggleOptions}
                      disabled={initDataLoading}
                      highlighted={
                        !!(searchValue && t('Label.gender')?.toLowerCase().includes(searchValue))
                      }
                    />

                    <FilterToggleGroup
                      label={t('Label.early_late')}
                      value={filters.marriedLate}
                      onChange={(value: string) => setFilters({ ...filters, marriedLate: value })}
                      options={departureToggleOptions}
                      disabled={initDataLoading}
                      highlighted={
                        !!(
                          searchValue && t('Label.early_late')?.toLowerCase().includes(searchValue)
                        )
                      }
                    />
                  </Stack>
                </Stack>
              </AccordionDetails>
            </Accordion>
          )}

          {/* Assembly Points */}
          {showSection.gathering && (
            <Accordion
              expanded={
                expandedSections.includes('gathering') || (!!searchValue && showSection.gathering)
              }
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
                  '& .MuiAccordionSummary-content.Mui-expanded': { my: 1.5, mx: 3 },
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
                          color: labelColor('Label.gathering_point_type'),
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
                          color: labelColor('Label.gathering_point'),
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
                  <Stack direction="row" spacing={2}>
                    <FormControl fullWidth>
                      <Typography
                        sx={{
                          mb: 1,
                          color: labelColor('Label.destination'),
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

                    <FormControl fullWidth>
                      <Typography
                        sx={{
                          mb: 1,
                          color: labelColor('Label.gathering_date'),
                          fontSize: 16,
                          fontWeight: 400,
                          lineHeight: '22px',
                          textTransform: 'capitalize',
                        }}
                      >
                        {t('Label.gathering_date')}
                      </Typography>
                      <DatePicker
                        value={filters.gatheringDate}
                        onChange={(newValue) => setFilters({ ...filters, gatheringDate: newValue })}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            placeholder: t('Label.select'),
                          },
                        }}
                      />
                    </FormControl>
                  </Stack>
                </Stack>
              </AccordionDetails>
            </Accordion>
          )}

          {/* Accommodation */}
          {showSection.accommodation && (
            <Accordion
              expanded={
                expandedSections.includes('accommodation') ||
                (!!searchValue && showSection.accommodation)
              }
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
                  '& .MuiAccordionSummary-content.Mui-expanded': { my: 1.5, mx: 3 },
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
                          color: labelColor('Label.camp'),
                          fontSize: 16,
                          fontWeight: 400,
                          lineHeight: '22px',
                          textTransform: 'capitalize',
                        }}
                      >
                        {t('Label.camp')}
                      </Typography>
                      <Autocomplete
                        value={filters.camp_id || null}
                        onChange={(event, newValue) => {
                          setFilters({ ...filters, camp_id: newValue as CampOption | null });
                        }}
                        options={campsList}
                        getOptionLabel={(option) => option?.name?.ar || ''}
                        getOptionKey={(option) => option?.id}
                        isOptionEqualToValue={(option, value) => option?.id === value?.id}
                        disabled={initDataLoading}
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
                        renderOption={(props, option) => {
                          const { key, ...otherProps } = props as any;
                          return (
                            <li key={option?.id} {...otherProps}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="body2">{option?.name?.ar || ''}</Typography>
                                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                  ({option?.camp_no})
                                </Typography>
                              </Box>
                            </li>
                          );
                        }}
                      />
                    </FormControl>
                  </Stack>
                </Stack>
              </AccordionDetails>
            </Accordion>
          )}

          {/* Transportation */}
          {showSection.transportation && (
            <Accordion
              expanded={
                expandedSections.includes('transportation') ||
                (!!searchValue && showSection.transportation)
              }
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
                  '& .MuiAccordionSummary-content.Mui-expanded': { my: 1.5, mx: 3 },
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
                <FilterDropdown
                  label={t('Label.transport')}
                  value={filters.transport}
                  onChange={(value: string) => setFilters({ ...filters, transport: value })}
                  options={transportOptions}
                  allLabel={t('Label.all')}
                  disabled={initDataLoading}
                  highlighted={
                    !!(searchValue && t('Label.transport')?.toLowerCase().includes(searchValue))
                  }
                />
              </AccordionDetails>
            </Accordion>
          )}

          {/* Health Status */}
          {showSection.health && (
            <Accordion
              expanded={
                expandedSections.includes('health') || (!!searchValue && showSection.health)
              }
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
                  '& .MuiAccordionSummary-content.Mui-expanded': { my: 1.5, mx: 3 },
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
                      color: labelColor('Label.general_health_status'),
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
          )}

          {/* Supervision */}
          {showSection.supervision && (
            <Accordion
              expanded={
                expandedSections.includes('supervision') ||
                (!!searchValue && showSection.supervision)
              }
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
                  '& .MuiAccordionSummary-content.Mui-expanded': { my: 1.5, mx: 3 },
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
                  <FormControl fullWidth>
                    <Typography
                      sx={{
                        mb: 1,
                        color: labelColor('Label.supervisors'),
                        fontSize: 16,
                        fontWeight: 400,
                        lineHeight: '22px',
                        textTransform: 'capitalize',
                      }}
                    >
                      {t('Label.supervisors')}
                    </Typography>
                    <Autocomplete
                      value={filters.supervisor || null}
                      onChange={(event, newValue) => {
                        setFilters({ ...filters, supervisor: newValue as EmployeeOption | null });
                      }}
                      options={supervisorsList}
                      getOptionLabel={(option) => option?.name?.ar || ''}
                      getOptionKey={(option) => option?.id}
                      isOptionEqualToValue={(option, value) => option?.id === value?.id}
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
                      renderOption={(props, option) => {
                        const { key, ...otherProps } = props as any;
                        return (
                          <li key={option?.id} {...otherProps}>
                            {option?.name?.ar || ''}
                          </li>
                        );
                      }}
                    />
                  </FormControl>
                </Stack>
              </AccordionDetails>
            </Accordion>
          )}

          {/* Import File */}
          {showSection.import && (
            <Accordion
              expanded={
                expandedSections.includes('import') || (!!searchValue && showSection.import)
              }
              onChange={handleAccordionChange('import')}
              sx={{
                boxShadow: 'none !important',
                border: 'none',
                '&:before': { display: 'none' },
                mb: 0,
              }}
            >
              <AccordionSummary
                expandIcon={
                  expandedSections.includes('import') ? (
                    <Iconify icon="mdi:chevron-down" width={20} color="#64748B" />
                  ) : (
                    <Iconify icon="mdi:plus" width={20} color="#64748B" />
                  )
                }
                sx={{
                  px: 0,
                  minHeight: 56,
                  '& .MuiAccordionSummary-content': { my: 1.5, mx: 3 },
                  '& .MuiAccordionSummary-content.Mui-expanded': { my: 1.5, mx: 3 },
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
                  {t('Label.import_file')}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 3, pt: 3, pb: 3, bgcolor: 'transparent' }}>
                <Stack spacing={2.5}>
                  <Stack direction="row" spacing={2}>
                    <FormControl fullWidth>
                      <Typography
                        sx={{
                          mb: 1,
                          color: labelColor('Label.import_file'),
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

                    <FilterDropdown
                      label={t('Label.source')}
                      value={filters.source}
                      onChange={(value: string) => setFilters({ ...filters, source: value })}
                      options={sourceOptions}
                      allLabel={t('Label.all')}
                      disabled={initDataLoading}
                      highlighted={
                        !!(searchValue && t('Label.source')?.toLowerCase().includes(searchValue))
                      }
                    />
                  </Stack>
                </Stack>
              </AccordionDetails>
            </Accordion>
          )}

          {/* Shipping Operations */}
          {/* {showSection.shipping && (
            <Accordion
              expanded={
                expandedSections.includes('shipping') || (!!searchValue && showSection.shipping)
              }
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
                  '& .MuiAccordionSummary-content.Mui-expanded': { my: 1.5, mx: 3 },
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
                          color: labelColor('Label.shipping_tool'),
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
                          color: labelColor('Label.shipment_status'),
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
          )} */}
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
