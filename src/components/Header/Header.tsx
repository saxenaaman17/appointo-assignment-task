import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { RiShareBoxFill } from "react-icons/ri";

const Header = () => {
  return (
    <nav className={styles.header}>
      <img src="/logo.png" alt="company logo" />
      <div className={styles.links}>
        <Link to="/contact-us">Contact us</Link>
        <button className={styles.shareButton}>
          <RiShareBoxFill /> Share Link
        </button>
      </div>
    </nav>
  );
};

export default Header;
