import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Movies from './routes/movies';
import Movie from './routes/movie';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Movies />} />
        <Route path="/movies/:id" element={<Movie />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
