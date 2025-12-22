// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '',
  DASHBOARD: '/',
};

// ----------------------------------------------------------------------

export const paths = {
  auth: {
    jwt: {
      login: `${ROOTS.AUTH}/login`,
    },
  },
  dashboard: {
    root: ROOTS.DASHBOARD,
    pilgrims: {
      root: `${ROOTS.DASHBOARD}pilgrims`,
      list: `${ROOTS.DASHBOARD}pilgrims/list`,
      new: `${ROOTS.DASHBOARD}pilgrims/new`,
      edit: (id: string) => `${ROOTS.DASHBOARD}pilgrims/${id}/edit`,
      view: (id: string) => `${ROOTS.DASHBOARD}pilgrims/${id}`,
      addEdit: `${ROOTS.DASHBOARD}pilgrims/add-edit-pilgrim`,
    },
    supervisors: {
      root: `${ROOTS.DASHBOARD}supervisors`,
      list: `${ROOTS.DASHBOARD}supervisors/list`,
      new: `${ROOTS.DASHBOARD}supervisors/new`,
      edit: (id: string) => `${ROOTS.DASHBOARD}supervisors/${id}/edit`,
      view: (id: string) => `${ROOTS.DASHBOARD}supervisors/${id}`,
    },
    transportation: {
      root: `${ROOTS.DASHBOARD}transportation`,
      vehicles: `${ROOTS.DASHBOARD}transportation/vehicles`,
      routes: `${ROOTS.DASHBOARD}transportation/routes`,
      schedule: `${ROOTS.DASHBOARD}transportation/schedule`,
    },
    accommodation: {
      root: `${ROOTS.DASHBOARD}accommodation`,
      buildings: `${ROOTS.DASHBOARD}accommodation/buildings`,
      rooms: `${ROOTS.DASHBOARD}accommodation/rooms`,
      assignments: `${ROOTS.DASHBOARD}accommodation/assignments`,
    },
    healthcare: {
      root: `${ROOTS.DASHBOARD}healthcare`,
      medical: `${ROOTS.DASHBOARD}healthcare/medical`,
      appointments: `${ROOTS.DASHBOARD}healthcare/appointments`,
      records: `${ROOTS.DASHBOARD}healthcare/records`,
    },
    requests: {
      root: `${ROOTS.DASHBOARD}requests`,
      pending: `${ROOTS.DASHBOARD}requests/pending`,
      approved: `${ROOTS.DASHBOARD}requests/approved`,
      rejected: `${ROOTS.DASHBOARD}requests/rejected`,
    },
    reports: {
      root: `${ROOTS.DASHBOARD}reports`,
      statistics: `${ROOTS.DASHBOARD}reports/statistics`,
      analytics: `${ROOTS.DASHBOARD}reports/analytics`,
      export: `${ROOTS.DASHBOARD}reports/export`,
    },
  },
};
