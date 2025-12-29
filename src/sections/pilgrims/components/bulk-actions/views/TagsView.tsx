'use client';

import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { Box, Button, Chip, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useState, useMemo } from 'react';

import { BulkActionViewProps } from '../shared/types';

interface TagOption {
  key: string;
  label: string;
  isNew?: boolean;
}

const filter = createFilterOptions<TagOption>();

export default function TagsView({
  onBack,
  onClose,
  selectedCount,
  onClearSelection,
}: BulkActionViewProps) {
  const t = useTranslations('Pilgrims');
  const [inputValue, setInputValue] = useState('');
  const [selectedTag, setSelectedTag] = useState<TagOption | null>(null);
  const [customTags, setCustomTags] = useState<TagOption[]>([]);

  // All available tags for the dropdown (more options)
  const allTags: TagOption[] = useMemo(
    () => [
      { key: 'near_bathroom', label: t('Label.tag_near_bathroom') },
      { key: 'tent_entrance', label: t('Label.tag_tent_entrance') },
      { key: 'tent_middle', label: t('Label.tag_tent_middle') },
      { key: 'near_restaurant', label: t('Label.tag_near_restaurant') },
      { key: 'fasil_entrance', label: t('Label.tag_fasil_entrance') },
      { key: 'near_medical_center', label: t('Label.tag_near_medical_center') },
      { key: 'wheelchair_accessible', label: t('Label.tag_wheelchair_accessible') },
      { key: 'elderly_priority', label: t('Label.tag_elderly_priority') },
      { key: 'family_zone', label: t('Label.tag_family_zone') },
      { key: 'quiet_area', label: t('Label.tag_quiet_area') },
      { key: 'near_exit', label: t('Label.tag_near_exit') },
      { key: 'vip_section', label: t('Label.tag_vip_section') },
      ...customTags,
    ],
    [t, customTags]
  );

  // Quick access tags shown as chips below (subset)
  const quickAccessTags: TagOption[] = useMemo(
    () => [
      { key: 'near_bathroom', label: t('Label.tag_near_bathroom') },
      { key: 'tent_entrance', label: t('Label.tag_tent_entrance') },
      { key: 'tent_middle', label: t('Label.tag_tent_middle') },
      { key: 'near_restaurant', label: t('Label.tag_near_restaurant') },
      { key: 'fasil_entrance', label: t('Label.tag_fasil_entrance') },
      { key: 'near_medical_center', label: t('Label.tag_near_medical_center') },
    ],
    [t]
  );

  // Check if input value exists in tags
  const isNewTag = useMemo(() => {
    if (!inputValue.trim()) return false;
    return !allTags.some((tag) => tag.label.toLowerCase() === inputValue.toLowerCase());
  }, [inputValue, allTags]);

  const handleTagSelect = (tag: TagOption) => {
    setSelectedTag((prev) => (prev?.key === tag.key ? null : tag));
  };

  const handleAddNewTag = () => {
    if (!inputValue.trim()) return;

    const newTag: TagOption = {
      key: `custom_${inputValue.toLowerCase().replace(/\s+/g, '_')}`,
      label: inputValue.trim(),
    };

    setCustomTags((prev) => [...prev, newTag]);
    setSelectedTag(newTag);
    setInputValue('');
  };

  const handleAutocompleteChange = (
    _event: React.SyntheticEvent,
    newValue: TagOption | string | null
  ) => {
    if (!newValue) {
      setSelectedTag(null);
      return;
    }

    let tagToSelect: TagOption;

    if (typeof newValue === 'string') {
      // User typed and pressed enter
      const existingTag = allTags.find((tag) => tag.label.toLowerCase() === newValue.toLowerCase());
      if (existingTag) {
        tagToSelect = existingTag;
      } else {
        tagToSelect = {
          key: `custom_${newValue.toLowerCase().replace(/\s+/g, '_')}`,
          label: newValue,
        };
        setCustomTags((prev) => [...prev, tagToSelect]);
      }
    } else if (newValue.isNew) {
      // User selected "Add: ..." option
      const cleanLabel = newValue.label.replace(/^Add: "(.+)"$/, '$1');
      tagToSelect = {
        key: `custom_${cleanLabel.toLowerCase().replace(/\s+/g, '_')}`,
        label: cleanLabel,
      };
      setCustomTags((prev) => [...prev, tagToSelect]);
    } else {
      tagToSelect = newValue;
    }

    setSelectedTag(tagToSelect);
    setInputValue('');
  };

  const handleClearSelection = () => {
    setSelectedTag(null);
  };

  const handleSave = () => {
    console.log('Saving tag:', selectedTag);
    if (onClearSelection) {
      onClearSelection();
    }
    onClose();
  };

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

      {/* Autocomplete Search with Add Button */}
      <Stack direction="row" spacing={1} alignItems="flex-start">
        <Autocomplete
          freeSolo
          selectOnFocus
          clearOnBlur={false}
          handleHomeEndKeys
          value={selectedTag}
          options={allTags}
          inputValue={inputValue}
          onInputChange={(_event, newInputValue) => setInputValue(newInputValue)}
          onChange={handleAutocompleteChange}
          getOptionLabel={(option) => {
            if (typeof option === 'string') return option;
            return option.label;
          }}
          isOptionEqualToValue={(option, value) => option.key === value.key}
          filterOptions={(options, params) => {
            const filtered = filter(options, params);

            const { inputValue: searchVal } = params;
            const isExisting = options.some(
              (option) => searchVal.toLowerCase() === option.label.toLowerCase()
            );

            if (searchVal !== '' && !isExisting) {
              filtered.push({
                key: `new_${searchVal}`,
                label: `Add: "${searchVal}"`,
                isNew: true,
              });
            }

            return filtered;
          }}
          renderOption={(props, option) => {
            const { key, ...restProps } = props;
            const isSelected = selectedTag?.key === option.key;
            return (
              <li
                key={option.key}
                {...restProps}
                style={{
                  backgroundColor: isSelected ? '#e6f0ff' : undefined,
                  color: option.isNew ? '#0d6efd' : undefined,
                  fontWeight: option.isNew ? 600 : 400,
                }}
              >
                {option.label}
                {isSelected && (
                  <Box
                    component="span"
                    sx={{ ml: 'auto', color: '#0d6efd', fontSize: 12, fontWeight: 500 }}
                  >
                    ✓
                  </Box>
                )}
              </li>
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder={t('Placeholder.search_or_add_new_tag')}
              InputProps={{
                ...params.InputProps,
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
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1,
                  bgcolor: '#fafafa',
                },
              }}
            />
          )}
          sx={{
            flex: 1,
            '& .MuiAutocomplete-listbox': {
              maxHeight: 200,
            },
          }}
        />
        <Button
          variant="contained"
          onClick={handleAddNewTag}
          disabled={!isNewTag}
          sx={{
            borderRadius: 1,
            bgcolor: '#0d6efd',
            minWidth: 80,
            height: 56,
            '&:hover': {
              bgcolor: '#0b5ed7',
            },
            '&.Mui-disabled': {
              bgcolor: '#e5e7eb',
              color: '#9ca3af',
            },
          }}
        >
          {t('Button.add')}
        </Button>
      </Stack>

      {/* Quick Access Tags */}
      <Box>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1, fontSize: 12 }}>
          {t('Label.quick_access')}
        </Typography>
        <Stack direction="row" flexWrap="wrap" gap={1}>
          {quickAccessTags.map((tag) => (
            <Chip
              key={tag.key}
              label={tag.label}
              onClick={() => handleTagSelect(tag)}
              sx={{
                bgcolor: selectedTag?.key === tag.key ? '#e6f0ff' : '#f5f5f5',
                color: selectedTag?.key === tag.key ? '#0d6efd' : '#666',
                border:
                  selectedTag?.key === tag.key ? '1px solid #0d6efd' : '1px solid transparent',
                fontSize: 13,
                fontWeight: 500,
                '&:hover': {
                  bgcolor: selectedTag?.key === tag.key ? '#d6e5ff' : '#ebebeb',
                },
              }}
            />
          ))}
        </Stack>
      </Box>

      {/* Action Buttons */}
      <Stack direction="row" spacing={1.5} justifyContent="flex-end">
        <Button
          variant="text"
          onClick={onClose}
          sx={{
            borderRadius: 1,
            color: '#dc3545',
            px: 3,
            '&:hover': {
              bgcolor: '#fff5f5',
            },
          }}
        >
          {t('Button.cancel')}
        </Button>

        <Button
          variant="contained"
          onClick={handleSave}
          disabled={!selectedTag}
          sx={{
            borderRadius: 1,
            bgcolor: '#0d6efd',
            px: 3,
            '&:hover': {
              bgcolor: '#0b5ed7',
            },
          }}
        >
          {t('Button.save')}
        </Button>
      </Stack>
    </Stack>
  );
}
