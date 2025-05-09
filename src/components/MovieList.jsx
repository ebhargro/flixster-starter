import { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import styles from './MovieList.module.css';
import PosterModal from './PosterModal'

const API_KEY = import.meta.env.VITE_API_KEY;

export default function MovieList() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(null);
    const [loading, setLoading] = useState(false);
const [view, setView] = useState('now_playing'); 
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
    const [searchError, setSearchError] = useState(null);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [sortBy, setSortBy] = useState('')

  // Fetch “Now Playing” whenever page or view switches back to now_playing
  useEffect(() => {
    if (view !== 'now_playing') return;
    setLoading(true);
    fetch(
      `https://api.themoviedb.org/3/movie/now_playing?` +
        `api_key=${API_KEY}&language=en-US&page=${page}`
    )
      .then(res => res.json())
      .then(data => {
        setMovies(data.results);
        setTotalPages(data.total_pages);
      })
      .catch(err => console.error('TMDb fetch error:', err))
      .finally(() => setLoading(false));
  }, [page, view]);

  // Handlers for “Load More”
  const loadMore = () => {
    if (!loading && page < totalPages) {
      setPage(p => p + 1);
    }
  };
    
    const handleSortChange = (e) => {
          console.log(e.target.value)
    setSortBy(e.target.value);
      };
    
      const sortMovies = (list) => {
    const sorted = [...list];
    switch (sortBy) {
      case 'title':
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case 'release_date':
        return sorted.sort(
          (a, b) => new Date(b.release_date) - new Date(a.release_date)
        );
      case 'rating':
        return sorted.sort((a, b) => b.vote_average - a.vote_average);
      default:
        return list;
    }
  };

  // decide which array to show, then sort it
  const displayed = view === 'now_playing' ? movies : searchResults;
  const sortedMovies = sortMovies(displayed);

  // Switch between tabs
  const handleViewChange = newView => {
    setView(newView);
    if (newView === 'search') {
      // reset search state
      setSearchResults([]);
      setSearchError(null);
      setSearchQuery('');
    } else {
      // reset now playing if you want fresh
      // setMovies([]);
      // setPage(1);
    }
  };

  // Controlled input for search
  const handleSearchChange = e => {
    setSearchQuery(e.target.value);
  };

  // Execute search on submit
  const handleSearchSubmit = e => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setSearchLoading(true);
    fetch(
      `https://api.themoviedb.org/3/search/movie?` +
        `api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(
          searchQuery
        )}&page=1`
    )
      .then(res => res.json())
      .then(data => {
        setSearchResults(data.results);
        if (!data.results.length) {
          setSearchError(`No movies found for "${searchQuery}".`);
        } else {
          setSearchError(null);
        }
      })
      .catch(err => {
        console.error('Search fetch error:', err);
        setSearchError('Something went wrong. Please try again.');
      })
      .finally(() => setSearchLoading(false));
  };

  return (
    <>
      <div className={styles.tabs}>
        <button
          className={[
            styles.tab,
            view === 'now_playing' && styles.active,
          ]
            .filter(Boolean)
            .join(' ')}
          onClick={() => handleViewChange('now_playing')}
        >
          Now Playing
        </button>
        <button
          className={[
            styles.tab,
            view === 'search' && styles.active,
          ]
            .filter(Boolean)
            .join(' ')}
          onClick={() => handleViewChange('search')}
        >
          Search
        </button>
      </div>

      {view === 'search' && (
        <form
          onSubmit={handleSearchSubmit}
          className={styles.searchForm}
        >
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search movies..."
            className={styles.searchInput}
          />
          <button type="submit" className={styles.searchButton}>
            🔍
          </button>
        </form>
          )}
          {displayed.length > 0 && (
        <div className={styles.sortContainer}>
          <label htmlFor="sort" className={styles.sortLabel}>
            Sort by:
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={handleSortChange}
            className={styles.sortSelect}
          >
            <option value="">Default</option>
            <option value="title">Title (A–Z)</option>
            <option value="release_date">Release Date (Newest)</option>
            <option value="rating">Rating (Highest to Lowest)</option>
          </select>
        </div>
      )}

      {view === 'now_playing' && (
        <>
          <section className={styles.grid}>
            {sortedMovies.map(movie => (
                <MovieCard key={movie.id} movie={movie} onClick={() => setSelectedMovie(movie)} />
            ))}
          </section>

          {loading && (
            <p className={styles.status}>Loading…</p>
          )}

          {!loading && page < totalPages && (
            <button
              onClick={loadMore}
              className={styles.loadMore}
            >
              Load More
            </button>
          )}

          {!loading &&
            totalPages !== null &&
            page >= totalPages && (
              <p className={styles.status}>
                No more movies to show.
              </p>
            )}
        </>
      )}

      {view === 'search' && (
        <>
          {searchLoading && (
            <p className={styles.status}>Searching…</p>
          )}
          {!searchLoading && searchError && (
            <p className={styles.status}>{searchError}</p>
          )}
          {!searchLoading && !searchError && searchResults.length > 0 && (
            <section className={styles.grid}>
              {sortedMovies.map(movie => (
                <MovieCard key={movie.id} movie={movie} onClick={()=> setSelectedMovie(movie)} />
              ))}
            </section>
          )}
        </>
          )} 
          
        {selectedMovie && (
        <PosterModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </>
  );
}