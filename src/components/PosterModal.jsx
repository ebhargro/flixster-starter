import styles from './PosterModal.module.css';


export default function PosterModal({ movie, onClose }) {
  const {
    title,
    backdrop_path,
      release_date,
    popularity,
      overview,
    original_language
  } = movie;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={e => e.stopPropagation()}
      >
        <button className={styles.close} onClick={onClose}>
          &times;
        </button>

        {backdrop_path && (
          <img
            className={styles.backdrop}
            src={`https://image.tmdb.org/t/p/w780${backdrop_path}`}
            alt={`${title} backdrop`}
          />
        )}

        <h2 className={styles.title}>{title}</h2>

        {popularity != null && (
          <p><strong>Popularity Score:</strong> {popularity.toFixed(0)}</p>
              )}
              
        {original_language != null && (
          <p><strong>Original Language:</strong> {original_language.toUpperCase()}</p>
        )}

        {release_date && (
          <p><strong>Release Date:</strong> {release_date}</p>
        )}

        {overview && (
          <p className={styles.overview}>{overview}</p>
        )}
      </div>
    </div>
  );
}