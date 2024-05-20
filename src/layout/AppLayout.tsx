import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import styles from "./AppLayout.module.css";

const AppLayout = () => {
  return (
    <div className={styles.container}>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
