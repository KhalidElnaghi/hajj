'use client';

import {
  FormControl,
  Select,
  MenuItem,
  Typography,
  SelectChangeEvent,
  SxProps,
  Theme,
} from '@mui/material';

// ----------------------------------------------------------------------

export interface DropdownOption {
  value: string | number;
  label: string;
  icon?: string;
  disabled?: boolean;
}

interface FilterDropdownProps {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  options: DropdownOption[];
  placeholder?: string;
  allLabel?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  highlighted?: boolean;
  sx?: SxProps<Theme>;
  labelSx?: SxProps<Theme>;
  selectSx?: SxProps<Theme>;
}

// ----------------------------------------------------------------------

export default function FilterDropdown({
  label,
  value,
  onChange,
  options,
  placeholder = 'اختر',
  allLabel,
  disabled = false,
  fullWidth = true,
  highlighted = false,
  sx,
  labelSx,
  selectSx,
}: FilterDropdownProps) {
  const handleChange = (event: SelectChangeEvent<string | number>) => {
    onChange(String(event.target.value));
  };

  return (
    <FormControl fullWidth={fullWidth} sx={sx}>
      <Typography
        sx={{
          mb: 1,
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
      <Select
        value={value}
        onChange={handleChange}
        displayEmpty
        disabled={disabled}
        sx={{
          borderRadius: 1,
          ...selectSx,
        }}
      >
        <MenuItem value="">{allLabel || placeholder}</MenuItem>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
