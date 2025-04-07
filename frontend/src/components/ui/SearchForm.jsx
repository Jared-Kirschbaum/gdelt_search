import { Loader2 } from 'lucide-react';

function SearchForm({query, setQuery, handleSearch, loading}) {
    return (
        <form onSubmit={handleSearch} className="search-form">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for news topics (e.g., 'nigeria', 'ukraine', 'AI')"
                className="search-input"
                aria-label='Search News Topics'
                />
                <button type="submit" className="search-button" disabled={loading}>
                    {loading ? <Loader2 className="animate-spin" /> : 'Search'}
                </button>
        </form>
    );
}

export default SearchForm;