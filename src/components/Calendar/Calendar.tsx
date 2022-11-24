import React, { useState } from "react";
import styles from "./Calendar.module.css";

const Calendar: React.FC = () => {
  const [type, setType] = useState<string>("old");
  return <div className={styles.calendarWrap}></div>;
};
