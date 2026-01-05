// ----------------------------------------------------------------------

export type SettingsTile = {
  key: string;
  title: string;
  description: string;
  path: string;
};

// ----------------------------------------------------------------------

export const settingsTiles: SettingsTile[] = [
  {
    key: 'general-settings',
    title: 'General Settings',
    description: 'Configure general system settings and preferences',
    path: '/settings/general-settings',
  },
  {
    key: 'packages',
    title: 'Packages',
    description: 'Manage package configurations and options',
    path: '/settings/packages',
  },
  {
    key: 'booking-statuses',
    title: 'Booking Statuses',
    description: 'Configure booking status types and workflows',
    path: '/settings/booking-statuses',
  },
  {
    key: 'gathering-point-types',
    title: 'Gathering Point Types',
    description: 'Manage gathering point type definitions',
    path: '/settings/gathering-point-types',
  },
  {
    key: 'destinations',
    title: 'Destinations',
    description: 'Configure destination locations and details',
    path: '/settings/destinations',
  },
  {
    key: 'tags',
    title: 'Tags',
    description: 'Manage tag categories and labels',
    path: '/settings/tags',
  },
  {
    key: 'taggables',
    title: 'Taggables',
    description: 'Configure taggable entities and relationships',
    path: '/settings/taggables',
  },
  {
    key: 'security-offices',
    title: 'Security Offices',
    description: 'Manage security office locations and information',
    path: '/settings/security-offices',
  },
  {
    key: 'request-types',
    title: 'Request Types',
    description: 'Configure request type categories and settings',
    path: '/settings/request-types',
  },
  {
    key: 'order-sources',
    title: 'Order Sources',
    description: 'Manage order source types and configurations',
    path: '/settings/order-sources',
  },
  {
    key: 'job-titles',
    title: 'Job Titles',
    description: 'Configure job title definitions and hierarchy',
    path: '/settings/job-titles',
  },
  {
    key: 'countries',
    title: 'Countries',
    description: 'Manage country data and configurations',
    path: '/settings/countries',
  },
  {
    key: 'cities',
    title: 'Cities',
    description: 'Manage city data and location information',
    path: '/settings/cities',
  },
];

