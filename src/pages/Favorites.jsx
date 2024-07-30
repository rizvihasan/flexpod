import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Favorites = () => {
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem('favorites')) || [];
  });

  const [sortCriteria, setSortCriteria] = useState('');

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleResetFavorites = () => {
    setFavorites([]);
  };

  const sortFavorites = (favorites, criteria) => {
    switch (criteria) {
      case 'AZ':
        return [...favorites].sort((a, b) => a.title.localeCompare(b.title));
      case 'ZA':
        return [...favorites].sort((a, b) => b.title.localeCompare(a.title));
      case 'NewlyUpdated':
        return [...favorites].sort((a, b) => new Date(b.updated) - new Date(a.updated));
      case 'OldestUpdated':
        return [...favorites].sort((a, b) => new Date(a.updated) - new Date(b.updated));
      default:
        return favorites;
    }
  };

  const sortedFavorites = sortFavorites(favorites, sortCriteria);

  return (
    <div className="pl-[85px] ml-7 pr-[64px] mt-8 text-[#e60000]">
      <h2 className="text-2xl font-bold mb-4">Favorite Podcasts</h2>
      <div className="mb-4">
        <button onClick={() => setSortCriteria('AZ')} className="mr-2 p-2 rounded bg-red-600 text-white">A-Z</button>
        <button onClick={() => setSortCriteria('ZA')} className="mr-2 p-2 rounded bg-red-600 text-white">Z-A</button>
        <button onClick={() => setSortCriteria('NewlyUpdated')} className="mr-2 p-2 rounded bg-red-600 text-white">Newly Updated</button>
        <button onClick={() => setSortCriteria('OldestUpdated')} className="mr-2 p-2 rounded bg-red-600 text-white">Oldest Updated</button>
        <button onClick={handleResetFavorites} className="p-2 rounded bg-red-600 text-white">Reset Favorites</button>
      </div>
      {favorites.length === 0 ? (
        <div>No favorites yet.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedFavorites.map((podcast) => (
            <div key={podcast.id} className="border border-[#e60000] rounded-lg p-4">
              <Link to={`/podcast/${podcast.id}`}>
                <img src={podcast.image} alt="podcast image" className="h-48 w-48 object-cover mb-2 mr-4 border border-[#e60000] rounded-lg" />
              </Link>
              <h3 className="text-xl font-bold mb-2">{podcast.title}</h3>
              {podcast.genres && podcast.genres.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-lg font-bold">Genres</h4>
                  <div>{podcast.genres.filter(genre => genre.toLowerCase() !== 'all').join(', ')}</div>
                </div>
              )}
              {podcast.seasons && podcast.seasons.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-lg font-bold">Seasons</h4>
                  <div>{podcast.seasons.length} Seasons</div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
