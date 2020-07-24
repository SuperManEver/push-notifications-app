import React from "react";

import css from "./styles.module.sass";

export default function Header({ children }) {
  return <div className={css.header}>{children}</div>;
}
