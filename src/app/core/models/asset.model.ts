export type AssetStatus =
  | 'Active'
  | 'Available'
  | 'Checked Out'
  | 'Maintenance'
  | 'Retired'
  | 'Sold';

export interface Asset {
  id?: number;
  name: string;
  tag: string;
  serialNumber?: string;
  category: string;
  status: AssetStatus;
  location?: string;
  assignedTo?: string;
  purchaseDate?: string;
  purchasePrice?: number;
  warrantyExpires?: string;
  supplier?: string;
  notes?: string;
  createdAt?: string;
}

export interface Activity {
  id: number;
  assetTag: string;
  assetName: string;
  action: 'added' | 'checked_out' | 'checked_in' | 'maintenance' | 'broken' | 'sold';
  performedBy: string;
  date: string;
}
