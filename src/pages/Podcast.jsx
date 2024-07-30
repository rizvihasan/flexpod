import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import LoadingScreen from '../components/LoadingScreen';

const Podcast = () => {
  const { id } = useParams();
  const [podcast, setPodcast] = useState(null);
  const [error, setError] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(0);
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem('favorites')) || [];
  });

  useEffect(() => {
    const fetchPodcast = async () => {
      try {
        const response = await fetch(`https://podcast-api.netlify.app/id/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPodcast(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchPodcast();
  }, [id]);

  const handleSeasonChange = (event) => {
    setSelectedSeason(event.target.value);
  };

  const handleFavorite = () => {
    if (favorites.some(fav => fav.id === podcast.id)) {
      setFavorites(favorites.filter(fav => fav.id !== podcast.id));
    } else {
      setFavorites([...favorites, podcast]);
    }
  };

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  if (error) {
    return <div>Data fetching failed: {error}</div>;
  }

  if (!podcast) {
    return <LoadingScreen />;
  }

  const isFavorite = favorites.some(fav => fav.id === podcast.id);

  return (
    <div className="pl-[85px] ml-7 pr-[64px] mt-8 text-[#e60000]">
      <div className="flex">
        <img src={podcast.image} alt="podcast image" className="h-48 w-48 object-cover mb-2 mr-4 border border-[#e60000] rounded-lg" />
        <div>
          <h2 className="text-2xl font-bold mb-4">{podcast.title}</h2>
          <p className="mb-4">{podcast.description}</p>
          {podcast.genres && podcast.genres.length > 0 && (
            <div className="mb-4">
              <h3 className="text-xl font-bold">Genres</h3>
              <div>
                {podcast.genres.filter(genre => genre.toLowerCase() !== 'all').join(', ')}
              </div>
            </div>
          )}
          {podcast.seasons && podcast.seasons.length > 0 && (
            <div className="mb-4">
              <h3 className="text-xl font-bold">Seasons</h3>
              <select
                value={selectedSeason}
                onChange={handleSeasonChange}
                className="border border-gray-300 rounded p-2"
              >
                {podcast.seasons.map((season, index) => (
                  <option key={index} value={index}>
                    Season {index + 1}
                  </option>
                ))}
              </select>
              <button
                onClick={handleFavorite}
                className={`ml-4 p-2 rounded ${isFavorite ? 'bg-red-600 text-white' : 'bg-gray-300 text-black'}`}
              >
                {isFavorite ? 'Unfavorite' : 'Favorite'}
              </button>
              <Link to="/favorites" className="ml-4 p-2 rounded bg-blue-600 text-white">
                View Favorites
              </Link>
            </div>
          )}
        </div>
      </div>
      {podcast.seasons && podcast.seasons.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-bold">Episodes</h3>
          <ul className="list-disc ml-6">
            {podcast.seasons[selectedSeason].episodes.map((episode, index) => (
              <li key={index} className="mb-2">
                <div className="flex flex-col">
                  <div className="font-bold">{episode.title}</div>
                  <p className="text-sm mb-2">{episode.description}</p>
                  <audio controls src={episode.file}></audio>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Podcast;
