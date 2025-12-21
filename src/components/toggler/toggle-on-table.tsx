'use client';

import { Box, Switch, SxProps } from '@mui/material';


interface IProps {
  id: string;
  is_active: boolean;
  action: (formData: FormData) => void;
  Togglerlabel?: string;
  TogglerPropName?: string;
  sx?: SxProps;
}

function Toggler({ id, is_active, action, Togglerlabel, TogglerPropName = "is_active", sx={ display: 'flex', justifyContent: 'center', alignItems: 'center' } }: IProps) {
  return (
    <Box sx={sx}>
      <form action={action}>
        <input name="id" value={id} readOnly style={{ display: 'none' }} />
        <Switch
          id={TogglerPropName}
          checked={is_active}
          name={TogglerPropName}
          value={is_active}
          inputProps={{ 'aria-label': 'controlled' }}
          type="submit"
          />
          {Togglerlabel && <label htmlFor={TogglerPropName}>{Togglerlabel}</label>}
      </form>
    </Box>
  );
}

export default Toggler;
