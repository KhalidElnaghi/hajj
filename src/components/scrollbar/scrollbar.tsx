'use client';

import { memo, forwardRef, useState, useEffect } from 'react';

import Box from '@mui/material/Box';

import { ScrollbarProps } from './types';
import { StyledScrollbar, StyledRootScrollbar } from './styles';

// ----------------------------------------------------------------------

const Scrollbar = forwardRef<HTMLDivElement, ScrollbarProps>(({ children, sx, ...other }, ref) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent;
    const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    setIsMobile(mobile);
  }, []);

  if (isMobile) {
    return (
      <Box ref={ref} sx={{ overflow: 'auto', ...sx }} {...other}>
        {children}
      </Box>
    );
  }

  return (
    <StyledRootScrollbar>
      <StyledScrollbar
        scrollableNodeProps={{
          ref,
        }}
        clickOnTrack={false}
        sx={sx}
        {...other}
      >
        {children}
      </StyledScrollbar>
    </StyledRootScrollbar>
  );
});

export default memo(Scrollbar);
