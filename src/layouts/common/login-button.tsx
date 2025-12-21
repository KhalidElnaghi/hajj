import Button from '@mui/material/Button';
import { Theme, SxProps } from '@mui/material/styles';
import { useTranslations } from 'next-intl';

import { RouterLink } from 'src/routes/components';

import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

type Props = {
  sx?: SxProps<Theme>;
};

export default function LoginButton({ sx }: Props) {
  const t = useTranslations();
  return (
    <Button
      component={RouterLink}
      href={paths.auth.jwt.login}
      variant="outlined"
      sx={{ mr: 1, ...sx }}
    >
      {t('Login')}
    </Button>
  );
}
