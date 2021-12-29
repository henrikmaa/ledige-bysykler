export interface BikeHub {
  available_slots: number;
  available_vehicles: number;
  capacity: number;
  description: string | null;
  external_id: string;
  id: string;
  latitude: number;
  longitude: number;
  name: string;
  reserved_slots: number;
  reserved_vehicles: number;
  type: string;
}
