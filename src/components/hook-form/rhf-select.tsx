import { Controller, useFormContext } from 'react-hook-form';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import { ClearIcon } from '@mui/x-date-pickers';
import InputLabel from '@mui/material/InputLabel';
import { Theme, SxProps } from '@mui/material/styles';
import FormHelperText from '@mui/material/FormHelperText';
import { IconButton, InputAdornment } from '@mui/material';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import FormControl, { FormControlProps } from '@mui/material/FormControl';
import { useQueryString } from 'src/hooks/use-queryString';

// ----------------------------------------------------------------------

type RHFSelectProps = TextFieldProps & {
  name: string;
  native?: boolean;
  maxHeight?: boolean | number;
  children: React.ReactNode;
  value?: any;
  rules?: { [key: string]: any };
  PaperPropsSx?: SxProps<Theme>;
};

export function RHFSelect({
  name,
  native,
  maxHeight = 220,
  helperText,
  children,
  PaperPropsSx,
  rules,
  value,
  ...other
}: RHFSelectProps) {
  const { control, setValue, watch } = useFormContext();
  const { createQueryString } = useQueryString();
  const handleClear = () => {
    setValue(name, null);
    createQueryString(name, undefined);
  };
  return (
    <Controller
      name={name}
      defaultValue={value}
      rules={rules}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const fieldValue = field.value ?? '';
        
        return (
          <TextField
            {...field}
            value={fieldValue}
            onChange={(e) => {
              field.onChange(e.target.value);
            }}
            onBlur={field.onBlur}
            name={field.name}
            select
            fullWidth
            // InputProps={{
            //   endAdornment: field.value && (
            //     <InputAdornment position="start">
            //       <IconButton onClick={handleClear}>
            //         <ClearIcon />
            //       </IconButton>
            //     </InputAdornment>
            //   ),
            // }}
            SelectProps={{
              native: false,
              MenuProps: {
                PaperProps: {
                  sx: {
                    maxHeight: typeof maxHeight === 'number' ? maxHeight : 'unset',
                    ...PaperPropsSx,
                  },
                },
              },
              sx: { textTransform: 'capitalize' },
            }}
            error={!!error}
            helperText={error ? error?.message : helperText}
            {...other}
          >
            {children}
          </TextField>
        );
      }}
    />
  );
}

// ----------------------------------------------------------------------

type RHFMultiSelectProps = FormControlProps & {
  name: string;
  label?: string;
  chip?: boolean;
  checkbox?: boolean;
  placeholder?: string;
  helperText?: React.ReactNode;
  options: {
    label: string;
    value: string;
  }[];
};

export function RHFMultiSelect({
  name,
  chip,
  label,
  options,
  checkbox,
  placeholder,
  helperText,
  ...other
}: RHFMultiSelectProps) {
  const { control } = useFormContext();

  const renderValues = (selectedIds: string[]) => {
    const selectedItems = options.filter((item) => selectedIds.includes(item.value));

    if (!selectedItems.length && placeholder) {
      return <Box sx={{ color: 'text.disabled' }}>{placeholder}</Box>;
    }

    if (chip) {
      return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {selectedItems.map((item) => (
            <Chip key={item.value} size="small" label={item.label} />
          ))}
        </Box>
      );
    }

    return selectedItems.map((item) => item.label).join(', ');
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl error={!!error} fullWidth {...other}>
          {label && <InputLabel id={name}> {label} </InputLabel>}

          <Select
            {...field}
            multiple
            displayEmpty={!!placeholder}
            id={`multiple-${name}`}
            labelId={name}
            label={label}
            renderValue={renderValues}
          >
            {options.map((option) => {
              const selected = field.value?.includes(option.value) ?? false;

              return (
                <MenuItem key={option.value} value={option.value}>
                  {checkbox && <Checkbox size="small" disableRipple checked={selected} />}

                  {option.label}
                </MenuItem>
              );
            })}
          </Select>

          {(!!error || helperText) && (
            <FormHelperText error={!!error}>{error ? error?.message : helperText}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}
