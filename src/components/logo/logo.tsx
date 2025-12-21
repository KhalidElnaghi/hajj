import { forwardRef } from 'react';

import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Box, { BoxProps } from '@mui/material/Box';

import { RouterLink } from 'src/routes/components';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
// ----------------------------------------------------------------------

export interface LogoProps extends BoxProps {
  enableText?: boolean;
  fullLogo?: boolean;
  disabledLink?: boolean;
  width?: number;
  height?: number;
}

const Logo = forwardRef<HTMLDivElement, LogoProps>(
  ({ width = 15, height = 30, fullLogo, enableText, disabledLink = false, sx, ...other }, ref) => {
    const t = useTranslations();

    // OR using local (public folder)
    // -------------------------------------------------------
    const logo = (
      <Box
        component="div"
        sx={{ display: 'flex', gap: 1, width: '15px', height: '30px', cursor: 'pointer', ...sx }}
      >
        <Image
          src={`/logo/${fullLogo ? 'SLogo' : 'SOBJECT'}.png`}
          width={30}
          height={55}
          alt="logo"
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
        {enableText && (
          <Typography
            variant="h4"
            component="span"
            textTransform="capitalize"
            alignSelf="center"
            pt={1}
            sx={{
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: { xs: '1.5rem', sm: '2rem' },
            }}
          >
            Dars
          </Typography>
        )}
      </Box>
    );

    if (disabledLink) {
      return logo;
    }

    return (
      <Link component={RouterLink} href="/" sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        {logo}
      </Link>
    );
  }
);

export default Logo;
