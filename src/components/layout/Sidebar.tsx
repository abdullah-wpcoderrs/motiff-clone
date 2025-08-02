import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  FileText, 
  Edit3, 
  Layout, 
  Star, 
  Trash2, 
  Search,
  ChevronDown,
  Plus
} from 'lucide-react';

interface SidebarProps {
  activeItem?: string;
  onItemClick?: (item: string) => void;
}

const sidebarItems = [
     { id: 'recents', label: 'Recents', icon: FileText, hasSubmenu: false, path: '/' },
     { id: 'drafts', label: 'All Drafts', icon: Edit3, hasSubmenu: false, path: '/drafts' },
     { id: 'templates', label: 'Templates and tools', icon: Layout, hasSubmenu: false, path: '/templates' },
     { id: 'projects', label: 'All projects', icon: FileText, hasSubmenu: false, path: '/projects' },
     { id: 'starred', label: 'Starred', icon: Star, hasSubmenu: false, path: '/starred' },
     { id: 'trash', label: 'Trash', icon: Trash2, hasSubmenu: false, path: '/trash' }
   ];

const workspaceItems = [
  { id: 'food-delivery', label: 'food delivery', type: 'Free', color: 'bg-pink-500' }
];

export default function Sidebar({ activeItem = 'recents', onItemClick }: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedWorkspace, setExpandedWorkspace] = useState('food-delivery');
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="w-64 bg-gray-900 text-white h-screen flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center text-xs font-bold">
            F
          </div>
          <span className="font-medium">felix jordan</span>
          <ChevronDown className="w-4 h-4 ml-auto" />
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search for anything"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-800 text-white placeholder-gray-400 pl-10 pr-4 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <button
                key={item.id}
                onClick={() => {
                  onItemClick?.(item.id);
                  navigate(item.path);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                  isActive 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="flex-1 text-left">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Workspace Section */}
        <div className="mt-6 px-2">
          {workspaceItems.map((workspace) => (
            <div key={workspace.id} className="mb-2">
              <button
                onClick={() => setExpandedWorkspace(expandedWorkspace === workspace.id ? '' : workspace.id)}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
              >
                <div className={`w-4 h-4 ${workspace.color} rounded`}></div>
                <span className="flex-1 text-left">{workspace.label}</span>
                <span className="text-xs text-gray-500">{workspace.type}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${
                  expandedWorkspace === workspace.id ? 'rotate-180' : ''
                }`} />
              </button>
              
              {expandedWorkspace === workspace.id && (
                <div className="ml-7 mt-2 space-y-1">
                  <button className="w-full flex items-center gap-2 px-3 py-1 text-xs text-gray-400 hover:text-white transition-colors">
                    <FileText className="w-3 h-3" />
                    <span>Drafts</span>
                  </button>
                  <button className="w-full flex items-center gap-2 px-3 py-1 text-xs text-gray-400 hover:text-white transition-colors">
                    <FileText className="w-3 h-3" />
                    <span>All projects</span>
                  </button>
                  <button className="w-full flex items-center gap-2 px-3 py-1 text-xs text-gray-400 hover:text-white transition-colors">
                    <Trash2 className="w-3 h-3" />
                    <span>Trash</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-auto p-4 border-t border-gray-700">
          <div className="bg-blue-600 rounded-lg p-3 text-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-xs">?</span>
              </div>
              <span className="font-medium">Ready to go beyond this free plan?</span>
            </div>
            <p className="text-blue-100 text-xs mb-3">
              Upgrade now for premium features.
            </p>
            <button className="w-full bg-white text-blue-600 py-2 px-3 rounded-md text-xs font-medium hover:bg-blue-50 transition-colors">
              View plans
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}