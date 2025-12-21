import Box from '@mui/material/Box';

import { usePathname } from 'src/routes/hooks';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  const pathname = usePathname();

  const homePage = pathname === '/';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 1 }}>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ...(!homePage && {
            pt: { xs: 2, md: 3 },
          }),
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
