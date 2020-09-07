import React, { useState, useEffect, useCallback } from "react";
import Map from "./components/Map";
import Header from "./components/Header";
import "./App.css";
const App = () => {
  const { IP_DATA_KEY: ipkey } = process.env;
  const [data, setData] = useState();
  const [error, setError] = useState(false);
  useEffect(() => {
    fetch(`https://api.ipdata.co/?api-key=${ipkey}`)
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      })
      .catch(() => setError(true));
  }, [ipkey]);

  const searchIp = useCallback(
    (ip) => {
      fetch(`https://api.ipdata.co/${ip}?api-key=${ipkey}`)
        .then((res) => res.json())
        .then((res) => {
          res.status === "fail" ? setData() : setData(res);
        })
        .catch(() => setError(true));
    },
    [ipkey]
  );

  return (
    <>
      <Header data={data} searchIp={searchIp} />
      {error && <h1>Something went wrong</h1>}
      <Map lat={data ? data.latitude : 0} lon={data ? data.longitude : 0} />
    </>
  );
};

export default App;
