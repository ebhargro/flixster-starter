import styles from './MovieCard.module.css';


const MovieCard = ({ movie, onClick }) => {
  const { title, poster_path, vote_average } = movie;
  const posterUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  return (
     <div className={styles.card}>
      <img
        src={posterUrl}
        alt={title}
        className={styles.poster}
        onClick={onClick}
      />
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.rating}>
         ⭐
          <span> {vote_average.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;