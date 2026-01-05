'use client';

import { Box, Typography, ToggleButtonGroup, ToggleButton, SxProps, Theme } from '@mui/material';

// ----------------------------------------------------------------------

export interface ToggleOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

interface FilterToggleGroupProps {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  options: ToggleOption[];
  disabled?: boolean;
  fullWidth?: boolean;
  highlighted?: boolean;
  sx?: SxProps<Theme>;
  labelSx?: SxProps<Theme>;
  toggleSx?: SxProps<Theme>;
}

// ----------------------------------------------------------------------

export default function FilterToggleGroup({
  label,
  value,
  onChange,
  options,
  disabled = false,
  fullWidth = true,
  highlighted = false,
  sx,
  labelSx,
  toggleSx,
}: FilterToggleGroupProps) {
  const handleChange = (event: React.MouseEvent<HTMLElement>, newValue: string | number) => {
    if (newValue !== null) {
      onChange(String(newValue));
    }
  };

  // Convert value to number if the options have numeric values
  // This ensures proper comparison in ToggleButtonGroup
  const normalizedValue =
    value === ''
      ? ''
      : options.length > 0 && typeof options[0].value === 'number'
        ? Number(value)
        : value;

  return (
    <Box sx={{ width: fullWidth ? '100%' : 'auto', ...sx }}>
      <Typography
        sx={{
          mb: 1.5,
          color: highlighted ? 'primary.main' : '#64748B',
          fontSize: 16,
          fontWeight: 400,
          lineHeight: '22px',
          textTransform: 'capitalize',
          ...labelSx,
        }}
      >
        {label}
      </Typography>
      <ToggleButtonGroup
        value={normalizedValue}
        exclusive
        onChange={handleChange}
        fullWidth={fullWidth}
        disabled={disabled}
        sx={{
          '& .MuiToggleButton-root': {
            borderRadius: 1,
            border: '1px solid #e0e0e0',
            py: 1,
            '&.Mui-selected': {
              bgcolor: '#f3f7ff',
              color: '#0d6efd',
              borderColor: '#0d6efd',
            },
          },
          ...toggleSx,
        }}
      >
        {options.map((option) => (
          <ToggleButton key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
}
