import { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import TopNavigation from '@/components/layout/TopNavigation';

// Sample template categories
const templateCategories = [
  {
    id: 'mobile',
    title: 'Mobile Apps',
    description: 'iOS and Android app templates',
    count: 24,
    thumbnail: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=mobile%20app%20templates%20collection%20ios%20android&image_size=square'
  },
  {
    id: 'web',
    title: 'Web Templates',
    description: 'Landing pages, dashboards, and websites',
    count: 18,
    thumbnail: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=web%20templates%20landing%20pages%20dashboard%20designs&image_size=square'
  },
  {
    id: 'components',
    title: 'UI Components',
    description: 'Buttons, forms, cards, and more',
    count: 45,
    thumbnail: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=ui%20components%20library%20buttons%20forms%20cards&image_size=square'
  },
  {
    id: 'wireframes',
    title: 'Wireframes',
    description: 'Low-fidelity layouts and structures',
    count: 12,
    thumbnail: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=wireframe%20templates%20low%20fidelity%20layouts&image_size=square'
  }
];

const designTools = [
  {
    id: 'ai-generator',
    title: 'AI Design Generator',
    description: 'Generate designs with AI assistance',
    icon: '🤖'
  },
  {
    id: 'color-palette',
    title: 'Color Palette Generator',
    description: 'Create beautiful color schemes',
    icon: '🎨'
  },
  {
    id: 'icon-library',
    title: 'Icon Library',
    description: 'Thousands of icons to choose from',
    icon: '📦'
  },
  {
    id: 'font-pairing',
    title: 'Font Pairing Tool',
    description: 'Find perfect font combinations',
    icon: '🔤'
  }
];

export default function Templates() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        activeItem="templates" 
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
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              Templates and Tools
            </h1>
            <p className="text-gray-600">
              Start your design with professional templates and powerful tools
            </p>
          </div>
          
          {/* Design Tools Section */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Design Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {designTools.map((tool) => (
                <div
                  key={tool.id}
                  className="bg-white rounded-lg border border-gray-200 p-6 hover:border-gray-300 transition-colors cursor-pointer"
                >
                  <div className="text-3xl mb-3">{tool.icon}</div>
                  <h3 className="font-medium text-gray-900 mb-2">{tool.title}</h3>
                  <p className="text-sm text-gray-600">{tool.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Template Categories */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Template Categories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {templateCategories.map((category) => (
                <div
                  key={category.id}
                  className="bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200 cursor-pointer group"
                >
                  <div className="relative aspect-video bg-gray-100 rounded-t-lg overflow-hidden">
                    <img 
                      src={category.thumbnail} 
                      alt={category.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQwIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDI0MCAxODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyNDAiIGhlaWdodD0iMTgwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik05NiA3Mkw5NiA5NkwxMjAgOTZMMTQ0IDcyTDE0NCA5NkwxNjggOTZMMTkyIDcyTDE5MiAxMDhMNDggMTA4TDQ4IDcyTDcyIDcyTDk2IDcyWiIgZmlsbD0iI0Q5REREREQiLz4KPC9zdmc+';
                      }}
                    />
                    <div className="absolute top-3 right-3 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                      {category.count}
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 mb-2">{category.title}</h3>
                    <p className="text-sm text-gray-600">{category.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}