import { FC } from "react";
import styles from "./authentication.module.scss";

interface AuthenticationProps {}

const Authentication: FC<AuthenticationProps> = () => (
  <div className={styles.Authentication}>Authentication Component</div>
);

export default Authentication;
