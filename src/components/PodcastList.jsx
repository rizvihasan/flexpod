import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PodcastCarousel from '../components/PodcastCarousel';

const PodcastList = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [error, setError] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [sortCriteria, setSortCriteria] = useState('AZ');

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const response = await fetch('https://podcast-api.netlify.app/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPodcasts(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchPodcasts();
  }, []);

  if (error) {
    return <div>Data fetching failed: {error}</div>;
  }

  const genres = [
    { id: 0, name: 'All' },
    { id: 1, name: 'Personal Growth' },
    { id: 2, name: 'Investigative Journalism' },
    { id: 3, name: 'History' },
    { id: 4, name: 'Comedy' },
    { id: 5, name: 'Entertainment' },
    { id: 6, name: 'Business' },
    { id: 7, name: 'Fiction' },
    { id: 8, name: 'News' },
    { id: 9, name: 'Kids and Family' },
  ];

  const getGenresFromIds = (genreIds) => {
    return genreIds.map(id => {
      const genre = genres.find(genre => genre.id === id);
      return genre ? genre.name : '';
    }).filter(Boolean); // Filter out any empty strings
  };

  // Function to format date as "day month in words, year"
  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const filterByGenre = (podcasts, genre) => {
    if (genre === 'All') {
      return podcasts;
    }
    return podcasts.filter(podcast =>
      getGenresFromIds(podcast.genres).includes(genre)
    );
  };

  const sortPodcasts = (podcasts, criteria) => {
    switch (criteria) {
      case 'AZ':
        return [...podcasts].sort((a, b) => a.title.localeCompare(b.title));
      case 'ZA':
        return [...podcasts].sort((a, b) => b.title.localeCompare(a.title));
      case 'NewlyUpdated':
        return [...podcasts].sort((a, b) => new Date(b.updated) - new Date(a.updated));
      case 'OldestUpdated':
        return [...podcasts].sort((a, b) => new Date(a.updated) - new Date(b.updated));
      default:
        return podcasts;
    }
  };

  const filteredPodcasts = filterByGenre(podcasts, selectedGenre);
  const sortedPodcasts = sortPodcasts(filteredPodcasts, sortCriteria);

  return (
    <div>
      <PodcastCarousel podcasts={podcasts} />
      <div className="pl-[85px] ml-7 pr-[64px] mt-8 text-[#e60000]">
        <h2 className="text-2xl font-bold mb-4">All Podcasts</h2>
        <div className="mb-4 flex flex-wrap gap-2">
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="p-2 rounded bg-white border border-gray-400 text-gray-800"
          >
            {genres.map((genre) => (
              <option key={genre.id} value={genre.name}>{genre.name}</option>
            ))}
          </select>
          <button onClick={() => setSortCriteria('AZ')} className="p-2 rounded bg-red-600 text-white">A-Z</button>
          <button onClick={() => setSortCriteria('ZA')} className="p-2 rounded bg-red-600 text-white">Z-A</button>
          <button onClick={() => setSortCriteria('NewlyUpdated')} className="p-2 rounded bg-red-600 text-white">Newly Updated</button>
          <button onClick={() => setSortCriteria('OldestUpdated')} className="p-2 rounded bg-red-600 text-white">Oldest Updated</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedPodcasts.map((podcast) => (
            <div key={podcast.id} className="border border-[#e60000] rounded-lg p-4 flex flex-col justify-between">
              <div>
                <Link to={`/podcast/${podcast.id}`} className="">
                  <img src={podcast.image} alt="podcast image" className="h-auto w-auto mb-2" />
                </Link>
                <h3 className="text-xl font-bold">{podcast.title}</h3>
                <p className="text-sm">Seasons: {podcast.seasons}</p>
                <p className="text-sm">Genres: {getGenresFromIds(podcast.genres).join(', ')}</p>
                <p className="text-sm">Updated: {formatDate(podcast.updated)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PodcastList;
