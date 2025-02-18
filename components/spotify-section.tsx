import React, { useState, useEffect } from 'react';
import { Music, Send } from 'lucide-react';
import Image from "next/image";

const SpotifySection = () => {
  const [songInput, setSongInput] = useState('');
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // Fetch currently playing song
  useEffect(() => {
    const fetchCurrentSong = async () => {
      try {
        const response = await fetch('/api/spotify/now-playing');
        
        if (response.status === 401) {
          const refreshResponse = await fetch('/api/spotify/refresh');
          if (refreshResponse.ok) {
            const retryResponse = await fetch('/api/spotify/now-playing');
            const data = await retryResponse.json();
            setCurrentlyPlaying(data);
          } 
        } else {
          const data = await response.json();
          setCurrentlyPlaying(data);
        }
      } catch (error) {
        console.error('Error fetching current song:', error);
      }
    };

    fetchCurrentSong();
    const interval = setInterval(fetchCurrentSong, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!songInput.trim()) return;

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('/api/spotify/add-song', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ songUrl: songInput }),
      });

      if (response.ok) {
        setSubmitMessage('Song added successfully! 🎵');
        setSongInput('');
      } else {
        setSubmitMessage('Failed to add song. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting song:', error);
      setSubmitMessage('Error submitting song. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="spotify" className="bg-gray-900 py-20 text-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Currently Playing Section */}
          {currentlyPlaying && (
            <div className="flex-1 bg-gray-800 rounded-lg p-6 shadow-md border border-gray-700">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Music className="text-emerald-500" size={20} />
                Currently Playing
              </h3>
              <div className="flex items-center gap-4">
                {currentlyPlaying.albumArt && (
                  <Image
                  src={currentlyPlaying.albumArt}
                  alt="Album Art"
                  width={64}  // Set the width (16 * 4 for pixel scaling)
                  height={64} // Set the height (16 * 4 for pixel scaling)
                  className="rounded-md shadow-sm" // Your custom classes for styling
                />
                )}
                <div>
                  <p className="font-medium text-white">{currentlyPlaying.songName}</p>
                  <p className="text-gray-400">{currentlyPlaying.artist}</p>
                </div>
              </div>
            </div>
          )}

          {/* Playlist Submission Section */}
          <div className="flex-1 bg-gray-800 rounded-lg p-6 shadow-md border border-gray-700">
            <h2 className="text-2xl font-bold mb-6 ">Add to My Playlist</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input 
                  type="text" 
                  value={songInput}
                  onChange={(e) => setSongInput(e.target.value)}
                  placeholder="Enter song name or Spotify URL..."
                  className="w-full p-4 pr-12 rounded-lg border border-gray-700 bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                  disabled={isSubmitting}
                />
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-emerald-500 hover:text-emerald-400 disabled:opacity-50"
                >
                  <Send size={20} />
                </button>
              </div>
              
              {submitMessage && (
                <p className={`text-center ${submitMessage.includes('Error') || submitMessage.includes('Failed') ? 'text-red-500' : 'text-emerald-500'}`}>
                  {submitMessage}
                </p>
              )}
            </form>
            
            <p className="mt-4 text-sm text-gray-400 text-center">
              Suggest a song to add to my public playlist!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpotifySection;