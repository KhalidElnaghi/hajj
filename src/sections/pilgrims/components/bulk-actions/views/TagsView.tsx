'use client';

import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { Box, Button, Chip, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useLocale, useTranslations } from 'next-intl';
import { useState, useMemo } from 'react';
import { useSnackbar } from 'notistack';

import { useFetchPilgrimInitData } from 'src/services/queries/pilgrims';
import { useBulkAssignTags } from 'src/services/mutations/pilgrims';

import { BulkActionViewProps } from '../shared/types';

interface TagOption {
  id: number;
  label: string;
  color?: string;
}

const filter = createFilterOptions<TagOption>();

export default function TagsView({
  onClose,
  selectedPilgrims,
  onClearSelection,
}: BulkActionViewProps) {
  const t = useTranslations('Pilgrims');
  const locale = useLocale();
  const { enqueueSnackbar } = useSnackbar();

  const { data: initDataResponse, isLoading: isInitLoading } = useFetchPilgrimInitData();
  const bulkAssignTagsMutation = useBulkAssignTags();

  const [selectedTags, setSelectedTags] = useState<TagOption[]>([]);

  const pilgrimIds = useMemo(
    () =>
      (selectedPilgrims ?? [])
        .map((pilgrim) => Number(pilgrim?.id))
        .filter((id) => Number.isFinite(id)),
    [selectedPilgrims]
  );

  const tagOptions = useMemo<TagOption[]>(() => {
    const tags = (initDataResponse?.data?.tags ?? []) as any[];

    return tags.reduce((acc: TagOption[], tag: any) => {
      const id = Number(tag?.id);
      if (!Number.isFinite(id)) return acc;

      const name = tag?.name;
      const label =
        locale === 'ar'
          ? typeof name === 'string'
            ? name
            : (name?.ar ?? name?.en ?? '')
          : typeof name === 'string'
            ? name
            : (name?.en ?? name?.ar ?? '');

      if (!label) return acc;

      acc.push({
        id,
        label,
        color: tag?.color,
      });

      return acc;
    }, []);
  }, [initDataResponse, locale]);

  const quickAccessTags = useMemo(() => tagOptions.slice(0, 6), [tagOptions]);

  const handleTagToggle = (tag: TagOption) => {
    setSelectedTags((prev) => {
      const exists = prev.find((t) => t.id === tag.id);
      if (exists) {
        return prev.filter((t) => t.id !== tag.id);
      }
      return [...prev, tag];
    });
  };

  const handleClearAll = () => {
    setSelectedTags([]);
  };

  const handleSave = async () => {
    if (!selectedTags.length || !pilgrimIds.length) return;

    try {
      await bulkAssignTagsMutation.mutateAsync({
        taggable_ids: pilgrimIds,
        tag_ids: selectedTags.map((tag) => tag.id),
        taggable_type: 'pilgrim',
      });

      enqueueSnackbar(t('Message.tags_assigned_successfully'), { variant: 'success' });
      handleClearAll();

      if (onClearSelection) {
        onClearSelection();
      }
      onClose();
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || error?.message || t('Message.error_assigning_tags');

      enqueueSnackbar(errorMessage, { variant: 'error' });
    }
  };

  const isSaveDisabled =
    !selectedTags.length || !pilgrimIds.length || bulkAssignTagsMutation.isPending;

  return (
    <Stack spacing={2.5} sx={{ p: 1 }}>
      {/* Section Header */}
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 700, fontSize: 16 }}>
          {t('Label.tags')}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5, fontSize: 13 }}>
          {t('Description.tags_description')}
        </Typography>
      </Box>

      {/* Autocomplete Search */}
      <Stack spacing={1}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: 14 }}>
          {t('Label.tags')}
        </Typography>
        <Autocomplete
          multiple
          filterSelectedOptions
          options={tagOptions}
          value={selectedTags}
          loading={isInitLoading}
          getOptionLabel={(option) => option.label}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          onChange={(_event, newValue) => setSelectedTags(newValue)}
          renderOption={(props, option) => {
            const { key, ...restProps } = props;
            const isSelected = selectedTags.some((tag) => tag.id === option.id);
            return (
              <li
                key={option.id}
                {...restProps}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                {option.color && (
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      bgcolor: option.color,
                    }}
                  />
                )}
                <Box component="span" sx={{ fontSize: 14, flex: 1 }}>
                  {option.label}
                </Box>
              </li>
            );
          }}
          renderTags={(tagValue, getTagProps) =>
            tagValue.map((option, index) => (
              <Chip
                {...getTagProps({ index })}
                key={option.id}
                label={option.label}
                sx={{
                  borderRadius: '16px',
                  '& .MuiChip-label': { fontSize: 13, px: 1, fontWeight: 600 },
                }}
              />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder={t('Placeholder.search_or_add_new_tag')}
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <>
                    <InputAdornment position="start">
                      <Box
                        component="img"
                        src="/assets/images/pilgrims/search.svg"
                        alt="search"
                        sx={{ width: 20, height: 20 }}
                      />
                    </InputAdornment>
                    {params.InputProps.startAdornment}
                  </>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1,
                  bgcolor: '#fafafa',
                },
              }}
            />
          )}
          sx={{
            '& .MuiOutlinedInput-root': {
              minHeight: 56,
            },
          }}
        />
      </Stack>

      {/* Quick Access Tags */}
      {quickAccessTags.length > 0 && (
        <Box>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1, fontSize: 12 }}>
            {t('Label.quick_access')}
          </Typography>
          <Stack direction="row" flexWrap="wrap" gap={1}>
            {quickAccessTags.map((tag) => {
              const isSelected = selectedTags.some((t) => t.id === tag.id);
              return (
                <Chip
                  key={tag.id}
                  label={tag.label}
                  onClick={() => handleTagToggle(tag)}
                  sx={{
                    fontSize: 13,
                    fontWeight: 500,
                    cursor: 'pointer',
                  }}
                />
              );
            })}
          </Stack>
        </Box>
      )}

      {/* Action Buttons */}
      <Stack direction="row" spacing={1.5} justifyContent="space-between">
        <Button
          variant="text"
          onClick={onClose}
          color="error"
          sx={{
            px: 3,
          }}
        >
          {t('Button.cancel')}
        </Button>

        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            color="error"
            onClick={handleClearAll}
            disabled={!selectedTags.length}
            sx={{
              px: 3,
            }}
          >
            {t('Button.clear_all')}
          </Button>
          <LoadingButton
            variant="contained"
            color="primary"
            onClick={handleSave}
            loading={bulkAssignTagsMutation.isPending}
            disabled={isSaveDisabled}
            sx={{
              px: 3,
            }}
          >
            {t('Button.save')}
          </LoadingButton>
        </Stack>
      </Stack>
    </Stack>
  );
}
