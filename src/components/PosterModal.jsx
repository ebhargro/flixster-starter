import styles from './PosterModal.module.css';


export default function PosterModal({ movie, onClose }) {
  const {
    title,
    runtime,
    backdrop_path,
    release_date,
    genres,
    overview,
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

        {runtime != null && (
          <p><strong>Runtime:</strong> {runtime} min</p>
        )}

        {release_date && (
          <p><strong>Release:</strong> {release_date}</p>
        )}

        {Array.isArray(genres) && genres.length > 0 && (
          <p>
            <strong>Genres:</strong>{' '}
            {genres.map(g => g.name).join(', ')}
          </p>
        )}

        {overview && (
          <p className={styles.overview}>{overview}</p>
        )}
      </div>
    </div>
  );
}