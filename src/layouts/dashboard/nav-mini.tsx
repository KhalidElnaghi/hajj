import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import { Theme } from '@mui/material/styles';

import { useMockedUser } from 'src/hooks/use-mocked-user';

import { hideScroll } from 'src/theme/css';

import { NavSectionMini } from 'src/components/nav-section';
import SvgColor from 'src/components/svg-color';
import { useSettingsContext } from 'src/components/settings';

import { NAV } from '../config-layout';
import { useNavData } from './config-navigation';

// ----------------------------------------------------------------------

export default function NavMini() {
  const { user } = useMockedUser();
  const settings = useSettingsContext();
  const navData = useNavData();

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.W_MINI },
      }}
    >
      <Stack
        sx={{
          pb: 2,
          height: 1,
          position: 'fixed',
          width: NAV.W_MINI,
          bgcolor: 'background.default',
          borderRight: (theme: Theme) => `dashed 1px ${theme.palette.divider}`,
          ...hideScroll.x,
        }}
      >
        <Box
          sx={{
            my: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <IconButton
            size="small"
            onClick={() =>
              settings.onUpdate(
                'themeLayout',
                settings.themeLayout === 'vertical' ? 'mini' : 'vertical'
              )
            }
            sx={{
              width: 36,
              height: 36,
              p: 0.5,
              borderRadius: 1.5,
              border: '1px solid #E2E8F0',
              bgcolor: '#FFFFFF',
              boxShadow: '0px 4px 12px rgba(15, 23, 42, 0.06)',
              '&:hover': {
                bgcolor: '#F8FAFC',
              },
            }}
          >
            <SvgColor
              src="/assets/icons/navbar/sidenav_toggle.svg"
              sx={{ width: 16, height: 16 }}
            />
          </IconButton>
        </Box>

        <NavSectionMini
          data={navData as any}
          slotProps={{
            currentRole: user?.role,
          }}
        />
      </Stack>
    </Box>
  );
}
