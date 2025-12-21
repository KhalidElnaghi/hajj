'use client';

import { m } from 'framer-motion';
import Link from 'next/link';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { PageNotFoundIllustration } from 'src/assets/illustrations';
import { varBounce, MotionContainer } from 'src/components/animate';

// This page renders when a locale is invalid or missing
export default function GlobalNotFound() {
  return (
    <Container>
      <Box
        sx={{
          py: 12,
          maxWidth: 480,
          mx: 'auto',
          display: 'flex',
          minHeight: '100vh',
          textAlign: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <MotionContainer>
          <m.div variants={varBounce().in}>
            <Typography variant="h3" sx={{ mb: 2 }}>
              Sorry, Page Not Found!
            </Typography>
          </m.div>

          <m.div variants={varBounce().in}>
            <Typography sx={{ color: 'text.secondary' }}>
              Sorry, we couldn't find the page you're looking for. Perhaps you've mistyped the URL?
              Be sure to check your spelling.
            </Typography>
          </m.div>

          <m.div variants={varBounce().in}>
            <PageNotFoundIllustration
              sx={{
                height: 260,
                my: { xs: 5, sm: 10 },
              }}
            />
          </m.div>

          <Button component={Link} href="/ar" size="large" variant="contained">
            Go to Home
          </Button>
        </MotionContainer>
      </Box>
    </Container>
  );
}
