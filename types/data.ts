export interface AppProps {
  ip: string;
  lat: string;
  lon: string;
  country: string;
  region: string;
  city: string;
}

export type Data = AppProps & {
  isp: string;
  time_zone: string;
  postal: string;
  region_code: string;
};
