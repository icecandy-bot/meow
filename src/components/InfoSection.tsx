import React, { useState } from 'react';
import { Briefcase, Code, GraduationCap, Heart, User } from 'lucide-react';

type InfoCategory = 'about' | 'skills' | 'education' | 'work' | 'hobbies';

const InfoSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<InfoCategory>('about');

  const infoCategories = [
    { id: 'about', icon: <User size={20} />, label: 'About Me' },
    { id: 'skills', icon: <Code size={20} />, label: 'Skills' },
    { id: 'education', icon: <GraduationCap size={20} />, label: 'Education' },
    { id: 'work', icon: <Briefcase size={20} />, label: 'Work' },
    { id: 'hobbies', icon: <Heart size={20} />, label: 'Hobbies' },
  ];

  const renderContent = () => {
    switch (activeCategory) {
      case 'about':
        return (
          <div className="animate-fade-in">
            <h3 className="mb-2 text-xl font-medium">Hello, I'm Meteor</h3>
            <p className="mb-3 text-gray-300">
              A passionate web developer and designer based in Taiwan. I love creating beautiful digital experiences and exploring new technologies.
            </p>
            <p className="text-gray-300">
              When I'm not coding, you can find me taking photos, listening to music, or exploring the outdoors.
            </p>
          </div>
        );
      case 'skills':
        return (
          <div className="animate-fade-in">
            <h3 className="mb-3 text-xl font-medium">My Skills</h3>
            <div className="mb-3">
              <h4 className="mb-1 font-medium text-blue-400">Development</h4>
              <div className="flex flex-wrap gap-2">
                {['React', 'TypeScript', 'Node.js', 'HTML/CSS', 'Tailwind'].map((skill) => (
                  <span key={skill} className="rounded-full bg-white/10 px-3 py-1 text-sm backdrop-blur-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="mb-1 font-medium text-purple-400">Design</h4>
              <div className="flex flex-wrap gap-2">
                {['UI/UX', 'Figma', 'Photoshop', 'Illustration'].map((skill) => (
                  <span key={skill} className="rounded-full bg-white/10 px-3 py-1 text-sm backdrop-blur-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      case 'education':
        return (
          <div className="animate-fade-in">
            <h3 className="mb-3 text-xl font-medium">Education</h3>
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-purple-400">National Taiwan University</h4>
                <span className="text-sm text-gray-400">2018-2022</span>
              </div>
              <p className="text-gray-300">Bachelor of Computer Science</p>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-blue-400">Front-End Masters</h4>
                <span className="text-sm text-gray-400">2022</span>
              </div>
              <p className="text-gray-300">Advanced Web Development Certification</p>
            </div>
          </div>
        );
      case 'work':
        return (
          <div className="animate-fade-in">
            <h3 className="mb-3 text-xl font-medium">Work Experience</h3>
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-blue-400">Senior Frontend Developer</h4>
                <span className="text-sm text-gray-400">2022-Present</span>
              </div>
              <p className="text-gray-400">TechVision Inc.</p>
              <p className="text-sm text-gray-300">Developing modern web applications using React and TypeScript.</p>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-purple-400">UI/UX Designer</h4>
                <span className="text-sm text-gray-400">2020-2022</span>
              </div>
              <p className="text-gray-400">Creative Solutions</p>
              <p className="text-sm text-gray-300">Designed intuitive interfaces for web and mobile applications.</p>
            </div>
          </div>
        );
      case 'hobbies':
        return (
          <div className="animate-fade-in">
            <h3 className="mb-3 text-xl font-medium">My Hobbies</h3>
            <ul className="space-y-2 text-gray-300">
              <li>🎵 Collecting vinyl records and discovering new music</li>
              <li>📷 Photography, especially night and street photography</li>
              <li>🎮 Gaming and game development</li>
              <li>🚶‍♂️ Hiking and exploring nature</li>
              <li>📚 Reading science fiction and fantasy novels</li>
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mt-8 w-full max-w-xl">
      <div className="w-full overflow-hidden rounded-lg bg-gradient-to-br from-gray-900/70 to-black/70 backdrop-blur-md">
        {/* Navigation */}
        <div className="flex overflow-x-auto py-2 sm:justify-center">
          {infoCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id as InfoCategory)}
              className={`flex items-center gap-1 whitespace-nowrap px-3 py-2 text-sm transition-all duration-300 ${
                activeCategory === category.id
                  ? 'text-purple-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.label}</span>
              {activeCategory === category.id && (
                <span className="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-blue-500 to-purple-500"></span>
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex min-h-[200px] flex-col p-6">{renderContent()}</div>
      </div>
    </div>
  );
};

export default InfoSection;