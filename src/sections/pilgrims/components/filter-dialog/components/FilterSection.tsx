'use client';

import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import Iconify from 'src/components/iconify';
import type { ReactNode, SyntheticEvent } from 'react';

interface FilterSectionProps {
  title: string;
  expanded: boolean;
  onChange: (event: SyntheticEvent, isExpanded: boolean) => void;
  children: ReactNode;
}

export default function FilterSection({ title, expanded, onChange, children }: FilterSectionProps) {
  return (
    <Accordion
      expanded={expanded}
      onChange={onChange}
      TransitionProps={{ timeout: 300 }}
      sx={{
        boxShadow: 'none !important',
        border: 'none',
        '&:before': { display: 'none' },
        '&.Mui-expanded': {
          margin: 0,
        },
        mb: 0,
      }}
    >
      <AccordionSummary
        expandIcon={
          expanded ? (
            <Iconify icon="mdi:chevron-down" width={20} color="#64748B" />
          ) : (
            <Iconify icon="mdi:plus" width={20} color="#64748B" />
          )
        }
        sx={{
          px: 0,
          minHeight: 56,
          '& .MuiAccordionSummary-content': { my: 1.5, mx: 3 },
          '& .MuiAccordionSummary-content.Mui-expanded': { my: 1.5, mx: 3 },
          '& .MuiAccordionSummary-expandIconWrapper': { mr: 3 },
          bgcolor: 'transparent',
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 24,
            right: 24,
            height: '1px',
            bgcolor: 'divider',
          },
          '&:hover': {
            bgcolor: 'transparent',
          },
          '&.Mui-expanded': {
            minHeight: 56,
            bgcolor: 'transparent',
          },
        }}
      >
        <Typography
          sx={{
            color: '#64748B',
            fontSize: 18,
            fontWeight: 400,
            lineHeight: '23px',
          }}
        >
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ px: 3, pt: 3, pb: 3, bgcolor: 'transparent' }}>
        {children}
      </AccordionDetails>
    </Accordion>
  );
}
