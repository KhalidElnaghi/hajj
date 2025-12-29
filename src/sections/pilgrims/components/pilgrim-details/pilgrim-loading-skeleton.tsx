'use client';

import { Container, Box, Card, Stack, Skeleton, Grid } from '@mui/material';

export default function PilgrimLoadingSkeleton() {
  return (
    <Container maxWidth="xl" sx={{ width: '100%' }}>
      <Box sx={{ py: 4, width: '100%' }}>
        <Card
          sx={{
            borderRadius: 1,
            boxShadow: (theme) => theme.customShadows.card,
            width: '100%',
            overflow: 'visible',
          }}
        >
          <Box
            sx={{
              p: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Skeleton variant="circular" width={64} height={64} />
              <Box>
                <Skeleton variant="text" width={200} height={32} sx={{ mb: 1 }} />
                <Skeleton variant="text" width={150} height={24} />
              </Box>
            </Stack>

            <Stack direction="row" spacing={1.5}>
              <Skeleton variant="rectangular" width={120} height={40} sx={{ borderRadius: 1 }} />
            </Stack>
          </Box>

          <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 3 }}>
            <Box sx={{ display: 'flex', gap: 3, py: 2 }}>
              {[1, 2, 3, 4, 5, 6].map((tab) => (
                <Box key={tab} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Skeleton variant="circular" width={24} height={24} />
                  <Skeleton variant="text" width={100} height={24} />
                </Box>
              ))}
            </Box>
          </Box>

          <Box sx={{ p: 4 }}>
            <Grid container spacing={3} sx={{ width: '100%' }}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Box sx={{ width: '100%' }}>
                  <Skeleton variant="text" width={120} height={24} sx={{ mb: 1.5 }} />
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={56}
                    sx={{ borderRadius: 1 }}
                  />
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Box sx={{ width: '100%' }}>
                  <Skeleton variant="text" width={120} height={24} sx={{ mb: 1.5 }} />
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={56}
                    sx={{ borderRadius: 1 }}
                  />
                </Box>
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <Box sx={{ width: '100%' }}>
                  <Skeleton variant="text" width={120} height={24} sx={{ mb: 1.5 }} />
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={56}
                    sx={{ borderRadius: 1 }}
                  />
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Box sx={{ width: '100%' }}>
                  <Skeleton variant="text" width={120} height={24} sx={{ mb: 1.5 }} />
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={56}
                    sx={{ borderRadius: 1 }}
                  />
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Box sx={{ width: '100%' }}>
                  <Skeleton variant="text" width={120} height={24} sx={{ mb: 1.5 }} />
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={56}
                    sx={{ borderRadius: 1 }}
                  />
                </Box>
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <Box sx={{ width: '100%' }}>
                  <Skeleton variant="text" width={120} height={24} sx={{ mb: 1.5 }} />
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={56}
                    sx={{ borderRadius: 1 }}
                  />
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Box sx={{ width: '100%' }}>
                  <Skeleton variant="text" width={120} height={24} sx={{ mb: 1.5 }} />
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={56}
                    sx={{ borderRadius: 1 }}
                  />
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Box sx={{ width: '100%' }}>
                  <Skeleton variant="text" width={120} height={24} sx={{ mb: 1.5 }} />
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={56}
                    sx={{ borderRadius: 1 }}
                  />
                </Box>
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <Box sx={{ width: '100%' }}>
                  <Skeleton variant="text" width={120} height={24} sx={{ mb: 1.5 }} />
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={56}
                    sx={{ borderRadius: 1 }}
                  />
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Box sx={{ width: '100%' }}>
                  <Skeleton variant="text" width={120} height={24} sx={{ mb: 1.5 }} />
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={56}
                    sx={{ borderRadius: 1 }}
                  />
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Box sx={{ width: '100%' }}>
                  <Skeleton variant="text" width={120} height={24} sx={{ mb: 1.5 }} />
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={56}
                    sx={{ borderRadius: 1 }}
                  />
                </Box>
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <Box sx={{ width: '100%' }}>
                  <Skeleton variant="text" width={120} height={24} sx={{ mb: 1.5 }} />
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={56}
                    sx={{ borderRadius: 1 }}
                  />
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Box sx={{ width: '100%' }}>
                  <Skeleton variant="text" width={120} height={24} sx={{ mb: 1.5 }} />
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={56}
                    sx={{ borderRadius: 1 }}
                  />
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Box sx={{ width: '100%' }}>
                  <Skeleton variant="text" width={120} height={24} sx={{ mb: 1.5 }} />
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={56}
                    sx={{ borderRadius: 1 }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Card>
      </Box>
    </Container>
  );
}
