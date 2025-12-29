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
              p: { xs: 2, md: 3 },
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: { xs: 'flex-start', md: 'center' },
              justifyContent: 'space-between',
              gap: { xs: 2, md: 0 },
            }}
          >
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{ width: { xs: '100%', md: 'auto' } }}
            >
              <Skeleton
                variant="circular"
                sx={{
                  width: { xs: 48, md: 64 },
                  height: { xs: 48, md: 64 },
                }}
              />
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Skeleton
                  variant="text"
                  sx={{
                    width: { xs: 150, md: 200 },
                    height: { xs: 24, md: 32 },
                    mb: 1,
                  }}
                />
                <Skeleton
                  variant="text"
                  sx={{
                    width: { xs: 120, md: 150 },
                    height: { xs: 20, md: 24 },
                  }}
                />
              </Box>
            </Stack>

            <Stack
              direction="row"
              spacing={1.5}
              sx={{
                width: { xs: '100%', md: 'auto' },
                justifyContent: { xs: 'flex-start', md: 'flex-start' },
              }}
            >
              <Skeleton
                variant="rectangular"
                sx={{
                  width: { xs: 100, md: 120 },
                  height: { xs: 36, md: 40 },
                  borderRadius: 1,
                }}
              />
            </Stack>
          </Box>

          <Box sx={{ borderBottom: 1, borderColor: 'divider', px: { xs: 2, md: 3 } }}>
            <Box sx={{ display: 'flex', gap: { xs: 2, md: 3 }, py: 2, overflowX: 'auto' }}>
              {[1, 2, 3, 4, 5, 6].map((tab) => (
                <Box
                  key={tab}
                  sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0 }}
                >
                  <Skeleton variant="circular" width={24} height={24} />
                </Box>
              ))}
            </Box>
          </Box>

          <Box sx={{ p: { xs: 2, md: 4 } }}>
            <Grid container spacing={{ xs: 2, md: 3 }} sx={{ width: '100%' }}>
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
