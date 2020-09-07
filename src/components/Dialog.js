import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "./css/Dialog.css";
const Dialog = ({ data, showDialog, setShowDialog }) => {
  useEffect(() => {
    if (data) {
      setShowDialog(true);
    }
  }, [data, setShowDialog]);
  useEffect(() => {
    if (showDialog) {
      document.body.addEventListener("click", () => setShowDialog(false));
    } else {
      document.body.removeEventListener("click", () => setShowDialog(false));
    }
  }, [setShowDialog, showDialog]);

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <dialog
      open={showDialog}
      className="Dialog"
      onClick={(e) => {
        e.stopPropagation();
        setShowDialog(!showDialog);
      }}
      onKeyDown={(e) => {
        e.shiftKey && e.keyCode === 9 && setShowDialog(false);
      }}
    >
      <div className="Dialog__container">
        <div>
          <span className="Dialog__info">ip address</span>
          <p className="Dialog__infoData">{data.ip}</p>
        </div>
        <div>
          <span className="Dialog__info">location</span>
          <p className="Dialog__infoData">{`${data.city}, ${data.region_code} ${data.postal}`}</p>
        </div>
        <div>
          <span className="Dialog__info">timezone</span>
          <p className="Dialog__infoData">{data.time_zone.name}</p>
        </div>
        <div>
          <span className="Dialog__info">isp</span>
          <p className="Dialog__infoData">{data.asn && data.asn.name}</p>
        </div>
      </div>
    </dialog>
  );
};

Dialog.propTypes = {
  data: PropTypes.object,
  showDialog: PropTypes.bool,
  setShowDialog: PropTypes.func,
};

export default Dialog;
