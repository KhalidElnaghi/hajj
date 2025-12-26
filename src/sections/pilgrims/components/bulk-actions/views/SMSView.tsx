'use client';

import {
  Autocomplete,
  Box,
  Button,
  Chip,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useTranslations } from 'next-intl';
import { useEffect, useMemo, useState } from 'react';

import { BulkActionViewProps } from '../shared/types';

export default function SMSView({
  onBack,
  onClose,
  selectedCount,
  selectedPilgrims,
  allPilgrims,
}: BulkActionViewProps) {
  const t = useTranslations('Pilgrims');
  const normalizeId = (pilgrim: any) => {
    if (!pilgrim) return '';
    return String(pilgrim.id ?? pilgrim.pilgrimId ?? '');
  };

  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [recipientIds, setRecipientIds] = useState<string[]>(() =>
    (selectedPilgrims ?? [])
      .map((pilgrim) => normalizeId(pilgrim))
      .filter((id): id is string => !!id)
  );

  const templates = [
    { key: 'welcome', label: t('Label.sms_template_welcome') },
    { key: 'instructions', label: t('Label.sms_template_instructions') },
    { key: 'arrival', label: t('Label.sms_template_arrival_days') },
    { key: 'gathering', label: t('Label.sms_template_gathering_point') },
    { key: 'housing', label: t('Label.sms_template_housing_description') },
    { key: 'emergency', label: t('Label.sms_template_emergency') },
    { key: 'daily_program', label: t('Label.sms_template_daily_program') },
    { key: 'reminder', label: t('Label.sms_template_new_phase_reminder') },
    { key: 'greeting', label: t('Label.sms_template_greetings') },
  ];

  const handleTemplateToggle = (templateKey: string) => {
    setSelectedTemplate((prev) => (prev === templateKey ? null : templateKey));
  };

  useEffect(() => {
    setRecipientIds(
      (selectedPilgrims ?? [])
        .map((pilgrim) => normalizeId(pilgrim))
        .filter((id): id is string => !!id)
    );
  }, [selectedPilgrims]);

  const allPilgrimsList = useMemo(() => allPilgrims ?? [], [allPilgrims]);

  const availablePilgrims = useMemo(
    () =>
      allPilgrimsList.filter((pilgrim) => {
        const id = normalizeId(pilgrim);
        return id && !recipientIds.includes(id);
      }),
    [allPilgrimsList, recipientIds]
  );

  const uniqueAvailablePilgrims = useMemo(() => {
    const seen = new Set<string>();
    return availablePilgrims.filter((pilgrim) => {
      const id = normalizeId(pilgrim);
      if (!id || seen.has(id)) return false;
      seen.add(id);
      return true;
    });
  }, [availablePilgrims]);

  const recipients = useMemo(
    () => allPilgrimsList.filter((pilgrim) => recipientIds.includes(normalizeId(pilgrim))),
    [allPilgrimsList, recipientIds]
  );

  const handleAddPilgrim = (pilgrim: any) => {
    const id = normalizeId(pilgrim);
    if (!id) return;
    setRecipientIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
    setSearchTerm(''); // clear search after adding a pilgrim
  };

  const handleRemoveRecipient = (recipientId: string) => {
    setRecipientIds((prev) => prev.filter((id) => id !== recipientId));
  };

  const totalRecipients = recipientIds.length || selectedCount;

  const handleSend = () => {
    console.log('Template:', selectedTemplate);
    console.log('Recipients:', recipientIds);
    console.log('Message:', messageText);
    onClose();
  };

  return (
    <Stack spacing={2.5} sx={{ p: 1 }}>
      {/* Section Header */}
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 700, fontSize: 16 }}>
          {t('Label.send_emergency_message')}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5, fontSize: 13 }}>
          {t('Description.sms_messages_description')}
        </Typography>
      </Box>

      {/* Quick Templates */}
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600, fontSize: 14 }}>
          {t('Label.quick_templates')}
        </Typography>
        <Stack direction="row" flexWrap="wrap" gap={1}>
          {templates.map((template) => (
            <Chip
              key={template.key}
              label={template.label}
              onClick={() => handleTemplateToggle(template.key)}
              sx={{
                bgcolor: selectedTemplate === template.key ? '#E6F0FF' : '#F1F5F9',
                color: selectedTemplate === template.key ? '#0d6efd' : '#99A8BC',
                border:
                  selectedTemplate === template.key ? '1px solid #0d6efd' : '1px solid #CBD5E1',
                fontSize: 10,
                fontWeight: 500,
                '&:hover': {
                  bgcolor: selectedTemplate === template.key ? '#D6E5FF' : '#ececec',
                },
              }}
            />
          ))}
        </Stack>
      </Box>

      {/* Message Input */}
      <Box>
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            alignItems: 'end',
            justifyContent: 'space-between',
            mb: 1,
          }}
        >
          <Stack direction="row" alignItems="center" justifyContent="flex-start" gap={1}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: 14 }}>
              {t('Label.total_pilgrims_today')}
            </Typography>
            <Box
              sx={{
                bgcolor: '#F0F5FF',
                color: '#1570EF',
                width: 20,
                height: 20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '999px',
                border: '1px solid #1570EF',
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              {totalRecipients}
            </Box>
          </Stack>
          {/* Add More Pilgrims */}
          <Box>
            <Autocomplete
              size="small"
              options={uniqueAvailablePilgrims
                .filter((pilgrim) => {
                  const term = searchTerm.trim().toLowerCase();
                  if (!term) return true;
                  const name = pilgrim?.name?.toLowerCase?.() ?? '';
                  const booking = pilgrim?.bookingNumber?.toLowerCase?.() ?? '';
                  const idNum = pilgrim?.idNumber?.toLowerCase?.() ?? '';
                  return name.includes(term) || booking.includes(term) || idNum.includes(term);
                })
                .slice(0, 20)}
              getOptionLabel={(option) =>
                option?.name || option?.bookingNumber || option?.idNumber || t('Label.name')
              }
              value={null}
              isOptionEqualToValue={(option, value) => normalizeId(option) === normalizeId(value)}
              onChange={(_, value) => value && handleAddPilgrim(value)}
              inputValue={searchTerm}
              onInputChange={(_, value, reason) => {
                if (reason === 'reset') {
                  // MUI sets the input to the selected option label on select; clear for next search.
                  setSearchTerm('');
                  return;
                }
                setSearchTerm(value);
              }}
              forcePopupIcon={false}
              renderOption={(props, option) => (
                <MenuItem
                  {...props}
                  key={normalizeId(option) || props.id}
                  sx={{
                    fontSize: '9px',
                    fontFamily: '"IBM Plex Sans Arabic", sans-serif',
                    lineHeight: '16px',
                    color: '#94A3B8',
                    minHeight: 28,
                    py: 0.5,
                  }}
                >
                  {option?.name || option?.bookingNumber || option?.idNumber || t('Label.name')}
                </MenuItem>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder={t('Placeholder.search_and_add_pilgrim')}
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start" sx={{ mr: 0.5 }}>
                        <Box
                          component="img"
                          src="/assets/images/pilgrims/search.svg"
                          alt="search"
                          sx={{ width: 18, height: 18 }}
                        />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 1,
                      bgcolor: '#F4F7FB',
                      height: '27.451px',
                      padding: 0,
                      '& .MuiOutlinedInput-input': {
                        padding: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        gap: '3px',
                        paddingLeft: '10px',
                        paddingRight: '6px',
                        color: '#94A3B8',
                        fontFamily: '"IBM Plex Sans Arabic", sans-serif',
                        fontSize: '9px',
                        fontWeight: 400,
                        lineHeight: '16px',
                      },
                    },
                  }}
                />
              )}
              sx={{
                width: 129,
                maxWidth: 129,
                '& .MuiAutocomplete-inputRoot': {
                  padding: 0,
                },
              }}
              slotProps={{
                paper: {
                  sx: {
                    maxHeight: 320,
                    width: 129,
                    minWidth: 129,
                  },
                },
                popper: {
                  sx: { width: 129 },
                },
              }}
            />
          </Box>
        </Box>
        <TextField
          fullWidth
          multiline
          rows={4}
          placeholder={t('Placeholder.write_message_text')}
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 1,
              bgcolor: '#fafafa',
            },
          }}
        />
        <Typography variant="caption" sx={{ color: 'text.secondary', mt: 0.5, display: 'block' }}>
          {t('Helper.search_add_new_word')}
        </Typography>
      </Box>

      {/* Action Buttons */}
      <Stack direction="row" spacing={1.5} justifyContent="flex-end">
        <Button
          variant="outlined"
          onClick={onClose}
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
          {t('Button.cancel')}
        </Button>
        <Button
          variant="contained"
          onClick={handleSend}
          sx={{
            borderRadius: 1,
            bgcolor: '#0d6efd',
            px: 3,
            '&:hover': {
              bgcolor: '#0b5ed7',
            },
          }}
        >
          {t('Button.send')}
        </Button>
      </Stack>
    </Stack>
  );
}
