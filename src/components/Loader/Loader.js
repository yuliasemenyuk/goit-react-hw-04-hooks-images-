import React from "react";
import { ImSpinner2 } from "react-icons/im";
import style from "./Loader.module.css";

export default function Loader() {
  return (
    <div>
      <ImSpinner2 className={style.Loader} />
    </div>
  );
}