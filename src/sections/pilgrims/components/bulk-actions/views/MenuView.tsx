'use client';

import { Box, Button, Stack } from '@mui/material';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { BulkActionOption, DialogView } from '../shared/types';

interface MenuViewProps {
  onClose: () => void;
  onOptionSelect: (view: DialogView) => void;
}

export default function MenuView({ onClose, onOptionSelect }: MenuViewProps) {
  const t = useTranslations();

  const options: BulkActionOption[] = [
    {
      key: 'sms',
      label: t('Label.send_emergency_message'),
      icon: '/assets/images/pilgrims/bulk-action/sms.svg',
    },
    {
      key: 'tags',
      label: t('Label.tags'),
      icon: '/assets/images/pilgrims/bulk-action/tags.svg',
    },
    {
      key: 'accommodation',
      label: t('Label.accommodation_needs_in_rituals'),
      icon: '/assets/images/pilgrims/bulk-action/accommodation.svg',
    },
    {
      key: 'transportation',
      label: t('Label.transportation_vehicles'),
      icon: '/assets/images/pilgrims/bulk-action/transport.svg',
    },
    {
      key: 'camp',
      label: t('Label.camp'),
      icon: '/assets/images/pilgrims/bulk-action/tents.svg',
    },
    {
      key: 'gathering',
      label: t('Label.gathering_points'),
      icon: '/assets/images/pilgrims/bulk-action/location.svg',
    },
    {
      key: 'supervisors',
      label: t('Label.link_supervisors'),
      icon: '/assets/images/pilgrims/bulk-action/link.svg',
    },
    {
      key: 'arrival',
      label: t('Label.arrival_time'),
      icon: '/assets/images/pilgrims/bulk-action/time.svg',
    },
    {
      key: 'shipping',
      label: t('Label.shipping_management'),
      icon: '/assets/images/pilgrims/bulk-action/shipping.svg',
    },
    {
      key: 'receipt',
      label: t('Label.send_receipt_notification'),
      icon: '/assets/images/pilgrims/bulk-action/receive.svg',
    },
  ];

  return (
    <Stack spacing={1.5} sx={{ p: 0.5 }}>
      {options.map((option) => (
        <Button
          key={option.key}
          fullWidth
          variant="outlined"
          onClick={() => onOptionSelect(option.key)}
          sx={{
            justifyContent: 'start',
            bgcolor: '#fff',
            borderColor: '#e5e7eb',
            color: '#1f2937',
            borderRadius: 1,
            py: 0.5,
            fontSize: 15,
            fontWeight: 500,
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
  );
}
