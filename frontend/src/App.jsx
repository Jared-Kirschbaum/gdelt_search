import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ToggleSwitch from './components/ui/ToggleSwitch';
import SearchForm from './components/ui/SearchForm';
import ArticleCard from './components/ui/ArticleCard';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    document.body.classList.toggle('dark', darkMode); // ✅ Sync body background
  }, [darkMode]);

  const toggleTheme = () => setDarkMode((prev) => !prev);

  const handleSearch = useCallback(
    async (e) => {
      e.preventDefault();
      setError(null);
      if (!query.trim()) return;

      setLoading(true);
      setHasSearched(true);

      try {
        const response = await fetch(
          `http://localhost:3001/gdelt?query=${encodeURIComponent(query)}`
        );
        if (!response.ok) {
          const text = await response.text();
          throw new Error(`Server responded with ${response.status}: ${text}`);
        }

        const data = await response.json();
        setResults(data);
      } catch (err) {
        console.error('Fetch error:', err);
        setError('An error occurred while fetching data. Please try again.');
        setResults([]);
      }

      setLoading(false);
    },
    [query]
  );

  return (
    <div className={`app-container ${darkMode ? 'dark' : 'light'}`}>
      <header className="header">
        <h1>🌐 GDELT Global News Search</h1>
        <div className="theme-toggle">
          <ToggleSwitch checked={darkMode} onChange={toggleTheme} />
          <span className="toggle-label">
            {darkMode ? 'Dark Mode' : 'Light Mode'}
          </span>
        </div>
      </header>

      <main>
        <SearchForm
          query={query}
          setQuery={setQuery}
          handleSearch={handleSearch}
          loading={loading}
        />

        <AnimatePresence mode="wait">
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="status-message"
            >
              Loading news...
            </motion.div>
          )}

          {!loading && error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="status-message error"
            >
              {error}
            </motion.div>
          )}

          {!loading && hasSearched && results.length === 0 && !error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="status-message"
            >
              No results found. Try another keyword!
            </motion.div>
          )}
        </AnimatePresence>

        <div className="results-grid">
          {results.map((article, idx) => (
            <ArticleCard key={idx} article={article} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
