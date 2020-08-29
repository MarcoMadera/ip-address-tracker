import React, { useState, useEffect } from "react";
import Map from "./components/Map";
import Header from "./components/Header";

import "./App.css";

const App = () => {
  const [data, setData] = useState();
  const [error, setError] = useState(false);
  useEffect(() => {
    fetch(
      "http://ip-api.com/json/?fields=query,city,region,countryCode,timezone,isp,lat,lon"
    )
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      })
      .catch(() => setError(true));
  }, []);

  return (
    <>
      <Header ip={data && data.query} />
      <Map lat={data ? data.lat : 0} lon={data ? data.lon : 0} />
    </>
  );
};

export default App;
