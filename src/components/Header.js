import React, { useEffect, useState, useCallback } from "react";
import "./css/Header.css";
import ArrowIcon from "./icons/ArrowIcon";
import PropTypes from "prop-types";
import Dialog from "../components/Dialog";
const Header = ({ data, searchIp }) => {
  const [search, setSearch] = useState({
    value: "",
    error: false,
    submitted: false,
  });
  const [showDialog, setShowDialog] = useState(!!data);

  useEffect(() => {
    if (search.submitted === true && search.error === false) {
      searchIp(search.value);
    }
  }, [search.error, search.submitted, search.value, searchIp]);

  const handleChange = useCallback((event) => {
    const res = event.target.value;
    setSearch({ value: res, error: false, submitted: false });
  }, []);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      setSearch({
        ...search,
        error:
          !ipValidate.test(search.value) && !domainValidate.test(search.value),
        submitted: true,
      });
    },
    [domainValidate, ipValidate, search]
  );

  const ipValidate = RegExp(
    /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$$/
  );
  const domainValidate = RegExp(
    /^(((?!-))(xn--|_{1,1})?[a-z0-9-]{0,61}[a-z0-9]{1,1}\.)*(xn--)?([a-z0-9][a-z0-9-]{0,60}|[a-z0-9-]{1,30}\.[a-z]{2,})$/
  );

  let outline = { outline: "unset" };
  if (search.error && search.submitted) {
    outline = { border: "1px solid red" };
  }

  return (
    <header className="Header">
      <section className="section">
        <h1 className="Header__title">IP Address Tracker</h1>
        <form className="Header__form">
          <input
            type="text"
            onChange={handleChange}
            className="Header__form__input"
            placeholder={"Search for any IP address or domain"}
            style={outline}
            onClick={() => setShowDialog(true)}
            onFocus={() => setShowDialog(true)}
          />
          <button className="Header__form__label" onClick={handleSubmit}>
            <ArrowIcon width={16} height={16} />
          </button>
        </form>
        {search.error && search.submitted && (
          <p>Please insert a valid ip or domain name</p>
        )}
      </section>
      {data && (
        <Dialog
          data={data}
          showDialog={showDialog}
          setShowDialog={setShowDialog}
        />
      )}
    </header>
  );
};

Header.propTypes = {
  data: PropTypes.object,
  searchIp: PropTypes.func,
};

export default Header;
