import { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import TopNavigation from '@/components/layout/TopNavigation';
import ProjectCard from '@/components/dashboard/ProjectCard';

// Sample draft projects
const draftProjects = [
  {
    id: 'draft-1',
    title: 'Mobile Banking App - WIP',
    thumbnail: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=mobile%20banking%20app%20interface%20work%20in%20progress%20wireframes&image_size=square',
    lastModified: '30 minutes ago',
    collaborators: [
      { id: '1', name: 'John Doe', avatar: 'JD' }
    ],
    isStarred: false,
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
  },
  {
    id: 'draft-3',
    title: 'Restaurant Menu App',
    thumbnail: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=restaurant%20menu%20app%20interface%20food%20ordering%20draft&image_size=square',
    lastModified: '1 day ago',
    collaborators: [],
    isStarred: false,
    type: 'prototype' as const
  }
];

export default function AllDrafts() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredProjects = draftProjects.filter(project =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        activeItem="drafts" 
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
                All Drafts
              </h1>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                New Design
              </button>
            </div>
            <p className="text-gray-600">
              Work in progress designs and shared drafts
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No drafts found
              </h3>
              <p className="text-gray-500">
                {searchQuery ? 'Try adjusting your search terms' : 'Start creating your first draft'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}