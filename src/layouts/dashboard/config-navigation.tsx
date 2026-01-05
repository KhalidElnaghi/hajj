import { useMemo } from 'react';

import { paths } from 'src/routes/paths';

// import { hasClientPermission } from 'src/utils/hasClientPermission';

import { useTranslations } from 'next-intl';

import SvgColor from 'src/components/svg-color';

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 24, height: 24 }} />
);

const ICONS = {
  main: icon('main'),
  pilgrims: icon('pilgrims_management'),
  supervisors: icon('supervisors_management'),
  transportation: icon('transportation'),
  accommodation: icon('accommodation'),
  healthcare: icon('healthcare'),
  requests: icon('requests_management'),
  reports: icon('reports_analytics'),
  settings: icon('reports_analytics'), // Using existing icon, can be replaced later
};

export function useNavData() {
  const t = useTranslations();
  const data = useMemo(
    () => [
      {
        items: [
          {
            title: t('Nav.main'),
            path: paths.dashboard.root,
            icon: ICONS.main,
          },
          {
            title: t('Nav.pilgrims_management'),
            path: paths.dashboard.pilgrims.root,
            icon: ICONS.pilgrims,
          },
          {
            title: t('Nav.supervisors_management'),
            path: paths.dashboard.supervisors.root,
            icon: ICONS.supervisors,
          },
          {
            title: t('Nav.transportation'),
            path: paths.dashboard.transportation.root,
            icon: ICONS.transportation,
          },
          {
            title: t('Nav.accommodation'),
            path: paths.dashboard.accommodation.root,
            icon: ICONS.accommodation,
          },
          {
            title: t('Nav.healthcare'),
            path: paths.dashboard.healthcare.root,
            icon: ICONS.healthcare,
          },
          {
            title: t('Nav.requests_management'),
            path: paths.dashboard.requests.root,
            icon: ICONS.requests,
          },
          {
            title: t('Nav.reports_analytics'),
            path: paths.dashboard.reports.root,
            icon: ICONS.reports,
          },
          {
            title: t('Nav.settings'),
            path: paths.dashboard.settings.root,
            icon: ICONS.settings,
          },
        ],
      },
    ],
    [t]
  );

  return data;
}
