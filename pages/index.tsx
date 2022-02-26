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
  const [error, setError] = useState(false);
  const Map = dynamic(() => import("../components/Map"), {
    loading: () => <p>A map is loading</p>,
    ssr: false,
  });

  useEffect(() => {
    if (ip || lat || lon) {
      return;
    }
    fetch(`/api/iplocation?ip=${ip}`)
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      })
      .catch(() => setError(true));
  }, [ip, lat, lon]);

  const searchIp = useCallback(
    (ip) => {
      setError(false);
      fetch("/api/iplocation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ipAddress: ip }),
      })
        .then((res) => res.json())
        .then((res) => {
          res.status === "fail" ? setData(defaultData) : setData(res);
        })
        .catch(() => setError(true));
    },
    [defaultData]
  );

  return (
    <>
      <Head>
        <title>Frontend Mentor | IP Address Tracker</title>
      </Head>
      <Header data={data} searchIp={searchIp} />
      {error && <h1>Something went wrong</h1>}
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
