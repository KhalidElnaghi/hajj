import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';

import LinkItem from './link-item';
import { CustomBreadcrumbsProps } from './types';

// ----------------------------------------------------------------------

export default function CustomBreadcrumbs({
  links,
  action,
  heading,
  moreLink,
  activeLast,
  sx,
  ...other
}: CustomBreadcrumbsProps) {
  const lastLink = links[links.length - 1]?.name;

  return (
    <Box sx={{ ...sx }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={{ xs: 1, sm: 1.25 }}
        flexWrap="nowrap"
        sx={{ width: '100%' }}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={0.75}
          sx={{ minWidth: 0, flexWrap: 'nowrap' }}
        >
          {heading && (
            <Typography variant="h6" sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}>
              {heading}
            </Typography>
          )}

          {!!links.length && (
            <Breadcrumbs
              separator={<Separator />}
              {...other}
              sx={{
                color: 'text.secondary',
                typography: 'body2',
                display: 'flex',
                flexWrap: 'nowrap',
                whiteSpace: 'nowrap',
                overflowX: 'auto',
                pb: 0.25,
                minWidth: 0,
                '& .MuiBreadcrumbs-separator': {
                  color: 'text.secondary',
                  mx: 0.75,
                  fontSize: 12,
                },
                '& .MuiBreadcrumbs-li': {
                  alignItems: 'center',
                  minWidth: 0,
                },
              }}
            >
              {links.map((link) => (
                <LinkItem
                  key={link.name || ''}
                  link={link}
                  activeLast={activeLast}
                  disabled={link.name === lastLink}
                />
              ))}
            </Breadcrumbs>
          )}
        </Stack>

        {action && <Box sx={{ flexShrink: 0 }}> {action} </Box>}
      </Stack>

      {/* MORE LINK */}
      {!!moreLink && (
        <Box sx={{ mt: 2 }}>
          {moreLink.map((href) => (
            <Link
              key={href}
              href={href}
              variant="body2"
              target="_blank"
              rel="noopener"
              sx={{ display: 'table' }}
            >
              {href}
            </Link>
          ))}
        </Box>
      )}
    </Box>
  );
}

// ----------------------------------------------------------------------

function Separator() {
  return (
    <Box
      component="span"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        color: 'text.secondary',
        fontSize: 12,
        fontWeight: 600,
      }}
    >
      {'>'}
    </Box>
  );
}
