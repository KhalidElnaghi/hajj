import { getServerUser } from 'src/actions/auth';

import { Params } from 'src/utils/axios';

import CutomAutocompleteView from './CutomAutocompleteView';

interface props {
  fetchItems: (params: Params) => Promise<any>;
  label: string;
  placeholder: string;
  name: string;
  search?: string;
  searchQuery?: string;
}

export default async function CustomAutoCompelete({
  fetchItems,
  label,
  placeholder,
  name,
  search,
  searchQuery,
}: props) {
  const user = await getServerUser();
  if (!user || !user.access_token) {
    throw new Error('User not found in cookies');
  }
  const res = await fetchItems({
    page: 1,
    limit: 35,
    filters: search,
    headers: {
      access_token: user.access_token,
    },
  });
  return (
    <CutomAutocompleteView
      searchQuery={searchQuery}
      items={res?.data?.data}
      label={label}
      placeholder={placeholder}
      name={name}
    />
  );
}
