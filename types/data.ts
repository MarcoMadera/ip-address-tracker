export interface AppProps {
  ip: string | null;
  lat: string | null;
  lon: string | null;
  country: string | null;
  region: string | null;
  city: string | null;
}

export type Data = AppProps & {
  isp: string;
  time_zone: string;
  postal: string;
  region_code: string;
};
