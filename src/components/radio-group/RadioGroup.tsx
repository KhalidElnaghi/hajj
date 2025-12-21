import React from 'react';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';



interface IProp {
  data: { value: boolean; label: string }[];
  onValueChange: (value: boolean) => void;
  align?: boolean;
  defaultValue?: boolean;
}

export default function RowRadioButtonsGroup({
  data,
  onValueChange,
  align,
  defaultValue
}: IProp) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onValueChange(event.target.value === 'true');
  };

  return (
    <FormControl>
      <RadioGroup
        row={align !== false}
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={handleChange}
        value={String(defaultValue)} 
      >
        {data.map((item) => (
          <FormControlLabel
            key={String(item.value)}
            value={String(item.value)}
            control={<Radio />}
            label={item.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
