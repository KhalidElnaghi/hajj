'use client';

import { FormControl, MenuItem, Select, Stack, Typography } from '@mui/material';
import type { Dispatch, SetStateAction, SyntheticEvent } from 'react';

import FilterSection from '../components/FilterSection';

type FiltersShape = {
  excel_action_status: string;
  import_history_id: string | number;
  [key: string]: any;
};

interface ImportSectionProps {
  title: string;
  expanded: boolean;
  onChange: (event: SyntheticEvent, isExpanded: boolean) => void;
  filters: FiltersShape;
  setFilters: Dispatch<SetStateAction<FiltersShape>>;
  excelActionsList: any[];
  importHistoryList: any[];
  labelColor: (key: string) => string;
  t: (key: string) => string;
  initDataLoading: boolean;
  locale: string;
}

export default function FilterImportSection({
  title,
  expanded,
  onChange,
  filters,
  setFilters,
  excelActionsList,
  importHistoryList,
  labelColor,
  t,
  initDataLoading,
  locale,
}: ImportSectionProps) {
  return (
    <FilterSection title={title} expanded={expanded} onChange={onChange}>
      <Stack spacing={2.5}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: '100%' }}>
          <FormControl fullWidth>
            <Typography
              sx={{
                mb: 1,
                color: labelColor('Label.excel_action_status'),
                fontSize: 16,
                fontWeight: 400,
                lineHeight: '22px',
                textTransform: 'capitalize',
              }}
            >
              {t('Label.excel_action_status')}
            </Typography>
            <Select
              value={filters.excel_action_status}
              onChange={(e) => setFilters((prev) => ({ ...prev, excel_action_status: e.target.value }))}
              displayEmpty
              disabled={initDataLoading}
              sx={{ borderRadius: 1 }}
            >
              <MenuItem value="">{t('Label.all')}</MenuItem>
              {excelActionsList?.map((action: any) => (
                <MenuItem key={action.value} value={action.value}>
                  {action.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <Typography
              sx={{
                mb: 1,
                color: labelColor('Label.import_history'),
                fontSize: 16,
                fontWeight: 400,
                lineHeight: '22px',
                textTransform: 'capitalize',
              }}
            >
              {t('Label.import_history')}
            </Typography>
            <Select
              value={filters.import_history_id}
              onChange={(e) => setFilters((prev) => ({ ...prev, import_history_id: e.target.value }))}
              displayEmpty
              disabled={initDataLoading}
              sx={{ borderRadius: 1 }}
            >
              <MenuItem value="">{t('Label.all')}</MenuItem>
              {importHistoryList?.map((history: any) => (
                <MenuItem key={history.id} value={history.id}>
                  <Stack sx={{ gap: 0.5 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {history.user?.name} - {history.source}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      {new Date(history.created_at).toLocaleDateString(locale, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </Typography>
                  </Stack>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </Stack>
    </FilterSection>
  );
}
