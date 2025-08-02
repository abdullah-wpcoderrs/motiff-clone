import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MoreHorizontal, 
  Star, 
  Copy, 
  Trash2, 
  Edit, 
  Share,
  Users
} from 'lucide-react';

interface ProjectCardProps {
  id: string;
  title: string;
  thumbnail: string;
  lastModified: string;
  collaborators?: Array<{
    id: string;
    name: string;
    avatar: string;
  }>;
  isStarred?: boolean;
  type?: 'design' | 'prototype' | 'component';
  onClick?: () => void;
}

export default function ProjectCard({
  id,
  title,
  thumbnail,
  lastModified,
  collaborators,
  isStarred = false,
  type = 'design',
  onClick
}: ProjectCardProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [starred, setStarred] = useState(isStarred);
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(`/design/${id}`);
    }
  };

  const handleStarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setStarred(!starred);
  };

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const getTypeIcon = () => {
    switch (type) {
      case 'prototype':
        return (
          <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">P</span>
          </div>
        );
      case 'component':
        return (
          <div className="w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">C</span>
          </div>
        );
      default:
        return (
          <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">D</span>
          </div>
        );
    }
  };

  return (
    <div 
      className="bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200 cursor-pointer group"
      onClick={handleCardClick}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-gray-100 rounded-t-lg overflow-hidden">
        <img 
          src={thumbnail} 
          alt={title}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQwIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDI0MCAxODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyNDAiIGhlaWdodD0iMTgwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik05NiA3Mkw5NiA5NkwxMjAgOTZMMTQ0IDcyTDE0NCA5NkwxNjggOTZMMTkyIDcyTDE5MiAxMDhMNDggMTA4TDQ4IDcyTDcyIDcyTDk2IDcyWiIgZmlsbD0iI0Q5REREREQiLz4KPC9zdmc+';
          }}
        />
        
        {/* Type indicator */}
        <div className="absolute top-3 left-3">
          {getTypeIcon()}
        </div>
        
        {/* Star button */}
        <button
          onClick={handleStarClick}
          className={`absolute top-3 right-3 p-1 rounded transition-colors ${
            starred 
              ? 'text-yellow-500 bg-white/90' 
              : 'text-gray-400 bg-white/90 hover:text-yellow-500'
          }`}
        >
          <Star className={`w-4 h-4 ${starred ? 'fill-current' : ''}`} />
        </button>
        
        {/* Menu button */}
        <div className="absolute top-3 right-10 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleMenuClick}
            className="p-1 bg-white/90 text-gray-600 hover:text-gray-900 rounded transition-colors"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
          
          {/* Dropdown menu */}
          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2">
                <Edit className="w-4 h-4" />
                Rename
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2">
                <Copy className="w-4 h-4" />
                Duplicate
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2">
                <Share className="w-4 h-4" />
                Share
              </button>
              <hr className="my-1" />
              <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2">
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        <h3 className="font-medium text-gray-900 mb-2 truncate">{title}</h3>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>{lastModified}</span>
          
          {/* Collaborators */}
          {collaborators.length > 0 && (
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              <div className="flex -space-x-1">
                {collaborators.slice(0, 3).map((collaborator) => (
                  <div
                    key={collaborator.id}
                    className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium border-2 border-white"
                    title={collaborator.name}
                  >
                    {collaborator.avatar}
                  </div>
                ))}
                {collaborators.length > 3 && (
                  <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center text-white text-xs font-medium border-2 border-white">
                    +{collaborators.length - 3}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}