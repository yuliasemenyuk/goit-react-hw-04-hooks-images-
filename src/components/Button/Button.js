import React from "react";
import style from "./Button.module.css";
import PropTypes from "prop-types";

export default function Button({ more }) {
  return (
    <button className={style.Button} type="button" onClick={more}>
      Load more
    </button>
  );
}

Button.propTypes = {
  more: PropTypes.func.isRequired,
};