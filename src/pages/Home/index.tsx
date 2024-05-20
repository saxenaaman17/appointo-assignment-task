import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import styles from "./index.module.css";
import Dropdown from "../../components/Dropdown/Dropdown";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const Home = () => {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div className={styles.homeContainer}>
      <div className={styles.contentContainer}>
        <div className={styles.calendarContainer}>
          <span className={styles.title}>Test Service</span>
          <div className={styles.timezone}>
            <span className={styles.timezoneLabel}>Timezone: </span>
            <span>Asia/Calcutta</span>
          </div>

          <Calendar
            className={styles.calendar}
            onChange={onChange}
            showWeekNumbers
            value={value}
          />
        </div>

        <div>
          <Dropdown
            label="Select from variants"
            options={["20", "40", "60"]}
            value="20"
            onChange={(option) => alert(option)}
          />
        </div>
      </div>

      <div className={styles.actionsContainer}>
        <span className={styles.companyLabel}>
          Powered By{" "}
          <a
            href="https://apps.shopify.com/appointo-appointments-and-bookings"
            target="_blank"
          >
            Appointo
          </a>
        </span>
      </div>
    </div>
  );
};

export default Home;
