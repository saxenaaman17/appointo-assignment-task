import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import styles from "./AppLayout.module.css";
import Band, { BandProps } from "../components/Band/Band";

const leftSideBands: BandProps[] = [
  {
    height: 60,
    width: "30%",
    alignment: "left",
    backgroundColor: "#CCE7E0",
    top: 644,
  },
  {
    height: 60,
    width: "20%",
    alignment: "left",
    backgroundColor: "#EDF9F1",
    top: 712,
  },
];

const rightSideBands: BandProps[] = [
  {
    height: 60,
    width: "80%",
    alignment: "right",
    backgroundColor: "#378760",
    top: 400,
  },
  {
    height: 60,
    width: "100%",
    alignment: "right",
    backgroundColor: "#CCE7E0",
    top: 460,
  },
  {
    height: 60,
    width: "60%",
    alignment: "right",
    backgroundColor: "#EDF9F1",
    top: 512,
  },
];

const AppLayout = () => {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <div className={styles.leftSideBandsContainer}>
          {leftSideBands.map((band) => (
            <Band {...band} />
          ))}
        </div>

        <Outlet />

        <div className={styles.rightSideBandsContainer}>
          {rightSideBands.map((band) => (
            <Band {...band} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
