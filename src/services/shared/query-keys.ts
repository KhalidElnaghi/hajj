// Query key factory for consistent key management
export const queryKeys = {
  // Pilgrims
  pilgrims: {
    all: ['pilgrims'] as const,
    lists: () => [...queryKeys.pilgrims.all, 'list'] as const,
    list: (params?: any) => [...queryKeys.pilgrims.lists(), params] as const,
    details: () => [...queryKeys.pilgrims.all, 'detail'] as const,
    detail: (id: string | number) => [...queryKeys.pilgrims.details(), id] as const,
  },
};

// Helper to create query keys for new resources
export const createQueryKeys = (resourceName: string) => ({
  all: [resourceName] as const,
  lists: () => [resourceName, 'list'] as const,
  list: (params?: any) => [resourceName, 'list', params] as const,
  details: () => [resourceName, 'detail'] as const,
  detail: (id: string | number) => [resourceName, 'detail', id] as const,
});

