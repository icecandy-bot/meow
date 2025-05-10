import React from 'react';
import { Github, Instagram, Music } from 'lucide-react';

const Profile: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="group relative mb-4 rounded-full p-1">
        {/* Profile picture border animation */}
        <div className="absolute inset-0 animate-spin-slow rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-75 blur-sm transition-all duration-300 group-hover:opacity-100 group-hover:blur-md"></div>
        
        {/* Avatar frame */}
        <div className="relative h-40 w-40 overflow-hidden rounded-full border-2 border-white/20 bg-black/40 p-3 backdrop-blur-sm sm:h-48 sm:w-48">
          {/* Custom avatar shape with ears */}
          <div className="relative h-full w-full overflow-hidden rounded-full bg-gray-800">
            {/* Cat ears */}
            <div className="absolute -top-3 left-6 h-8 w-8 rounded-full bg-pink-400 sm:left-8"></div>
            <div className="absolute -top-3 right-6 h-8 w-8 rounded-full bg-pink-400 sm:right-8"></div>
            
            {/* Profile image */}
            <img 
              src="https://images.pexels.com/photos/320014/pexels-photo-320014.jpeg?auto=compress&cs=tinysrgb&w=600" 
              alt="Profile" 
              className="h-full w-full object-cover object-center opacity-90 transition-all duration-300 hover:scale-105"
            />

            {/* Pendant */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 animate-pulse">
              <div className="h-4 w-4 rounded-full bg-yellow-400 shadow-lg"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Username */}
      <h1 className="relative mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-4xl font-bold text-transparent">
        <span className="relative">
          yometeorstar
          <div className="absolute -inset-1 -z-10 opacity-30 blur-md">yometeorstar</div>
        </span>
      </h1>

      {/* Social Icons */}
      <div className="flex gap-4">
        <SocialIcon icon={<Github size={20} />} href="https://github.com" />
        <SocialIcon icon={<Music size={20} />} href="#" />
        <SocialIcon icon={<Instagram size={20} />} href="https://instagram.com" />
      </div>
    </div>
  );
};

interface SocialIconProps {
  icon: React.ReactNode;
  href: string;
}

const SocialIcon: React.FC<SocialIconProps> = ({ icon, href }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-md transition-all duration-300 hover:bg-white/20 hover:scale-110"
    >
      {icon}
    </a>
  );
};

export default Profile;