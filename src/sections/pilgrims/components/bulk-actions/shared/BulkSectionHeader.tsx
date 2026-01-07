'use client';

import { Box, Typography } from '@mui/material';

interface BulkSectionHeaderProps {
  title: string;
  description?: string;
}

export default function BulkSectionHeader({ title, description }: BulkSectionHeaderProps) {
  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 700, fontSize: 16 }}>
        {title}
      </Typography>
      {description ? (
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5, fontSize: 13 }}>
          {description}
        </Typography>
      ) : null}
    </Box>
  );
}
