import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';

import { useResponsive } from 'src/hooks/use-responsive';

import { bgBlur } from 'src/theme/css';

import { useSettingsContext } from 'src/components/settings';

import AccountPopover from '../common/account-popover';
import LanguagePopover from '../common/language-popover';

import { NAV, HEADER } from '../config-layout';
import { IconButton, Box } from '@mui/material';
import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

type Props = {
  onOpenNav?: VoidFunction;
};

export default function Header({ onOpenNav }: Props) {
  const theme = useTheme();
  const settings = useSettingsContext();
  const lgUp = useResponsive('up', 'lg');

  const isNavHorizontal = settings.themeLayout === 'horizontal';
  const isNavMini = settings.themeLayout === 'mini';

  const offsetLeft = lgUp && !isNavHorizontal ? (isNavMini ? NAV.W_MINI : NAV.W_VERTICAL) : 0;

  return (
    <AppBar
      position="fixed"
      sx={{
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.drawer - 1,
        backgroundColor: 'transparent',
        backdropFilter: 'none',
        WebkitBackdropFilter: 'none',
        transition: theme.transitions.create(['width', 'left'], {
          duration: theme.transitions.duration.shorter,
        }),
        boxShadow: 'none',
        borderBottom: 'none',
        ...(lgUp && {
          width: `calc(100% - ${offsetLeft}px)`,
          left: offsetLeft,
        }),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { xs: 2, lg: 3 },
        }}
      >
        {!lgUp && (
          <IconButton
            onClick={onOpenNav}
            sx={{
              p: 0.75,
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
              sx={{ width: 20, height: 20 }}
            />
          </IconButton>
        )}
        {/* Spacer to push items to the right */}
        <Stack sx={{ flexGrow: 1 }} />

        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.75,
              px: 1.25,
              py: 0.75,
              bgcolor: 'background.paper',
              borderRadius: 2,
              border: '1px solid #E2E8F0',
              boxShadow: '0px 6px 18px rgba(15, 23, 42, 0.08)',
            }}
          >
            <IconButton
              sx={{
                width: 40,
                height: 40,
              }}
            >
              <SvgColor
                src="/assets/icons/topnav/notifications.svg"
                sx={{ width: 24, height: 24 }}
              />
            </IconButton>

            <IconButton
              sx={{
                width: 40,
                height: 40,
              }}
            >
              <SvgColor src="/assets/icons/topnav/settings.svg" sx={{ width: 24, height: 24 }} />
            </IconButton>

            <IconButton
              sx={{
                width: 40,
                height: 40,
              }}
            >
              <SvgColor src="/assets/icons/topnav/light-mode.svg" sx={{ width: 24, height: 24 }} />
            </IconButton>

            <LanguagePopover />
            <AccountPopover />
          </Box>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
