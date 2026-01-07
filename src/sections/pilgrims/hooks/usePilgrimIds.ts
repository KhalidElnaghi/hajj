'use client';

import { useMemo } from 'react';

type PilgrimLike = { id?: number | string; pilgrimId?: number | string };

/**
 * Derives numeric pilgrim IDs from various pilgrim-like shapes.
 */
export function usePilgrimIds<T extends PilgrimLike>(selectedPilgrims?: T[] | null): number[] {
  return useMemo(
    () =>
      (selectedPilgrims ?? [])
        .map((pilgrim) => Number(pilgrim?.id ?? pilgrim?.pilgrimId))
        .filter((id) => Number.isFinite(id)),
    [selectedPilgrims]
  );
}
