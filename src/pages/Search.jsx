import React, { useState, useEffect } from 'react';
import Fuse from 'fuse.js';

const Search = ({ shows }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(shows);

  useEffect(() => {
    if (query.trim() === '') {
      setResults(shows);
    } else {
      const fuse = new Fuse(shows, {
        keys: ['title', 'description'], // You can add more fields to search through
        includeScore: true,
        threshold: 0.3, // Adjust this for more/less fuzzy matching
      });
      const result = fuse.search(query).map(({ item }) => item);
      setResults(result);
    }
  }, [query, shows]);

  return (
    <div className="pl-[85px] ml-7 pr-[64px] mt-8 text-[#e60000]">
      <h2 className="text-2xl font-bold mb-4">Search Shows</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for shows..."
        className="border border-gray-300 rounded p-2 mb-4 w-full"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {results.length > 0 ? (
          results.map((show) => (
            <div key={show.id} className="border border-[#e60000] rounded-lg p-4">
              <img src={show.image} alt="show image" className="h-48 w-48 object-cover mb-2 mr-4 border border-[#e60000] rounded-lg" />
              <h3 className="text-xl font-bold mb-2">{show.title}</h3>
              <div>
                {show.genres
                  .filter(genre => typeof genre === 'string' && genre.toLowerCase() !== 'all')
                  .join(', ')}
              </div>
              {show.seasons && show.seasons.length > 0 && (
                <div className="mt-2">
                  {show.seasons.length} Seasons
                </div>
              )}
            </div>
          ))
        ) : (
          <div>No shows found.</div>
        )}
      </div>
    </div>
  );
};

export default Search;
