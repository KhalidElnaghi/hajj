import { Controller, useFormContext } from 'react-hook-form';
import dayjs, { Dayjs } from 'dayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

// ----------------------------------------------------------------------

type RHFTimePickerProps = Omit<React.ComponentProps<typeof TimePicker>, 'value' | 'onChange'> & {
  name: string;
  helperText?: React.ReactNode;
};

export default function RHFTimePicker({ name, helperText, views, ...other }: RHFTimePickerProps) {
  const { control } = useFormContext();
  const isHoursOnly = views && views.length === 1 && views[0] === 'hours';

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const fieldValue = field.value
          ? dayjs(field.value, 'HH:mm:ss').isValid()
            ? dayjs(field.value, 'HH:mm:ss')
            : null
          : null;

        return (
          <TimePicker
            {...field}
            {...other}
            views={views}
            value={fieldValue}
            onChange={(newValue: Dayjs | null) => {
              if (newValue && newValue.isValid()) {
                // For hours-only view, ensure format is HH:00:00
                if (isHoursOnly) {
                  const hour = newValue.hour();
                  field.onChange(`${String(hour).padStart(2, '0')}:00:00`);
                } else {
                  field.onChange(newValue.format('HH:mm:ss'));
                }
              } else {
                field.onChange('');
              }
            }}
            slotProps={{
              textField: {
                fullWidth: true,
                error: !!error,
                helperText: error ? error?.message : helperText,
              },
            }}
          />
        );
      }}
    />
  );
}
