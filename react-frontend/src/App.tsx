import styles from "./App.module.css";
import {
  Biography,
  Header,
  ImageCarousel,
  SpotifySection,
  EmailForm,
} from "./components";
import VideoGrid from "./components/VideoGrid";

function App() {
  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <ImageCarousel />
        <Header />
      </div>
      <div className={styles.pageContent}>
        <Biography />
        <VideoGrid />
        <SpotifySection />
        <EmailForm />
      </div>
    </div>
  );
}

export default App;
