'use client';

import { ReactNode, useMemo, useState, useEffect } from 'react';

import {
  Box,
  Button,
  Card,
  Container,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  Chip,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

import { useDisclosure } from 'src/hooks/useDisclosure';
import { useQueryString } from 'src/hooks/use-queryString';

import SharedTable from 'src/components/custom-shared-table/shared-table/SharedTable';
import useTable from 'src/components/custom-shared-table/shared-table/use-table';
import { headCellType, Action } from 'src/components/custom-shared-table/shared-table/types';
import TableSkeleton from 'src/components/custom-shared-table/shared-table/table-skeleton';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import Image from 'next/image';

import { paths } from 'src/routes/paths';
import { useFetchPackages, useDeletePackage } from 'src/services/queries/packages';
import { PackageItem } from 'src/services/api/packages';
import { useSnackbar } from 'notistack';
import { ConfirmDialog } from 'src/components/custom-dialog';
import AddEditDialog from './AddPackageDialog';

// ----------------------------------------------------------------------

export default function PackagesView() {
  const t = useTranslations('Settings');
  const locale = useLocale();
  const theme = useTheme();
  const table = useTable();
  const deleteDialog = useDisclosure();
  const addDialog = useDisclosure();
  const editDialog = useDisclosure();
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { createQueryString } = useQueryString();
  const { enqueueSnackbar } = useSnackbar();
  const [packageToDelete, setPackageToDelete] = useState<PackageItem | null>(null);
  const [editingPackage, setEditingPackage] = useState<PackageItem | null>(null);

  // Get pagination from URL params
  const currentPage = Number(searchParams.get('page')) || 1;
  const currentLimit = Number(searchParams.get('per_page')) || 15;

  // Get search from URL params
  const urlSearch = searchParams.get('search') || '';

  // Initialize search term from URL only once on mount
  useEffect(() => {
    if (urlSearch && !searchTerm) {
      setSearchTerm(urlSearch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only once on mount

  // Debounce search and update URL
  useEffect(() => {
    // Skip if search term matches URL param (to avoid infinite loop)
    if (searchTerm === urlSearch) {
      return;
    }

    const timeoutId = setTimeout(() => {
      createQueryString(
        [
          { name: 'search', value: searchTerm || undefined },
          { name: 'page', value: '1' }, // Reset to page 1 when search changes
        ],
        false
      );
    }, 500); // 500ms debounce

    return () => clearTimeout(timeoutId);
  }, [searchTerm, createQueryString, urlSearch]); // Removed searchParams, pathname, router from deps

  // Fetch packages data using React Query
  const {
    data: packagesData,
    isLoading: packagesLoading,
    isError: packagesError,
    refetch: refreshPackages,
  } = useFetchPackages({
    page: currentPage,
    per_page: currentLimit,
    search: urlSearch || undefined,
  });

  // Delete package mutation
  const deleteMutation = useDeletePackage();

  const tableHead: headCellType[] = [
    { id: 'package_number', label: 'Settings.Label.package_number' },
    { id: 'name_ar', label: 'Settings.Label.name_ar' },
    { id: 'name_en', label: 'Settings.Label.name_en' },
    { id: 'status', label: 'Settings.Label.status' },
  ];

  const handleDeleteClick = (row: PackageItem) => {
    setPackageToDelete(row);
    deleteDialog.onOpen();
  };

  const handleDeleteConfirm = async () => {
    if (!packageToDelete) return;

    try {
      const result = await deleteMutation.mutateAsync(packageToDelete.id);
      console.log('Delete result:', result);
      enqueueSnackbar(t('Message.delete_success'), { variant: 'success' });
      deleteDialog.onClose();
      setPackageToDelete(null);
    } catch (error) {
      console.error('Delete error:', error);
      enqueueSnackbar(t('Message.delete_error'), { variant: 'error' });
    }
  };

  const actions: Action<PackageItem>[] = [
    {
      label: t('Label.edit'),
      icon: '/assets/icons/table/edit.svg',
      onClick: (row) => {
        setEditingPackage(row);
        editDialog.onOpen();
      },
    },
    {
      label: t('Label.delete'),
      icon: '/assets/icons/table/delete.svg',
      onClick: handleDeleteClick,
    },
  ];

  const customRender: Partial<
    Record<keyof PackageItem | 'name_ar' | 'name_en', (row: PackageItem) => ReactNode>
  > = {
    package_number: (row: PackageItem) => (
      <Typography variant="body2" sx={{ fontSize: 13 }}>
        {row.package_number || row.id}
      </Typography>
    ),
    name_ar: (row: PackageItem) => (
      <Typography variant="body2" sx={{ fontSize: 13 }}>
        {row.name?.ar || row.local_name || t('Label.not_available')}
      </Typography>
    ),
    name_en: (row: PackageItem) => (
      <Typography variant="body2" sx={{ fontSize: 13 }}>
        {row.name?.en || row.local_name || t('Label.not_available')}
      </Typography>
    ),
    status: (row) => {
      const isActive = row.status === true;
      return (
        <Chip
          label={isActive ? t('Label.active') : t('Label.inactive')}
          sx={{
            bgcolor: isActive ? '#E8F5E9' : '#FFEBEE',
            color: isActive ? '#2E7D32' : '#C62828',
            fontSize: 12,
            fontWeight: 600,
            height: 24,
            '& .MuiChip-label': {
              px: 1.5,
            },
            '&:hover': {
              bgcolor: isActive ? '#E8F5E9' : '#FFEBEE',
            },
          }}
        />
      );
    },
  };

  const packages = useMemo(() => {
    return packagesData?.data || [];
  }, [packagesData]);

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        <Stack spacing={2} sx={{ mb: 4 }}>
          <CustomBreadcrumbs
            links={[
              {
                name: t('Label.breadcrumb_home'),
                href: paths.dashboard.root,
              },
              {
                name: t('title'),
                href: paths.dashboard.settings.root,
              },
              { name: t('tiles.packages.title') },
            ]}
          />

          <Stack spacing={0.5}>
            <Typography variant="h3">{t('tiles.packages.title')}</Typography>
            <Typography variant="body2" color="text.secondary">
              {t('tiles.packages.description')}
            </Typography>
          </Stack>
        </Stack>

        <Card sx={{ mt: 4, borderRadius: 2, p: 3 }}>
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
              spacing={1.25}
              alignItems="center"
              sx={{ width: { xs: '100%', md: 'auto' } }}
            >
              <TextField
                placeholder={t('Label.search_by_package_name')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{
                  flex: 1,
                  minWidth: { xs: '100%', md: 200 },
                  maxWidth: 350,
                  '& .MuiOutlinedInput-root': {
                    height: 44,
                    borderRadius: 1,
                    bgcolor: '#fff',
                  },
                }}
                slotProps={{
                  input: {
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
                  },
                }}
              />
            </Stack>
            <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap" rowGap={1.5}>
              <Button
                variant="contained"
                color="primary"
                onClick={addDialog.onOpen}
                sx={{
                  height: 44,
                  px: 4,
                  borderRadius: 1,
                  fontWeight: 500,
                  fontSize: 14,
                }}
              >
                {t('Button.add_package')}
              </Button>
            </Stack>
          </Stack>

          {packagesError ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 10 }}>
              <Typography variant="body1" color="error">
                {t('Message.error_loading_packages')}
              </Typography>
            </Box>
          ) : packagesLoading ? (
            <TableSkeleton
              numberOfRows={currentLimit || 15}
              tableHead={tableHead}
              enableSelection={false}
              showOrder={true}
              showActions={!!actions && actions.length > 0}
            />
          ) : (
            <SharedTable<PackageItem>
              tableHead={tableHead}
              data={packages}
              count={packagesData?.meta?.total || 0}
              actions={actions}
              customRender={customRender}
              disablePagination={false}
              order={true}
              enableSelection={false}
              table={table}
            />
          )}
        </Card>
      </Box>

      <AddEditDialog open={addDialog.open} onClose={addDialog.onClose} />

      <AddEditDialog
        open={editDialog.open}
        onClose={() => {
          setEditingPackage(null);
          editDialog.onClose();
        }}
        isEditMode
        packageData={editingPackage}
      />

      <ConfirmDialog
        open={deleteDialog.open}
        onClose={deleteDialog.onClose}
        title={t('Dialog.delete_package')}
        content={t('Dialog.delete_package_confirm', {
          name: packageToDelete?.name?.ar || packageToDelete?.local_name || '',
        })}
        buttonTitle={t('Button.delete')}
        buttonColor="error"
        handleConfirmDelete={handleDeleteConfirm}
        loading={deleteMutation.isPending}
      />
    </Container>
  );
}
