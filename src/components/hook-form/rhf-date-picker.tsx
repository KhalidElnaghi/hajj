import { Controller, useFormContext } from 'react-hook-form';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// ----------------------------------------------------------------------

type RHFDatePickerProps = Omit<React.ComponentProps<typeof DatePicker>, 'value' | 'onChange'> & {
  name: string;
  helperText?: React.ReactNode;
  rules?: { [key: string]: any };
  isReadOnly?: boolean;
};

export default function RHFDatePicker({
  name,
  helperText,
  rules,
  isReadOnly,
  ...other
}: RHFDatePickerProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => {
        const fieldValue = field.value
          ? dayjs(field.value).isValid()
            ? dayjs(field.value)
            : null
          : null;

        return (
          <DatePicker
            {...field}
            {...other}
            value={fieldValue}
            readOnly={isReadOnly}
            onChange={(newValue: Dayjs | null) => {
              if (newValue && newValue.isValid()) {
                field.onChange(newValue.format('YYYY-MM-DD'));
              } else {
                field.onChange('');
              }
            }}
            slotProps={{
              textField: {
                fullWidth: true,
                error: !!error,
                helperText: error ? error?.message : helperText,
                placeholder: '',
                label: undefined,
              },
            }}
          />
        );
      }}
    />
  );
}
