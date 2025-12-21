/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';

import { Stack, Button } from '@mui/material';

import { useQueryString } from 'src/hooks/use-queryString';

import Scrollbar from '../scrollbar';

export function LabelledFilters({
  filters,
  name = 'filter',
  enableDeselect,
  defaultValue,
}: {
  filters: { name_ar: string; name_en: string; id: string }[];
  name?: string;
  enableDeselect?: boolean;
  defaultValue?: any;
}) {
  const locale = useLocale();
  const t = useTranslations();
  const { createQueryString } = useQueryString();
  const searchParams = useSearchParams();
  const currentFilter = searchParams.get('filter') || 'all';
  useEffect(() => {
    createQueryString(name, currentFilter);
  }, []);
  const modifiedFilters = useMemo(() => {
    const allFilter = [{ name_ar: 'الكل', name_en: 'All', id: 'all' }];
    return allFilter.concat(filters);
  }, [filters]);
  return (
    <Scrollbar>
      <Stack direction="row" spacing={1} width="fit-content" py={0.25}>
        {modifiedFilters.map((item) => (
          <Button
            variant={currentFilter === item.id ? 'contained' : 'outlined'}
            color={currentFilter === item.id ? 'primary' : undefined}
            key={item.id}
            onClick={() => {
              if (currentFilter === item.id) {
                if (enableDeselect) {
                  createQueryString(name, undefined);
                }
              } else {
                createQueryString(name, item.id);
              }
            }}
            sx={{ whiteSpace: 'nowrap' }}
            size="small"
          >
            {locale === 'ar' ? item.name_ar : item.name_en}
          </Button>
        ))}
      </Stack>
    </Scrollbar>
  );
}
