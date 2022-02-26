import React, { ReactElement } from "react";
import { Data } from "types/data";

const Dialog = ({ data }: { data: Data }): ReactElement => {
  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <dialog open={true} className="Dialog">
      <div className="Dialog__container">
        <div>
          <span className="Dialog__info">ip address</span>
          <p className="Dialog__infoData">{data.ip}</p>
        </div>
        <div>
          <span className="Dialog__info">location</span>
          <p className="Dialog__infoData">{`${data.city}, ${
            data.region_code || data.region
          } ${data.country} ${data.postal}`}</p>
        </div>
        <div>
          <span className="Dialog__info">timezone</span>
          <p className="Dialog__infoData">{data.time_zone}</p>
        </div>
        <div>
          <span className="Dialog__info">isp</span>
          <p className="Dialog__infoData">{data.isp && data.isp}</p>
        </div>
      </div>
      <style jsx>
        {`
          dialog {
            border: none;
            background: white;
            border-radius: 15px;
            position: absolute;
            z-index: 9999;
            text-align: center;
            width: calc(100% - 48px);
            left: 0;
            right: 0;
            margin: 0 auto;
          }
          .Dialog__container {
            padding: 28px;
          }

          .Dialog__info {
            font-size: 0.6em;
            font-weight: 500;
            color: var(--Dark-Gray);
            text-transform: uppercase;
          }
          .Dialog__infoData {
            font-size: 1em;
            font-weight: 500;
            color: black;
            margin-bottom: 10px;
          }

          @media screen and (min-width: 888px) {
            .Dialog {
              text-align: left;
              max-width: 1100px;
              margin-top: 20px;
            }
            .Dialog__container {
              display: grid;
              grid-template-columns: 1fr 1fr 1fr 1fr;
            }
            .Dialog__container div:nth-of-type(n + 2) {
              border-left: 1px solid var(--Dark-Gray);
              padding-left: 30px;
            }
            .Dialog__info {
              font-size: 0.8em;
            }
            .Dialog__infoData {
              font-size: 1.5em;
              margin-top: 10px;
            }
          }
        `}
      </style>
    </dialog>
  );
};

export default Dialog;
