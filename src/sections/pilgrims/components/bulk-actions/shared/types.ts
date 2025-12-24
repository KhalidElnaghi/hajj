export type DialogView =
  | 'menu'
  | 'sms'
  | 'tags'
  | 'accommodation'
  | 'transportation'
  | 'camp'
  | 'gathering'
  | 'supervisors'
  | 'arrival'
  | 'shipping'
  | 'receipt';

export interface BulkActionViewProps {
  onBack: () => void;
  onClose: () => void;
  selectedCount: number;
}

export interface BulkActionOption {
  key: DialogView;
  label: string;
  icon: string;
}

