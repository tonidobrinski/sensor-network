export type TelescopeDetails = {
  id?: string;
  name: string;
  network: string;
  location: string;
  latitude: number;
  longitude: number;
  elevation: number;
  status?: string;
  lastObservation?: string;
  image?: string;
  description?: string;
};
