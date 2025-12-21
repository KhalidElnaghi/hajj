'use client';

import { ReactNode } from 'react';

import { Box, Card, Container, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';

import SharedTable from 'src/components/custom-shared-table/shared-table/SharedTable';
import { headCellType, Action } from 'src/components/custom-shared-table/shared-table/types';

// ----------------------------------------------------------------------

type Pilgrim = {
  id: number;
  name: string;
  nationality: string;
  phone: string;
  gender: string;
  registrationDate: string;
  status: string;
};

// Dummy data for pilgrims
const dummyPilgrims: Pilgrim[] = [
  {
    id: 1,
    name: 'Ahmed Mohammed Ali',
    nationality: 'Saudi Arabia',
    phone: '+966501234567',
    gender: 'Male',
    registrationDate: '2024-01-15',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Fatima Hassan',
    nationality: 'Egypt',
    phone: '+201012345678',
    gender: 'Female',
    registrationDate: '2024-01-20',
    status: 'Active',
  },
  {
    id: 3,
    name: 'Omar Abdullah',
    nationality: 'Jordan',
    phone: '+962791234567',
    gender: 'Male',
    registrationDate: '2024-02-05',
    status: 'Pending',
  },
  {
    id: 4,
    name: 'Aisha Ibrahim',
    nationality: 'Morocco',
    phone: '+212661234567',
    gender: 'Female',
    registrationDate: '2024-02-10',
    status: 'Active',
  },
  {
    id: 5,
    name: 'Yusuf Khalil',
    nationality: 'UAE',
    phone: '+971501234567',
    gender: 'Male',
    registrationDate: '2024-02-15',
    status: 'Active',
  },
  {
    id: 6,
    name: 'Maryam Saleh',
    nationality: 'Kuwait',
    phone: '+96550123456',
    gender: 'Female',
    registrationDate: '2024-03-01',
    status: 'Inactive',
  },
  {
    id: 7,
    name: 'Hassan Mahmoud',
    nationality: 'Pakistan',
    phone: '+923001234567',
    gender: 'Male',
    registrationDate: '2024-03-10',
    status: 'Active',
  },
  {
    id: 8,
    name: 'Zahra Ahmed',
    nationality: 'Indonesia',
    phone: '+628123456789',
    gender: 'Female',
    registrationDate: '2024-03-15',
    status: 'Pending',
  },
  {
    id: 9,
    name: 'Zahra Ahmed',
    nationality: 'Indonesia',
    phone: '+628123456789',
    gender: 'Female',
    registrationDate: '2024-03-15',
    status: 'Pending',
  },
  {
    id: 10,
    name: 'Zahra Ahmed',
    nationality: 'Indonesia',
    phone: '+628123456789',
    gender: 'Female',
    registrationDate: '2024-03-15',
    status: 'Pending',
  },
];

// ----------------------------------------------------------------------

export default function PilgrimsView() {
  const t = useTranslations();

  const tableHead: headCellType[] = [
    { id: 'name', label: 'Label.name', width: 200 },
    { id: 'nationality', label: 'Label.nationality', width: 150 },
    { id: 'phone', label: 'Label.phone_number', width: 150 },
    { id: 'gender', label: 'Label.gender', width: 100 },
    { id: 'registrationDate', label: 'Label.registration_date', width: 150 },
    { id: 'status', label: 'Label.status', width: 100 },
  ];

  const actions: Action<Pilgrim>[] = [
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

  const statusColorMap: Record<string, { bg: string; color: string }> = {
    Active: { bg: '#E6F4EA', color: '#2E7D32' },
    Pending: { bg: '#FFF3E0', color: '#EF6C00' },
    Inactive: { bg: '#FFE6E6', color: '#D32F2F' },
  };

  const customRender: Partial<Record<keyof Pilgrim, (row: Pilgrim) => ReactNode>> = {
    status: (row) => {
      const palette = statusColorMap[row.status] || statusColorMap.Pending;
      return (
        <Box
          component="span"
          sx={{
            px: 1.5,
            py: 0.5,
            borderRadius: 1,
            bgcolor: palette.bg,
            color: palette.color,
            fontSize: 12,
            fontWeight: 600,
            display: 'inline-block',
          }}
        >
          {t(`Label.${row.status}`)}
        </Box>
      );
    },
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        <Typography variant="h3" gutterBottom>
          {t('Title.pilgrims_management')}
        </Typography>

        <Card sx={{ mt: 4, borderRadius: 0 }}>
          <SharedTable<Pilgrim>
            tableHead={tableHead}
            data={dummyPilgrims}
            count={dummyPilgrims.length}
            actions={actions}
            customRender={customRender}
            disablePagination={false}
          />
        </Card>
      </Box>
    </Container>
  );
}
