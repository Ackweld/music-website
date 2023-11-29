import styles from "./Header.module.css";

export const Header = () => {
  return (
    <header className={styles.header}>
      <label>Home</label>
      <label>My work</label>
      <label>Contact me</label>
      <label>Downloads</label>
    </header>
  );
};
