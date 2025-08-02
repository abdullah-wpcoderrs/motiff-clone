import { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import TopNavigation from '@/components/layout/TopNavigation';
import ProjectCard from '@/components/dashboard/ProjectCard';

// Sample starred projects
const starredProjects = [
  {
    id: '1',
    title: 'Mobile App Design',
    thumbnail: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20mobile%20app%20interface%20design%20mockup%20clean%20ui%20screens&image_size=square',
    lastModified: '2 hours ago',
    collaborators: [
      { id: '1', name: 'John Doe', avatar: 'JD' },
      { id: '2', name: 'Jane Smith', avatar: 'JS' }
    ],
    isStarred: true,
    type: 'design' as const
  },
  {
    id: '3',
    title: 'Dashboard Prototype',
    thumbnail: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=dashboard%20interface%20analytics%20charts%20data%20visualization%20clean%20design&image_size=square',
    lastModified: '3 days ago',
    collaborators: [],
    isStarred: true,
    type: 'prototype' as const
  },
  {
    id: '6',
    title: 'Social Media App',
    thumbnail: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=social%20media%20app%20interface%20feed%20posts%20mobile%20design&image_size=square',
    lastModified: '3 weeks ago',
    collaborators: [],
    isStarred: true,
    type: 'design' as const
  },
  {
    id: 'draft-2',
    title: 'E-learning Platform Draft',
    thumbnail: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=elearning%20platform%20interface%20draft%20design%20education&image_size=square',
    lastModified: '2 hours ago',
    collaborators: [
      { id: '2', name: 'Jane Smith', avatar: 'JS' },
      { id: '3', name: 'Mike Johnson', avatar: 'MJ' }
    ],
    isStarred: true,
    type: 'design' as const
  }
];

export default function Starred() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredProjects = starredProjects.filter(project =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        activeItem="starred" 
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
                Starred Projects
              </h1>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                New Design
              </button>
            </div>
            <p className="text-gray-600">
              Your favorite and most important projects
            </p>
          </div>
          
          {filteredProjects.length > 0 ? (
            <div className={`${
              viewMode === 'grid' 
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
                : 'space-y-4'
            }`}>
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  id={project.id}
                  title={project.title}
                  thumbnail={project.thumbnail}
                  lastModified={project.lastModified}
                  collaborators={project.collaborators}
                  isStarred={project.isStarred}
                  type={project.type}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No starred projects
              </h3>
              <p className="text-gray-500">
                {searchQuery ? 'Try adjusting your search terms' : 'Star your favorite projects to see them here'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}