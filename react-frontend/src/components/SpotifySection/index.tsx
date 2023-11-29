import styles from "./SpotifySection.module.css";

export const SpotifySection = () => {
  return (
    <iframe
      className={styles.spotifySection}
      src="https://open.spotify.com/embed/playlist/7Jb8AxSRogPWgLv3NkgOGM?utm_source=generator&theme=0"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    ></iframe>
  );
};
