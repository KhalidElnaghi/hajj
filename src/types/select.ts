export type InfiniteOption<TMeta = unknown> = {
  label: string;
  value: string;
  meta?: TMeta;
};

export type InfiniteFetchParams = {
  search: string;
  cursor: number;
  limit: number;
};

export type InfiniteFetchResult<TMeta = unknown> = {
  items: InfiniteOption<TMeta>[];
  nextCursor: number | null;
  totalCount?: number;
};
