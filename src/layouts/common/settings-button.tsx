import { m } from 'framer-motion';
import { usePathname } from 'next/navigation';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { Theme, SxProps } from '@mui/material/styles';

import SvgColor from 'src/components/svg-color';
import { varHover } from 'src/components/animate';
import { useSettingsContext } from 'src/components/settings';

import LanguagePopover from './language-popover';

// ----------------------------------------------------------------------

type Props = {
  sx?: SxProps<Theme>;
};

export default function SettingsButton({ sx }: Props) {
  const settings = useSettingsContext();
  const pathname = usePathname();
  return (
    /*  <Badge
       color="error"
       variant="dot"
       invisible={!settings.canReset}
       sx={{
         [`& .${badgeClasses.badge}`]: {
           top: 8,
           right: 8,
         },
         ...sx,
       }}
     > */
    <Box
      component={m.div}
      /*   animate={{
           rotate: [0, settings.open ? 0 : 360],
         }}
        */
      transition={{
        duration: 12,
        ease: 'linear',
        //   repeat: Infinity,
      }}
    >
      <IconButton
        component={m.button}
        whileTap="tap"
        whileHover="hover"
        variants={varHover(1.05)}
        aria-label="settings"
        onClick={() =>
          settings.onUpdate('themeMode', settings.themeMode === 'light' ? 'dark' : 'light')
        }
        sx={{
          width: 40,
          height: 40,
        }}
      >
        <SvgColor
          src={`/assets/icons/setting/ic_${settings.themeMode === 'light' ? 'sun' : 'moon'}.svg`}
        />
        {/*   <Iconify icon={settings.themeMode === 'light' ? 'dark' : 'solar:moon-sleep-bold-duotone'} width={24} /> */}
      </IconButton>
      {pathname.includes('questions') && <LanguagePopover />}
    </Box>
    /* </Badge> */
  );
}
