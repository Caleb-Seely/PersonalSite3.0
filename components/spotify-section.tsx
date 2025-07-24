import React, { useState, useEffect } from 'react';
import { Music, Send } from 'lucide-react';
import Image from "next/image";
import { trackSpotifyInteraction } from './google-analytics';

// Define interface for currently playing song
interface CurrentlyPlaying {
  albumArt: string;
  songName: string;
  artist: string;
  isPlaying?: boolean;
}

const SpotifySection = () => {
  const [songInput, setSongInput] = useState('');
  const [currentlyPlaying, setCurrentlyPlaying] = useState<CurrentlyPlaying | null>(null);
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
          if (data && data.songName) {
            trackSpotifyInteraction('currently_playing_view', `${data.songName} - ${data.artist}`);
          }
        }
      } catch (error) {
        console.error('Error fetching current song:', error);
      }
    };

    fetchCurrentSong();
    const interval = setInterval(fetchCurrentSong, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
        trackSpotifyInteraction('song_submit', songInput);
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
   <section id="spotify" className="bg-gray-900 py-12 text-white">
     <div className="container mx-auto px-2 max-w-7xl">
       <div className="flex flex-col md:flex-row gap-8">
         {/* Currently Playing Section */}
         {currentlyPlaying && (
           <div className="flex-1 bg-gray-800 rounded-lg p-8 shadow-lg border border-gray-700">
             <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
               <Music className="text-emerald-500" size={24} />
               Currently Playing
             </h3>
             <div className="flex items-center gap-6">
               {currentlyPlaying.albumArt && (
                 <Image
                   src={currentlyPlaying.albumArt}
                   alt="Album Art"
                   width={96}
                   height={96}
                   className="rounded-md shadow-md"
                 />
               )}
               <div>
                 <p className="font-medium text-white text-lg">{currentlyPlaying.songName}</p>
                 <p className="text-gray-400 text-base mt-1">{currentlyPlaying.artist}</p>
               </div>
             </div>
           </div>
         )}
 
         {/* Playlist Submission Section */}
         <div className="flex-1 bg-gray-800 rounded-lg p-8 shadow-lg border border-gray-700">
           <h2 className="text-2xl font-bold mb-6">
             Add to My{' '}
             <a
               href="https://open.spotify.com/playlist/2jlzrqaXQ9Y985JWRk1vlC?si=508f79d181c94bc8"
               target="_blank"
               rel="noopener noreferrer"
               className="text-emerald-500 hover:underline"
               onClick={() => trackSpotifyInteraction('playlist_click')}
             >
               Playlist
             </a>
           </h2>
           <form onSubmit={handleSubmit} className="space-y-6">
             <div className="relative">
               <input 
                 type="text" 
                 value={songInput}
                 onChange={(e) => setSongInput(e.target.value)}
                 placeholder="Enter song name or Spotify URL..."
                 className="w-full p-4 pr-12 rounded-lg border border-gray-700 bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none text-lg"
                 disabled={isSubmitting}
               />
               <button 
                 type="submit"
                 disabled={isSubmitting}
                 className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-emerald-500 hover:text-emerald-400 disabled:opacity-50"
               >
                 <Send size={24} />
               </button>
             </div>
             
             {submitMessage && (
               <p className={`text-center text-base ${submitMessage.includes('Error') || submitMessage.includes('Failed') ? 'text-red-500' : 'text-emerald-500'}`}>
                 {submitMessage}
               </p>
             )}
           </form>
           
           <p className="mt-6 text-base text-gray-400 text-center">
             Suggest a song to add to my public playlist!
           </p>
         </div>
       </div>
     </div>
   </section>
 );
};

export default SpotifySection;