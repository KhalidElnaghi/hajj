'use client';

import { Box, Switch } from '@mui/material';

interface IProps {
  id: string;
  is_active: boolean;
  handler: (name: string) => void;
  name: string;
}

function NormalToggler({ id, is_active, handler, name }: IProps) {
  const handleChange = () => {
    handler(name);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Switch
        // onChange={handleChange}
        // checked={is_active}
        name={name}
        // value={is_active}
        inputProps={{ 'aria-label': 'controlled' }}
      />
    </Box>
  );
}

export default NormalToggler;
