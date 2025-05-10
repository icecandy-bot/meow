import React from 'react';
import Background from './components/Background';
import Profile from './components/Profile';
import MusicPlayer from './components/MusicPlayer';
import { MusicProvider } from './context/MusicContext';
import InfoSection from './components/InfoSection';

function App() {
  return (
    <MusicProvider>
      <div className="relative min-h-screen w-full overflow-hidden font-sans text-white">
        <Background />
        <div className="relative z-10 mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-between px-4 py-8">
          <div className="mt-12 flex w-full flex-1 flex-col items-center justify-start">
            <Profile />
            <InfoSection />
          </div>
          <div className="mt-auto w-full max-w-xl">
            <MusicPlayer />
          </div>
        </div>
      </div>
    </MusicProvider>
  );
}

export default App;