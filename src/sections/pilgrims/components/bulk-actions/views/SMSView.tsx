'use client';

import { Box, Button, Chip, Stack, TextField, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { BulkActionViewProps } from '../shared/types';

export default function SMSView({ onBack, onClose, selectedCount }: BulkActionViewProps) {
  const t = useTranslations();
  const [selectedTemplates, setSelectedTemplates] = useState<string[]>([]);
  const [messageText, setMessageText] = useState('');

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
    setSelectedTemplates((prev) =>
      prev.includes(templateKey)
        ? prev.filter((key) => key !== templateKey)
        : [...prev, templateKey]
    );
  };

  const handleSend = () => {
    console.log('Sending SMS to:', selectedCount, 'pilgrims');
    console.log('Templates:', selectedTemplates);
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
                bgcolor: selectedTemplates.includes(template.key) ? '#e6f0ff' : '#f5f5f5',
                color: selectedTemplates.includes(template.key) ? '#0d6efd' : '#666',
                border: selectedTemplates.includes(template.key)
                  ? '1px solid #0d6efd'
                  : '1px solid transparent',
                fontSize: 13,
                fontWeight: 500,
                '&:hover': {
                  bgcolor: selectedTemplates.includes(template.key) ? '#d6e5ff' : '#ebebeb',
                },
              }}
            />
          ))}
        </Stack>
      </Box>

      {/* Message Input */}
      <Box>
        <Stack direction="row" alignItems="center" justifyContent="flex-start" gap={1} mb={1}>
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
            {selectedCount}
          </Box>
        </Stack>
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
