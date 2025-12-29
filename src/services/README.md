# Services Architecture

This directory contains the React Query-based API architecture for the application.

## Structure

```
services/
├── api/              # API functions (GET, POST, PUT, DELETE)
│   └── pilgrims.ts
├── queries/          # React Query hooks for fetching data
│   └── pilgrims/
├── mutations/        # React Query hooks for mutations (POST, PUT, DELETE)
│   └── pilgrims/
└── shared/           # Shared utilities (API client, query keys)
```

## Usage Examples

### Using Query Hooks in Components

```tsx
import { useFetchPilgrims } from 'src/services/queries/pilgrims';

const MyComponent = () => {
  const {
    data: pilgrimsData,
    isLoading: pilgrimsLoading,
    isError: pilgrimsError,
    refetch: refreshPilgrims,
  } = useFetchPilgrims({
    page: 1,
    searchParam: search ? searchParam : undefined,
    limit: 10,
  });

  if (pilgrimsLoading) return <div>Loading...</div>;
  if (pilgrimsError) return <div>Error loading pilgrims</div>;

  return (
    <div>
      {pilgrimsData?.data?.map((pilgrim) => (
        <div key={pilgrim.id}>{pilgrim.name}</div>
      ))}
    </div>
  );
};
```

### Using Mutation Hooks

```tsx
import { useCreatePilgrim, useUpdatePilgrim, useDeletePilgrim } from 'src/services/mutations/pilgrims';

const PilgrimForm = () => {
  const createPilgrim = useCreatePilgrim();
  const updatePilgrim = useUpdatePilgrim();
  const deletePilgrim = useDeletePilgrim();

  const handleCreate = async (data) => {
    try {
      await createPilgrim.mutateAsync(data);
      // Success - query will automatically refetch
    } catch (error) {
      // Handle error
    }
  };

  const handleUpdate = async (id, data) => {
    try {
      await updatePilgrim.mutateAsync({ id, data });
      // Success - queries will automatically invalidate and refetch
    } catch (error) {
      // Handle error
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletePilgrim.mutateAsync(id);
      // Success - queries will automatically invalidate and refetch
    } catch (error) {
      // Handle error
    }
  };

  return (
    // Your form JSX
  );
};
```

## API Client

The API client is configured in `shared/functions/axios.ts` and uses your existing axios setup from `src/utils/axios.ts`. It automatically:
- Adds authentication tokens
- Sets language headers
- Handles errors

## Query Keys

Query keys are managed centrally in `shared/query-keys.ts` to ensure consistency and easy invalidation.

