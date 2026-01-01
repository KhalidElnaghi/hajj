'use client';

import Box from '@mui/material/Box';

// ----------------------------------------------------------------------

type Props = {
  title?: string;
  image?: string;
  children: React.ReactNode;
};

export default function AuthClassicLayout({ children }: Props) {
  return (
    <Box
      component="main"
      sx={{
        minHeight: '100vh',
        width: '100%',
        direction: 'rtl',
      }}
    >
      {children}
    </Box>
  );
}
