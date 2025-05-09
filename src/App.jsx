import './App.css'
import MovieList from './components/MovieList'

const MovieHeader = () => 
  <div className="movie-header"> 
    🍿 Welcome to Flixster!
  </div>

const MovieFooter = () => 
  <div className="movie-footer"> 
    Copyright 2025 
  </div>

const App = () => 
  <div className="App">
    <MovieHeader />
    <MovieList />
    <MovieFooter />
    </div>
 

export default App
