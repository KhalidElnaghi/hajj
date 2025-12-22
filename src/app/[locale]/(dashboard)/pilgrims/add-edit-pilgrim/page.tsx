import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import AddEditPilgrimForm from 'src/sections/pilgrims/add-edit-pilgrim-form';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata');

  return {
    title: t('pilgrims_management'),
  };
}

export default function AddEditPilgrimPage() {
  return <AddEditPilgrimForm />;
}

