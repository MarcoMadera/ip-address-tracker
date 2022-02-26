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
import { NextApiRequest } from "next";
import { AppProps, Data } from "types/data";

const App = ({
  ip,
  lat,
  lon,
  country,
  region,
  city,
}: AppProps): ReactElement => {
  const defaultData: Data = useMemo(
    () => ({
      ip,
      lat,
      lon,
      country,
      region,
      city,
      isp: "--",
      time_zone: "--",
      region_code: "--",
      postal: "--",
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
      fetch(`/api/iplocation?ip=${ip}`)
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

App.getInitialProps = async ({
  req,
}: {
  req: NextApiRequest;
}): Promise<AppProps> => {
  const cookies = req ? req?.headers?.cookie : undefined;
  const resiplocationCookie = cookies
    ?.split("; ")
    ?.find((c) => c.startsWith("resiplocation"))
    ?.split("=")[1]
    ?.split("%5B%3B");

  const ip = resiplocationCookie ? resiplocationCookie[0] : null;
  const lat = resiplocationCookie ? resiplocationCookie[1] : null;
  const lon = resiplocationCookie ? resiplocationCookie[2] : null;
  const country = resiplocationCookie ? resiplocationCookie[3] : null;
  const region = resiplocationCookie ? resiplocationCookie[4] : null;
  const city = resiplocationCookie ? resiplocationCookie[5] : null;
  return { ip, lat, lon, country, region, city };
};

export default App;
