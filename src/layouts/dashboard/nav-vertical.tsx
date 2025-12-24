import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer, { drawerClasses } from '@mui/material/Drawer';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

import { usePathname } from 'src/routes/hooks';

import { useResponsive } from 'src/hooks/use-responsive';
import { useMockedUser } from 'src/hooks/use-mocked-user';

import Scrollbar from 'src/components/scrollbar';
import { NavSectionVertical } from 'src/components/nav-section';
import Iconify from 'src/components/iconify';
import SvgColor from 'src/components/svg-color';
import { useSettingsContext } from 'src/components/settings';
import { useTranslations } from 'next-intl';

import { NAV } from '../config-layout';
import { useNavData } from './config-navigation';

// ----------------------------------------------------------------------

type Props = {
  openNav: boolean;
  onCloseNav: VoidFunction;
};

export default function NavVertical({ openNav, onCloseNav }: Props) {
  const { user } = useMockedUser();
  const t = useTranslations();
  const settings = useSettingsContext();
  const pathname = usePathname();
  const lgUp = useResponsive('up', 'lg');
  const navData = useNavData();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Stack spacing={2} sx={{ px: 2, pt: 3, pb: 2 }}>
        {/* Toggle Button / Close Button */}
        {lgUp ? (
          <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
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
                sx={{ width: 20, height: 20 }}
              />
            </IconButton>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton
              size="small"
              onClick={onCloseNav}
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
              <Iconify icon="eva:close-fill" width={20} height={20} />
            </IconButton>
          </Box>
        )}

        {/* Search Bar */}
        <TextField
          fullWidth
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t('Label.search')}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Box
                  component="img"
                  src="/assets/images/pilgrims/search.svg"
                  alt="search"
                  sx={{ width: 20, height: 20 }}
                />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              bgcolor: 'background.paper',
              borderRadius: 1,
              '&:hover': {
                bgcolor: 'background.neutral',
              },
              '& fieldset': {
                borderColor: 'transparent',
              },
              '&:hover fieldset': {
                borderColor: 'transparent',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'primary.main',
                borderWidth: '1px',
              },
            },
          }}
        />
      </Stack>

      <NavSectionVertical
        data={navData as any}
        slotProps={{
          currentRole: user?.role,
        }}
      />

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.W_VERTICAL },
      }}
    >
      {lgUp ? (
        <Stack
          sx={{
            height: 1,
            position: 'fixed',
            width: NAV.W_VERTICAL,
            bgcolor: '#F8FAFC',
            borderRight: 'none',
          }}
        >
          {renderContent}
        </Stack>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          sx={{
            [`& .${drawerClasses.paper}`]: {
              width: NAV.W_VERTICAL,
              bgcolor: '#F8FAFC',
              borderRight: 'none',
              backgroundImage: 'none !important',
              backdropFilter: 'none !important',
              WebkitBackdropFilter: 'none !important',
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
