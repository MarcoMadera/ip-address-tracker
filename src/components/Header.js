import React, { useState, useCallback } from "react";
import "./css/Header.css";
import ArrowIcon from "./icons/ArrowIcon";
import PropTypes from "prop-types";
const Header = ({ ip = "" }) => {
  const [search, setSearch] = useState({
    value: "",
    error: false,
    submitted: false,
  });

  const handleChange = useCallback((event) => {
    const res = event.target.value;
    setSearch({ value: res, error: false, submitted: false });
  }, []);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      setSearch({
        error: !ipValidade.test(search.value),
        submitted: true,
      });
    },
    [ipValidade, search.value]
  );

  const ipValidade = RegExp(
    /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$$/
  );

  let outline = { outline: "unset" };
  if (search.error && search.submitted) {
    outline = { border: "1px solid red" };
  }

  return (
    <header className="Header">
      <section className="section">
        <h2>IP Address Tracker</h2>
        <form className="SearchFilter">
          <input
            type="text"
            onChange={handleChange}
            className="SearchFilter__input"
            placeholder={ip}
            style={outline}
          />
          <button className="SearchFilter__label" onClick={handleSubmit}>
            <ArrowIcon width={18} height={18} />
          </button>
        </form>
        {search.error && search.submitted && <p>Please insert a valid ip</p>}
      </section>
    </header>
  );
};

Header.propTypes = {
  ip: PropTypes.string,
};

export default Header;
