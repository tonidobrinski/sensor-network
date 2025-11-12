export type TTelescopeDetails = {
  id?: number;
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
