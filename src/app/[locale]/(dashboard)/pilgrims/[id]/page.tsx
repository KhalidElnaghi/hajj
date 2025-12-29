import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import PilgrimDetailsView from 'src/sections/pilgrims/pilgrim-details-view';

type Props = {
  params: Promise<{ id: string; locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations('Metadata');
  const { id } = await params;

  return {
    title: `${t('pilgrims_management')} - ${id}`,
  };
}

export default async function PilgrimDetailsPage({ params, searchParams }: Props) {
  const { id } = await params;
  const resolvedSearchParams = await searchParams;
  const isEdit = resolvedSearchParams.isEdit === 'true';

  return <PilgrimDetailsView pilgrimId={id} isEditMode={isEdit} />;
}

