import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function AuthModernCompactLayout({ children }: Props) {
  const theme = useTheme();

  return (
    <Box
      component="main"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: { xs: 2, md: 3 },
        py: { xs: 3, md: 5 },
        position: 'relative',
        direction: theme.direction === 'rtl' ? 'rtl' : 'ltr',
        textAlign: theme.direction === 'rtl' ? 'right' : 'left',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url(/assets/images/auth/hajj.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: -2,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          zIndex: -1,
        },
      }}
    >
      <Card
        sx={{
          width: '100%',
          maxWidth: 600,
          p: { xs: 3, md: 4 },
          boxShadow: (theme) => theme.customShadows.z24,
          backdropFilter: 'blur(20px)',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
        }}
      >
        {children}
      </Card>
    </Box>
  );
}
