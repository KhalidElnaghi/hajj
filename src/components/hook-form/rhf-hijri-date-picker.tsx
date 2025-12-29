'use client';

import { Controller, useFormContext } from 'react-hook-form';
import { Box, FormHelperText } from '@mui/material';
import DatePicker from 'react-multi-date-picker';
import type { Value } from 'react-multi-date-picker';
import arabic from 'react-date-object/calendars/arabic';
import arabic_ar from 'react-date-object/locales/arabic_ar';
import Iconify from 'src/components/iconify';
import 'react-multi-date-picker/styles/colors/teal.css';

// ----------------------------------------------------------------------

type RHFHijriDatePickerProps = {
  name: string;
  helperText?: React.ReactNode;
  placeholder?: string;
  required?: boolean;
  isReadOnly?: boolean;
};

export default function RHFHijriDatePicker({
  name,
  helperText,
  placeholder = 'YYYY/MM/DD',
  required = false,
  isReadOnly = false,
}: RHFHijriDatePickerProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        // Convert YYYY-MM-DD string to DatePicker value format
        const getValue = (): Value | null => {
          if (!field.value) return null;
          try {
            const parts = field.value.split('-');
            if (parts.length === 3) {
              const year = parseInt(parts[0], 10);
              const month = parseInt(parts[1], 10);
              const day = parseInt(parts[2], 10);
              // Ensure month and day are not zero, as 0 is falsy but unsupported as Month type
              if (
                Number.isInteger(year) &&
                Number.isInteger(month) &&
                Number.isInteger(day) &&
                month >= 1 &&
                month <= 12 &&
                day >= 1 &&
                day <= 31
              ) {
                // eslint-disable-next-line @typescript-eslint/no-var-requires
                const DateObject = require('react-date-object').default;
                return new DateObject({
                  year,
                  month,
                  day,
                  calendar: arabic,
                  locale: arabic_ar,
                });
              }
            }
          } catch (e) {
            console.error('Error parsing hijri date:', e);
          }
          return null;
        };

        // Convert DatePicker value to YYYY-MM-DD string
        const formatValue = (value: Value): string => {
          if (!value) return '';
          try {
            const dateObj = Array.isArray(value) ? value[0] : value;
            if (dateObj && typeof dateObj === 'object') {
              const year = dateObj.year || dateObj.Year;
              const month = dateObj.month || dateObj.Month;
              const day = dateObj.day || dateObj.Day;

              if (year && month && day) {
                const yearStr = String(year).padStart(4, '0');
                const monthStr = String(month).padStart(2, '0');
                const dayStr = String(day).padStart(2, '0');
                return `${yearStr}-${monthStr}-${dayStr}`;
              }
            }
          } catch (e) {
            console.error('Error formatting hijri date:', e);
          }
          return '';
        };

        return (
          <Box>
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                '& .rmdp-wrapper': {
                  width: '100%',
                },
                '& .rmdp-input': {
                  width: '100%',
                  padding: '26px 14px',
                  paddingLeft: '40px',
                  border: error ? '1px solid #d32f2f' : '1px solid rgba(0, 0, 0, 0.23)',
                  borderRadius: '4px',
                  fontSize: '1rem',
                  fontFamily: 'inherit',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  '&:hover': {
                    borderColor: error ? '#d32f2f' : 'rgba(0, 0, 0, 0.87)',
                  },
                  '&:focus': {
                    borderColor: error ? '#d32f2f' : '#1976d2',
                    borderWidth: '2px',
                    outline: 'none',
                  },
                },
                '& .rmdp-container': {
                  width: '100%',
                },
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-40%)',
                  zIndex: 1,
                  pointerEvents: 'none',
                }}
              >
                <Iconify icon="solar:calendar-bold" width={20} sx={{ color: 'text.secondary' }} />
              </Box>
              <DatePicker
                value={getValue()}
                readOnly={isReadOnly}
                onChange={(value: Value) => {
                  const formatted = formatValue(value);
                  field.onChange(formatted);
                }}
                onClose={field.onBlur}
                calendar={arabic}
                locale={arabic_ar}
                placeholder={placeholder}
                format="YYYY/MM/DD"
                inputClass="rmdp-input"
                containerClassName="custom-hijri-date-picker"
                required={required}
                // style={{
                //   width: '100%',
                //   paddingTop: '27px',
                //   paddingBottom: '27px',
                //   display: 'flex',
                //   alignItems: 'center',
                //   justifyContent: 'center',
                // }}
              />
            </Box>
            {(error || helperText) && (
              <FormHelperText error={!!error} sx={{ mt: 0.5, mx: 1.75 }}>
                {error ? error?.message : helperText}
              </FormHelperText>
            )}
          </Box>
        );
      }}
    />
  );
}
