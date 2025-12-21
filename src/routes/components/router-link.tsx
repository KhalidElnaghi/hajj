import { forwardRef } from 'react';
import { Link } from 'src/i18n/routing';
import type { ComponentProps } from 'react';

// ----------------------------------------------------------------------

type LinkProps = ComponentProps<typeof Link>;

const RouterLink = forwardRef<HTMLAnchorElement, LinkProps>(({ ...other }, ref) => (
  <Link ref={ref} {...other} />
));

export default RouterLink;
