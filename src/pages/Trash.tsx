import { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import TopNavigation from '@/components/layout/TopNavigation';
import { RotateCcw, Trash2 } from 'lucide-react';

// Sample deleted projects
const deletedProjects = [
  {
    id: 'deleted-1',
    title: 'Old Landing Page',
    thumbnail: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=old%20landing%20page%20design%20outdated%20layout&image_size=square',
    deletedDate: '2 days ago',
    originalDate: '2 weeks ago',
    type: 'design' as const
  },
  {
    id: 'deleted-2',
    title: 'Unused Component Set',
    thumbnail: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=unused%20ui%20components%20library%20old%20design&image_size=square',
    deletedDate: '5 days ago',
    originalDate: '1 month ago',
    type: 'component' as const
  },
  {
    id: 'deleted-3',
    title: 'Prototype V1',
    thumbnail: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=old%20prototype%20version%20outdated%20interface&image_size=square',
    deletedDate: '1 week ago',
    originalDate: '3 weeks ago',
    type: 'prototype' as const
  }
];

export default function Trash() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const filteredProjects = deletedProjects.filter(project =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRestore = (projectId: string) => {
    console.log('Restoring project:', projectId);
    // TODO: Implement restore functionality
  };

  const handlePermanentDelete = (projectId: string) => {
    console.log('Permanently deleting project:', projectId);
    // TODO: Implement permanent delete functionality
  };

  const handleSelectItem = (projectId: string) => {
    setSelectedItems(prev => 
      prev.includes(projectId) 
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  };

  const getTypeIcon = (type: string) => {
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
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        activeItem="trash" 
        onItemClick={() => {}} 
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavigation
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
        />
        
        <div className="flex-1 overflow-auto p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-2xl font-semibold text-gray-900">
                Trash
              </h1>
              {selectedItems.length > 0 && (
                <div className="flex items-center gap-2">
                  <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
                    <RotateCcw className="w-4 h-4" />
                    Restore ({selectedItems.length})
                  </button>
                  <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
                    <Trash2 className="w-4 h-4" />
                    Delete Forever
                  </button>
                </div>
              )}
            </div>
            <p className="text-gray-600">
              Deleted projects are kept for 30 days before permanent deletion
            </p>
          </div>
          
          {filteredProjects.length > 0 ? (
            <div className={`${
              viewMode === 'grid' 
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
                : 'space-y-4'
            }`}>
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200 group"
                >
                  <div className="relative aspect-video bg-gray-100 rounded-t-lg overflow-hidden">
                    <img 
                      src={project.thumbnail} 
                      alt={project.title}
                      className="w-full h-full object-cover opacity-60"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQwIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDI0MCAxODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyNDAiIGhlaWdodD0iMTgwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik05NiA3Mkw5NiA5NkwxMjAgOTZMMTQ0IDcyTDE0NCA5NkwxNjggOTZMMTkyIDcyTDE5MiAxMDhMNDggMTA4TDQ4IDcyTDcyIDcyTDk2IDcyWiIgZmlsbD0iI0Q5REREREQiLz4KPC9zdmc+';
                      }}
                    />
                    
                    {/* Type indicator */}
                    <div className="absolute top-3 left-3">
                      {getTypeIcon(project.type)}
                    </div>
                    
                    {/* Selection checkbox */}
                    <div className="absolute top-3 right-3">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(project.id)}
                        onChange={() => handleSelectItem(project.id)}
                        className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500"
                      />
                    </div>
                    
                    {/* Deleted overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                      <Trash2 className="w-8 h-8 text-white opacity-80" />
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 mb-2 truncate">{project.title}</h3>
                    
                    <div className="text-sm text-gray-500 space-y-1">
                      <div>Deleted: {project.deletedDate}</div>
                      <div>Originally created: {project.originalDate}</div>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-4">
                      <button
                        onClick={() => handleRestore(project.id)}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-sm font-medium transition-colors flex items-center justify-center gap-1"
                      >
                        <RotateCcw className="w-3 h-3" />
                        Restore
                      </button>
                      <button
                        onClick={() => handlePermanentDelete(project.id)}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-sm font-medium transition-colors flex items-center justify-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Trash2 className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Trash is empty
              </h3>
              <p className="text-gray-500">
                {searchQuery ? 'No deleted projects match your search' : 'No deleted projects'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}