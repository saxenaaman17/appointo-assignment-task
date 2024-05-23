import Calendar, { OnArgs } from "react-calendar";
import "react-calendar/dist/Calendar.css";

import styles from "./index.module.css";
import Dropdown from "../../components/Dropdown/Dropdown";
import Slot from "../../components/Slot/Slot";
import { useFetchTimeSlotsQuery } from "../../apis/api";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../reducers/store";
import {
  setActiveStartDate,
  setAppointmentDate,
  setAppointmentSlot,
  Value,
} from "../../reducers/homeReducer";
import {
  formatDate,
  formatTime,
  getNextMonthFirstDate,
} from "../../utils/general-utils";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const Home = () => {
  const dispatch = useDispatch();
  const activeStartDate = useSelector(
    (state: AppState) => state.home.activeStartDate
  );
  const appointmentDate = useSelector(
    (state: AppState) => state.home.appointmentDate
  );
  const appointmentSlot = useSelector(
    (state: AppState) => state.home.appointmentSlot
  );

  const { data, isFetching } = useFetchTimeSlotsQuery(
    {
      startDate: formatDate(activeStartDate),
      endDate: formatDate(getNextMonthFirstDate(activeStartDate!)),
    },
    {
      skip: !activeStartDate,
      refetchOnMountOrArgChange: 20,
    }
  );

  const handleDateChange = (value: Value) => {
    dispatch(setAppointmentDate({ appointmentDate: value }));
    dispatch(setAppointmentSlot({ appointmentSlot: "" }));
  };

  // this function will be executed when user changes the month using forward and backward arrows
  // when we set activeStartDate here, mock slots api is called to fetch next month's slots
  const handleActiveStartDateChange = ({ _, activeStartDate }: OnArgs) => {
    dispatch(
      setActiveStartDate({
        activeStartDate: activeStartDate,
      })
    );
    dispatch(setAppointmentDate({ appointmentDate: activeStartDate }));
  };

  const handleSlotClick = (value: string) => {
    dispatch(setAppointmentSlot({ appointmentSlot: value }));
  };

  const handleNextButtonClick = () => {
    console.log("next button clicked");
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
            showNeighboringMonth={false}
            minDetail="month"
            onActiveStartDateChange={handleActiveStartDateChange}
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
            ) : data && data?.length > 0 && appointmentDate ? (
              data
                .filter(
                  (singleDate) =>
                    singleDate.date === formatDate(appointmentDate)
                )?.[0]
                ?.slots?.map((slot) => {
                  const starTime = formatTime(slot.start_time);
                  const endTime = formatTime(slot.end_time);
                  const value = `${starTime} - ${endTime}`;
                  return (
                    <Slot
                      key={starTime}
                      value={value}
                      onClick={handleSlotClick}
                      isSelected={appointmentSlot === value}
                    />
                  );
                })
            ) : (
              <span>No slots available...</span>
            )}
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
        <button className={styles.nextButton} onClick={handleNextButtonClick}>
          Next <MdOutlineKeyboardArrowRight size={25} />
        </button>
      </div>
    </div>
  );
};

export default Home;
