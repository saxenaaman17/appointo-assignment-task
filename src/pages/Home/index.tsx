import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import styles from "./index.module.css";
import Dropdown from "../../components/Dropdown/Dropdown";
import Slot from "../../components/Slot/Slot";
import { useFetchTimeSlotsQuery } from "../../apis/api";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../reducers/store";
import {
  setAppointmentDate,
  setAppointmentSlot,
  Value,
} from "../../reducers/homeReducer";
import { formatDate, formatTime } from "../../utils/general-utils";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const Home = () => {
  const dispatch = useDispatch();
  const appointmentDate = useSelector(
    (state: AppState) => state.home.appointmentDate
  );
  const appointmentSlot = useSelector(
    (state: AppState) => state.home.appointmentSlot
  );

  const { data, isFetching } = useFetchTimeSlotsQuery(
    {
      startDate: formatDate(appointmentDate),
      endDate:
        appointmentDate && !Array.isArray(appointmentDate)
          ? formatDate(
              new Date(appointmentDate.getTime() + 24 * 60 * 60 * 1000)
            )
          : "",
    },
    {
      skip: !appointmentDate,
      refetchOnMountOrArgChange: 30,
    }
  );

  const handleDateChange = (value: Value) => {
    dispatch(setAppointmentDate({ appointmentDate: value }));
  };

  const handleSlotClick = (value: string) => {
    dispatch(setAppointmentSlot({ appointmentSlot: value }));
  };

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
            onChange={handleDateChange}
            showWeekNumbers={false}
            value={appointmentDate}
            minDate={new Date()}
            prev2Label={null}
            next2Label={null}
          />
        </div>

        <div className={styles.buttonsContainer}>
          <Dropdown
            label="Select from variants"
            options={["20", "40", "60"]}
            value="20"
            onChange={(option) => console.log(option)}
          />
          <div className={styles.slotContainer}>
            {isFetching ? (
              <span>Fetching slots information...</span>
            ) : data && data?.length > 0 ? (
              data?.[0].slots?.map((slot) => {
                const starTime = formatTime(slot.start_time);
                const endTime = formatTime(slot.end_time);
                const value = `${starTime} - ${endTime}`;
                return (
                  <Slot
                    key={starTime}
                    value={value}
                    onClick={(value) => handleSlotClick(value)}
                    isSelected={appointmentSlot === value}
                  />
                );
              })
            ) : null}
          </div>
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
        <button className={styles.nextButton}>
          Next <MdOutlineKeyboardArrowRight size={25} />
        </button>
      </div>
    </div>
  );
};

export default Home;
