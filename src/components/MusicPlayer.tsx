import React from 'react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { useMusic } from '../context/MusicContext';

const MusicPlayer: React.FC = () => {
  const { 
    currentTrack, 
    isPlaying, 
    togglePlay, 
    nextTrack, 
    prevTrack, 
    duration, 
    currentTime,
    setProgress
  } = useMusic();

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="w-full transform overflow-hidden rounded-lg bg-gradient-to-br from-gray-900/70 to-black/70 p-4 backdrop-blur-md transition-all duration-300 hover:from-gray-900/80 hover:to-black/80">
      <div className="flex items-center gap-4">
        {/* Album art */}
        <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-md shadow-md">
          <img 
            src={currentTrack.image} 
            alt={currentTrack.title} 
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>
        
        {/* Track info and controls */}
        <div className="flex flex-1 flex-col">
          {/* Title and artist */}
          <div className="mb-2">
            <h3 className="font-medium">{currentTrack.title}</h3>
            <p className="text-xs text-gray-400">{currentTrack.artist}</p>
          </div>
          
          {/* Progress bar */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">{formatTime(currentTime)}</span>
            <div className="relative flex-1">
              <input
                type="range"
                min="0"
                max={duration || 100}
                value={currentTime}
                onChange={(e) => setProgress(Number(e.target.value))}
                className="music-progress h-1 w-full cursor-pointer appearance-none overflow-hidden rounded-full bg-gray-700"
              />
            </div>
            <span className="text-xs text-gray-400">{formatTime(duration)}</span>
          </div>
          
          {/* Controls */}
          <div className="mt-3 flex items-center justify-center gap-4">
            <button 
              onClick={prevTrack} 
              className="rounded-full p-1 transition-all hover:bg-white/10 hover:text-blue-400"
            >
              <SkipBack size={18} />
            </button>
            
            <button 
              onClick={togglePlay} 
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-all hover:bg-white/20 hover:text-blue-400"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            
            <button 
              onClick={nextTrack} 
              className="rounded-full p-1 transition-all hover:bg-white/10 hover:text-blue-400"
            >
              <SkipForward size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;