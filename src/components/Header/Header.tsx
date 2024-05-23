import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { RiShareBoxFill } from "react-icons/ri";
import { GrContactInfo } from "react-icons/gr";

const Header = () => {
  const handleShareLinkButtonClick = () => {
    console.log("share link clicked");
  };

  return (
    <header className={styles.header}>
      <img src="/logo.png" alt="company logo" aria-label="Company Name Logo" />
      <div className={styles.links}>
        <Link to="/contact-us" className={styles.showInLargeScreen}>
          Contact us
        </Link>
        <button
          className={styles.shareButton}
          onClick={handleShareLinkButtonClick}
        >
          <RiShareBoxFill /> <span>Share Link</span>
        </button>
        <Link
          to="/contact-us"
          className={`${styles.showInSmallScreen} ${styles.icon}`}
        >
          <GrContactInfo size={30} />
        </Link>
        <RiShareBoxFill
          className={`${styles.showInSmallScreen} ${styles.icon}`}
          size={30}
          onClick={handleShareLinkButtonClick}
        />
      </div>
    </header>
  );
};

export default Header;
