'use client';

import { Box, Button, Chip, MenuItem, Stack, TextField, Typography } from '@mui/material';
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
  const t = useTranslations();
  const normalizeId = (pilgrim: any) => {
    if (!pilgrim) return '';
    return String(pilgrim.id ?? pilgrim.pilgrimId ?? '');
  };

  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');
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

  const recipients = useMemo(
    () => allPilgrimsList.filter((pilgrim) => recipientIds.includes(normalizeId(pilgrim))),
    [allPilgrimsList, recipientIds]
  );

  const handleAddPilgrim = (pilgrim: any) => {
    const id = normalizeId(pilgrim);
    if (!id) return;
    setRecipientIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const handleRemoveRecipient = (recipientId: string) => {
    setRecipientIds((prev) => prev.filter((id) => id !== recipientId));
  };

  const totalRecipients = recipientIds.length || selectedCount;

  const handleSend = () => {
    console.log('Sending SMS to:', totalRecipients, 'pilgrims');
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
                fontSize: 12,
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
            <TextField
              select
              size="small"
              fullWidth
              value=""
              onChange={(e) => {
                const selected = availablePilgrims.find(
                  (pilgrim) => normalizeId(pilgrim) === e.target.value
                );
                if (selected) handleAddPilgrim(selected);
              }}
              placeholder={t('Placeholder.search_and_add_pilgrim')}
              SelectProps={{
                displayEmpty: true,
                MenuProps: {
                  PaperProps: { sx: { maxHeight: 320 } },
                },
                renderValue: () => t('Placeholder.search_and_add_pilgrim'),
              }}
              sx={{
                maxWidth: 320,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1,
                  bgcolor: '#fafafa',
                  height: 36,
                  '& .MuiSelect-select': { py: 0.5, display: 'flex', alignItems: 'center' },
                },
              }}
            >
              {availablePilgrims.length === 0 && (
                <MenuItem value="" disabled>
                  {t('Label.no_data')}
                </MenuItem>
              )}
              {availablePilgrims.slice(0, 20).map((pilgrim) => {
                const id = normalizeId(pilgrim);
                return (
                  <MenuItem key={id} value={id}>
                    {pilgrim.name}
                  </MenuItem>
                );
              })}
            </TextField>
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
