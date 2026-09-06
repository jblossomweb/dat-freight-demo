export type EquipmentType = 'Van' | 'Flatbed' | 'Reefer';
export type LoadStatus = 'Available' | 'In Transit' | 'Delivered';

export interface Load {
  id: string;
  companyName: string;
  origin: string;
  destination: string;
  weight: number;
  equipmentType: EquipmentType;
  date: string; // ISO string, eg '2024-06-27'
  price: number;
  distance: number;
  status: LoadStatus;
}
