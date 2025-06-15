export interface Store {
  _id: string;
  name: string;
  address: string;
  location: string;
  description?: string;
  image?: string;
  phone: string;
  email: string;
  latitude: number;
  longitude: number;
  type: string;   
  premium: boolean;
}