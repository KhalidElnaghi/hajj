'use client';

import { Box, Button, Chip, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { BulkActionViewProps } from '../shared/types';

export default function TagsView({ onBack, onClose, selectedCount }: BulkActionViewProps) {
  const t = useTranslations();
  const [searchText, setSearchText] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const tags = [
    { key: 'near_bathroom', label: t('Label.tag_near_bathroom') },
    { key: 'tent_entrance', label: t('Label.tag_tent_entrance') },
    { key: 'tent_middle', label: t('Label.tag_tent_middle') },
    { key: 'near_restaurant', label: t('Label.tag_near_restaurant') },
    { key: 'fasil_entrance', label: t('Label.tag_fasil_entrance') },
    { key: 'near_medical_center', label: t('Label.tag_near_medical_center') },
  ];

  const handleTagToggle = (tagKey: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagKey) ? prev.filter((key) => key !== tagKey) : [...prev, tagKey]
    );
  };

  const handleAddTag = () => {
    if (searchText.trim()) {
      // Logic to add new tag
      console.log('Adding new tag:', searchText);
      setSearchText('');
    }
  };

  const handleDeleteTags = () => {
    setSelectedTags([]);
  };

  const handleSave = () => {
    console.log('Saving tags:', selectedTags);
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

      {/* Search Field with Add Button */}
      <Stack direction="row" spacing={1} alignItems="center">
        <TextField
          fullWidth
          placeholder={t('Placeholder.search_or_add_new_tag')}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleAddTag();
            }
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
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 1,
              bgcolor: '#fafafa',
            },
          }}
        />
        <Button
          variant="contained"
          onClick={handleAddTag}
          disabled={!searchText.trim()}
          sx={{
            borderRadius: 1,
            bgcolor: '#0d6efd',
            minWidth: 80,
            height: 48,
            '&:hover': {
              bgcolor: '#0b5ed7',
            },
          }}
        >
          {t('Button.add')}
        </Button>
      </Stack>

      {/* Tags */}
      <Stack direction="row" flexWrap="wrap" gap={1}>
        {tags.map((tag) => (
          <Chip
            key={tag.key}
            label={tag.label}
            onClick={() => handleTagToggle(tag.key)}
            sx={{
              bgcolor: selectedTags.includes(tag.key) ? '#e6f0ff' : '#f5f5f5',
              color: selectedTags.includes(tag.key) ? '#0d6efd' : '#666',
              border: selectedTags.includes(tag.key)
                ? '1px solid #0d6efd'
                : '1px solid transparent',
              fontSize: 13,
              fontWeight: 500,
              '&:hover': {
                bgcolor: selectedTags.includes(tag.key) ? '#d6e5ff' : '#ebebeb',
              },
            }}
          />
        ))}
      </Stack>

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
          variant="outlined"
          onClick={handleDeleteTags}
          disabled={selectedTags.length === 0}
          sx={{
            borderRadius: 1,
            borderColor: '#e5e7eb',
            color: '#666',
            px: 3,
            '&:hover': {
              borderColor: '#d1d5db',
              bgcolor: '#fafafa',
            },
          }}
        >
          {t('Button.delete_tags')}
        </Button>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={selectedTags.length === 0}
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
