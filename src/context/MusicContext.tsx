import React, { createContext, useState, useContext, useRef, useEffect } from 'react';

interface Track {
  id: number;
  title: string;
  artist: string;
  src: string;
  image: string;
}

interface MusicContextType {
  tracks: Track[];
  currentTrack: Track;
  isPlaying: boolean;
  duration: number;
  currentTime: number;
  togglePlay: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  setProgress: (value: number) => void;
  audioRef: React.RefObject<HTMLAudioElement>;
}

const defaultTracks: Track[] = [
  {
    id: 1,
    title: 'Cold',
    artist: 'Neffex',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    image: 'https://images.pexels.com/photos/1616470/pexels-photo-1616470.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 2,
    title: 'Summer Nights',
    artist: 'Lemarroy',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    image: 'https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 3,
    title: 'Dreamscape',
    artist: 'Aether',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    image: 'https://images.pexels.com/photos/1884306/pexels-photo-1884306.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
];

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tracks] = useState<Track[]>(defaultTracks);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTrack = tracks[currentTrackIndex];

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const nextTrack = () => {
    setCurrentTrackIndex((currentTrackIndex + 1) % tracks.length);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((currentTrackIndex - 1 + tracks.length) % tracks.length);
  };

  const setProgress = (value: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value;
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current;
      
      const updateTime = () => setCurrentTime(audio.currentTime);
      const updateDuration = () => setDuration(audio.duration);
      const handleEnd = () => nextTrack();
      
      audio.addEventListener('timeupdate', updateTime);
      audio.addEventListener('loadedmetadata', updateDuration);
      audio.addEventListener('ended', handleEnd);
      
      return () => {
        audio.removeEventListener('timeupdate', updateTime);
        audio.removeEventListener('loadedmetadata', updateDuration);
        audio.removeEventListener('ended', handleEnd);
      };
    }
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentTrackIndex]);

  return (
    <MusicContext.Provider
      value={{
        tracks,
        currentTrack,
        isPlaying,
        duration,
        currentTime,
        togglePlay,
        nextTrack,
        prevTrack,
        setProgress,
        audioRef,
      }}
    >
      {children}
      <audio ref={audioRef}>
        <source src={currentTrack.src} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
};