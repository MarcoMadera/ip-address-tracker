import React, { useState, useEffect, useCallback } from "react";
import Map from "./components/Map";
import Header from "./components/Header";

import "./App.css";

const App = () => {
  const [data, setData] = useState();
  const [error, setError] = useState(false);
  useEffect(() => {
    fetch(
      "http://ip-api.com/json/?fields=status,query,city,region,countryCode,timezone,isp,lat,lon,zip"
    )
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      })
      .catch(() => setError(true));
  }, []);

  const searchIp = useCallback((ip) => {
    fetch(
      `http://ip-api.com/json/${ip}?status,fields=query,city,region,countryCode,timezone,isp,lat,lon,zip`
    )
      .then((res) => res.json())
      .then((res) => {
        res.status === "fail" ? setData() : setData(res);
      })
      .catch(() => setError(true));
  }, []);

  return (
    <>
      <Header data={data} searchIp={searchIp} />
      {error && <h1>Something went wrong</h1>}
      <Map lat={data ? data.lat : 0} lon={data ? data.lon : 0} />
    </>
  );
};

export default App;
