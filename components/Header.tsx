import React, { useEffect, useState, useCallback, ReactElement } from "react";
import ArrowIcon from "./icons/ArrowIcon";
import Dialog from "./Dialog";
import { isValidIp } from "utils/isValidIp";
import { Data } from "types/data";
import { isValidDomain } from "utils/isValidDomain";

const Header = ({
  data,
  searchIp,
}: {
  data: Data;
  searchIp: (ip: string) => void;
}): ReactElement => {
  const [search, setSearch] = useState({
    value: "",
    error: false,
    submitted: false,
  });
  const showDialog = !!data.ip;

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
      const isValidIpAddress =
        isValidIp(search.value) || isValidDomain(search.value);
      setSearch({
        ...search,
        error: !isValidIpAddress,
        submitted: true,
      });
    },
    [search]
  );

  let outline = { outline: "unset", border: "unset" };
  if (search.error && search.submitted) {
    outline = { outline: "unset", border: "1px solid red" };
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
          />
          <button className="Header__form__label" onClick={handleSubmit}>
            <ArrowIcon width={16} height={16} />
          </button>
        </form>
        {search.error && search.submitted && (
          <p>Please enter a valid IP address or domain.</p>
        )}
      </section>
      {showDialog && <Dialog data={data} />}
      <style jsx>{`
        :root {
          --borderRadius: 15px;
        }
        .Header {
          height: 300px;
          background: url("/images/pattern-bg.png");
          background-size: cover;
          background-position-x: center;
        }

        .section {
          margin: 0 24px 26px 24px;
        }

        .Header__title {
          color: white;
          padding: 26px 0 29px 0;
          font-size: 1.59em;
          font-weight: 500;
        }

        .Header button {
          width: 58px;
          height: 58px;
          background: black;
          border-radius: 0 var(--borderRadius) var(--borderRadius) 0;
          border: none;
          cursor: pointer;
        }

        .Header__form {
          display: inline-flex;
          position: relative;
          align-items: center;
          background-color: white;
          width: 100%;
          max-width: 557px;
          box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.05);
          border-radius: var(--borderRadius);
        }

        .Header__form:hover,
        .Header__form:focus {
          box-shadow: 0px 2px 7px 0px rgba(0, 0, 0, 0.07);
        }
        .darkMode .Header__form:hover,
        .darkMode .Header__form:focus {
          box-shadow: 0px 2px 5px 0px rgba(90, 90, 90, 0.07);
        }

        .Header__form__label {
          position: absolute;
          height: 100%;
          width: 58px;
          background: black;
          left: calc(100% - 58px);
          border-radius: 0 var(--borderRadius) var(--borderRadius) 0;
        }

        .Header__form__input {
          height: 58px;
          width: 100%;

          border: none;
          padding-left: 24px;
          color: var(--Very-Dark-Gray);
          letter-spacing: 0;
          font-weight: 500;
          border-radius: var(--borderRadius);
          font-size: 1.1em;
        }
        @media screen and (min-width: 888px) {
          .Header {
            height: 280px;
          }
          .Header__title {
            font-size: 1.9em;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
