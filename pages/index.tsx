import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  ReactElement,
} from "react";
import Header from "../components/Header";
import Head from "next/head";
import dynamic from "next/dynamic";
import { AppProps, Data } from "types/data";
import { NextApiRequestQuery } from "next/dist/server/api-utils";
import { makeAPIRequest } from "utils/makeAPIRequest";

const App = ({
  ip,
  lat,
  lon,
  country,
  region,
  city,
}: AppProps): ReactElement => {
  country = decodeURIComponent(country);
  city = decodeURIComponent(city);
  region = decodeURIComponent(region);

  const defaultData: Data = useMemo(
    () => ({
      ip,
      lat,
      lon,
      country,
      region,
      city,
      isp: "",
      time_zone: "",
      region_code: "",
      postal: "",
    }),
    [ip, lat, lon, country, region, city]
  );
  const [data, setData] = useState<Data>(defaultData);
  const [error, setError] = useState("");
  const Map = dynamic(() => import("../components/Map"), {
    loading: () => <p>A map is loading</p>,
    ssr: false,
  });

  useEffect(() => {
    if (ip || lat || lon) {
      return;
    }
    const requestPayload = { ipAddress: ip };
    makeAPIRequest("/api/iplocation", requestPayload, setData, setError);
  }, [ip, lat, lon]);

  const searchIp = useCallback((ip) => {
    setError("");
    const requestPayload = { ipAddress: ip };
    makeAPIRequest("/api/iplocation", requestPayload, setData, setError);
  }, []);

  return (
    <>
      <Head>
        <title>Frontend Mentor | IP Address Tracker</title>
      </Head>
      <Header
        data={data}
        searchIp={searchIp}
        error={error}
        setError={setError}
      />
      {data.ip ? (
        <Map
          lat={data.lat ? Number(data.lat) : 0}
          lon={data.lon ? Number(data.lon) : 0}
        />
      ) : null}
    </>
  );
};

export const getServerSideProps = ({
  query,
}: {
  query: NextApiRequestQuery;
}): { props: NextApiRequestQuery } => ({
  props: query,
});

export default App;
