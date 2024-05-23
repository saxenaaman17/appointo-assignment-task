import { Link } from "react-router-dom";
import styles from "./ErrorPage.module.css";

const ErrorPage = () => {
  return (
    <div className={styles.container}>
      This page is not available.&nbsp; <Link to="/">Click here</Link>&nbsp; to
      go back to home page.
    </div>
  );
};

export default ErrorPage;
