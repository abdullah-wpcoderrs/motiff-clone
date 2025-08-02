import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import TopNavigation from '@/components/layout/TopNavigation';
import ProjectCard from '@/components/dashboard/ProjectCard';

// Sample project data
const sampleProjects = [
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
    id: '2',
    title: 'E-commerce Website',
    thumbnail: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=ecommerce%20website%20design%20product%20pages%20shopping%20cart%20modern%20layout&image_size=square',
    lastModified: '1 day ago',
    collaborators: [
      { id: '3', name: 'Mike Johnson', avatar: 'MJ' }
    ],
    isStarred: false,
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
    id: '4',
    title: 'Component Library',
    thumbnail: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=ui%20component%20library%20buttons%20forms%20cards%20design%20system&image_size=square',
    lastModified: '1 week ago',
    collaborators: [
      { id: '4', name: 'Sarah Wilson', avatar: 'SW' },
      { id: '5', name: 'Tom Brown', avatar: 'TB' },
      { id: '6', name: 'Lisa Davis', avatar: 'LD' }
    ],
    isStarred: false,
    type: 'component' as const
  },
  {
    id: '5',
    title: 'Landing Page Design',
    thumbnail: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20landing%20page%20design%20hero%20section%20clean%20layout%20marketing&image_size=square',
    lastModified: '2 weeks ago',
    collaborators: [
      { id: '7', name: 'Alex Chen', avatar: 'AC' }
    ],
    isStarred: false,
    type: 'design' as const
  },
  {
    id: '6',
    title: 'Social Media App',
    thumbnail: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=social%20media%20app%20interface%20feed%20posts%20mobile%20design&image_size=square',
    lastModified: '3 weeks ago',
    collaborators: [],
    isStarred: true,
    type: 'design' as const
  }
];

export default function Home() {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState('recents');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Filter projects based on search query
  const filteredProjects = sampleProjects.filter(project =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleProjectClick = (projectId: string) => {
    console.log('Opening project:', projectId);
    navigate(`/design/${projectId}`);
  };

  const handleNewDesign = () => {
    // Generate a new project ID and navigate to clean canvas
    const newProjectId = `project-${Date.now()}`;
    navigate(`/design/${newProjectId}`);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar 
        activeItem={activeItem} 
        onItemClick={setActiveItem} 
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <TopNavigation
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
        />
        
        {/* Content Area */}
        <div className="flex-1 overflow-auto p-6">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-2xl font-semibold text-gray-900">
                Recent projects
              </h1>
              <button 
                onClick={handleNewDesign}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                New Design
              </button>
            </div>
            <p className="text-gray-600">
              Pick up where you left off
            </p>
          </div>
          
          {/* Projects Grid */}
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
                No projects found
              </h3>
              <p className="text-gray-500">
                {searchQuery ? 'Try adjusting your search terms' : 'Create your first project to get started'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}