import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Share, 
  Play, 
  Users, 
  MessageCircle, 
  Settings,
  Undo,
  Redo,
  ZoomIn,
  ZoomOut,
  Hand,
  MousePointer,
  Square,
  Circle,
  Type,
  Image,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Layers,
  Folder,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Copy,
  Trash2,
  Move,
  RotateCcw,
  Palette,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  AlignVerticalJustifyStart as AlignTop,
  AlignVerticalJustifyCenter as AlignMiddle,
  AlignVerticalJustifyEnd as AlignBottom,
  Grid,
  Ruler,
  Download,
  Upload,
  Search,
  Plus,
  Star,
  Heart,
  Triangle,
  Hexagon,
  Pen,
  PenTool,
  Eraser,
  Pipette,
  Component,
  Smartphone,
  Tablet,
  Monitor,
  Bot,
  Zap,
  Code,
  Sparkles,
  Wand2,
  PanelRightOpen,
  PanelLeftOpen,
  FrameIcon as Frame,
  Minus as Line,
  SeparatorHorizontal,
  SeparatorVertical,
  MoreHorizontal
} from 'lucide-react';

interface HorizontalToolbarProps {
  selectedTool: string;
  onToolSelect: (tool: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

function HorizontalToolbar({ selectedTool, onToolSelect, isCollapsed, onToggleCollapse }: HorizontalToolbarProps) {
  const toolGroups = [
    {
      name: 'Selection',
      tools: [
        { 
          id: 'select', 
          icon: MousePointer, 
          label: 'Select Tool', 
          shortcut: 'V',
          tooltip: 'Select Tool - Default tool for selecting and moving elements, multi-selection with Shift+Click (V)'
        },
        { 
          id: 'hand', 
          icon: Hand, 
          label: 'Hand Tool', 
          shortcut: 'H',
          tooltip: 'Hand Tool - Pan around the canvas, spacebar + click and drag (H)'
        }
      ]
    },
    {
      name: 'Frames',
      tools: [
        { 
          id: 'frame', 
          icon: Frame, 
          label: 'Frame Tool', 
          shortcut: 'F',
          tooltip: 'Frame Tool - Creates screen-sized containers (Mobile, Tablet, Desktop) for prototyping (F)',
          submenu: [
            // iPhone Frames
            { id: 'iphone-16-pro-max', label: 'iPhone 16 Pro Max', dimensions: { width: 440, height: 956 } },
            { id: 'iphone-16-plus', label: 'iPhone 16 Plus', dimensions: { width: 430, height: 932 } },
            { id: 'iphone-16-pro', label: 'iPhone 16 Pro', dimensions: { width: 402, height: 874 } },
            { id: 'iphone-16', label: 'iPhone 16', dimensions: { width: 393, height: 852 } },
            { id: 'iphone-14-15-pro', label: 'iPhone 14 & 15 Pro', dimensions: { width: 430, height: 932 } },
            { id: 'iphone-14-15-pro-standard', label: 'iPhone 14 & 15 Pro', dimensions: { width: 393, height: 852 } },
            { id: 'iphone-13-14', label: 'iPhone 13 & 14', dimensions: { width: 390, height: 844 } },
            { id: 'iphone-14-plus', label: 'iPhone 14 Plus', dimensions: { width: 428, height: 926 } },
            { id: 'iphone-13-pro-max', label: 'iPhone 13 Pro Max', dimensions: { width: 428, height: 926 } },
            { id: 'iphone-13-mini', label: 'iPhone 13 mini', dimensions: { width: 375, height: 812 } },
            { id: 'iphone-11-pro-max', label: 'iPhone 11 Pro Max', dimensions: { width: 414, height: 896 } },
            { id: 'iphone-11-pro-x', label: 'iPhone 11 Pro / X', dimensions: { width: 375, height: 812 } },
            { id: 'iphone-se', label: 'iPhone SE', dimensions: { width: 320, height: 568 } },
            { id: 'iphone-8-plus', label: 'iPhone 8 Plus', dimensions: { width: 414, height: 736 } },
            { id: 'iphone-8', label: 'iPhone 8', dimensions: { width: 375, height: 667 } },
            // Android Frames
            { id: 'android-small', label: 'Android Small', dimensions: { width: 360, height: 640 } },
            { id: 'android-large', label: 'Android Large', dimensions: { width: 360, height: 800 } },
            // iPad Frames
            { id: 'ipad-mini-97', label: 'iPad mini 9.7"', dimensions: { width: 768, height: 1024 } },
            { id: 'ipad-mini-83', label: 'iPad mini 8.3"', dimensions: { width: 744, height: 1133 } },
            { id: 'ipad-pro-11', label: 'iPad Pro 11"', dimensions: { width: 834, height: 1194 } },
            { id: 'ipad-pro-129', label: 'iPad Pro 12.9"', dimensions: { width: 1024, height: 1366 } },
            // Web Frames
            { id: 'web-1920', label: 'Web 1920', dimensions: { width: 1920, height: 1080 } },
            { id: 'web-1440', label: 'Web 1440', dimensions: { width: 1440, height: 900 } },
            { id: 'web-1280', label: 'Web 1280', dimensions: { width: 1280, height: 800 } },
            // MacBook Frames
            { id: 'macbook-air', label: 'MacBook Air', dimensions: { width: 1280, height: 832 } },
            { id: 'macbook-pro-14', label: 'MacBook Pro 14"', dimensions: { width: 1512, height: 982 } },
            { id: 'macbook-pro-16', label: 'MacBook Pro 16"', dimensions: { width: 1728, height: 1117 } },
            // Desktop Frames
            { id: 'imac', label: 'iMac', dimensions: { width: 1280, height: 720 } },
            { id: 'tv', label: 'TV', dimensions: { width: 1280, height: 720 } },
            // Apple Watch Frames
            { id: 'apple-watch-49mm', label: 'Apple Watch 49mm', dimensions: { width: 205, height: 251 } },
            { id: 'apple-watch-45mm', label: 'Apple Watch 45mm', dimensions: { width: 198, height: 242 } },
            { id: 'apple-watch-44mm', label: 'Apple Watch 44mm', dimensions: { width: 184, height: 224 } },
            { id: 'apple-watch-42mm', label: 'Apple Watch 42mm', dimensions: { width: 156, height: 195 } },
            { id: 'apple-watch-41mm', label: 'Apple Watch 41mm', dimensions: { width: 176, height: 215 } },
            { id: 'apple-watch-40mm', label: 'Apple Watch 40mm', dimensions: { width: 162, height: 197 } },
            { id: 'apple-watch-38mm', label: 'Apple Watch 38mm', dimensions: { width: 136, height: 170 } }
          ]
        }
      ]
    },
    {
      name: 'Shapes',
      tools: [
        { 
          id: 'rectangle', 
          icon: Square, 
          label: 'Rectangle', 
          shortcut: 'R',
          tooltip: 'Rectangle Tool - Create rectangular shapes, basic building blocks for UI design (R)'
        },
        { 
          id: 'circle', 
          icon: Circle, 
          label: 'Ellipse', 
          shortcut: 'O',
          tooltip: 'Ellipse Tool - Create circular and oval shapes, perfect for buttons and icons (O)'
        },
        { 
          id: 'line', 
          icon: Line, 
          label: 'Line', 
          shortcut: 'L',
          tooltip: 'Line Tool - Create straight lines and dividers for layout structure (L)'
        },
        { 
          id: 'polygon', 
          icon: Star, 
          label: 'Polygon', 
          shortcut: 'P',
          tooltip: 'Polygon Tool - Create custom polygons and star shapes with adjustable points (P)'
        }
      ]
    },
    {
      name: 'Content',
      tools: [
        { 
          id: 'text', 
          icon: Type, 
          label: 'Text Tool', 
          shortcut: 'T',
          tooltip: 'Text Tool - Create and edit text layers with rich formatting options (T)'
        },
        { 
          id: 'image', 
          icon: Image, 
          label: 'Image Tool', 
          shortcut: 'I',
          tooltip: 'Image Tool - Upload and place images, supports drag & drop and cropping (I)'
        },
        { 
          id: 'component', 
          icon: Component, 
          label: 'Component Tool', 
          shortcut: 'C',
          tooltip: 'Component Tool - Create reusable design elements and manage design system (C)'
        }
      ]
    },
    {
      name: 'Alignment',
      tools: [
        { 
          id: 'align-left', 
          icon: AlignLeft, 
          label: 'Align Left', 
          shortcut: 'Ctrl+Shift+L',
          tooltip: 'Align Left - Align selected elements to the left edge'
        },
        { 
          id: 'align-center', 
          icon: AlignCenter, 
          label: 'Align Center', 
          shortcut: 'Ctrl+Shift+C',
          tooltip: 'Align Center - Align selected elements to horizontal center'
        },
        { 
          id: 'align-right', 
          icon: AlignRight, 
          label: 'Align Right', 
          shortcut: 'Ctrl+Shift+R',
          tooltip: 'Align Right - Align selected elements to the right edge'
        },
        { 
          id: 'align-top', 
          icon: AlignTop, 
          label: 'Align Top', 
          shortcut: 'Ctrl+Shift+T',
          tooltip: 'Align Top - Align selected elements to the top edge'
        },
        { 
          id: 'align-middle', 
          icon: AlignMiddle, 
          label: 'Align Middle', 
          shortcut: 'Ctrl+Shift+M',
          tooltip: 'Align Middle - Align selected elements to vertical center'
        },
        { 
          id: 'align-bottom', 
          icon: AlignBottom, 
          label: 'Align Bottom', 
          shortcut: 'Ctrl+Shift+B',
          tooltip: 'Align Bottom - Align selected elements to the bottom edge'
        },
        { 
          id: 'distribute-horizontal', 
          icon: SeparatorHorizontal, 
          label: 'Distribute Horizontally', 
          shortcut: 'Ctrl+Shift+H',
          tooltip: 'Distribute Horizontally - Evenly space selected elements horizontally'
        },
        { 
          id: 'distribute-vertical', 
          icon: SeparatorVertical, 
          label: 'Distribute Vertically', 
          shortcut: 'Ctrl+Shift+V',
          tooltip: 'Distribute Vertically - Evenly space selected elements vertically'
        }
      ]
    },
    {
      name: 'Utilities',
      tools: [
        { 
          id: 'comment', 
          icon: MessageCircle, 
          label: 'Comment Tool', 
          shortcut: 'Ctrl+/',
          tooltip: 'Comment Tool - Add collaborative comments and feedback pins on canvas elements'
        },
        { 
          id: 'eyedropper', 
          icon: Pipette, 
          label: 'Eyedropper', 
          shortcut: 'I',
          tooltip: 'Eyedropper Tool - Sample colors from any element on the canvas (I)'
        },
        { 
          id: 'grid', 
          icon: Grid, 
          label: 'Grid Toggle', 
          shortcut: 'Ctrl+G',
          tooltip: 'Grid Toggle - Show/hide layout grid for precise positioning (Ctrl+G)'
        }
      ]
    }
  ];

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center gap-2">
      <button
        onClick={onToggleCollapse}
        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        title="Toggle Toolbar"
      >
        {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
      </button>
      
      {!isCollapsed ? (
        <div className="flex items-center gap-4">
          {toolGroups.map((group, groupIndex) => (
            <div key={group.name} className="flex items-center gap-1">
              {groupIndex > 0 && <div className="w-px h-6 bg-gray-300 mx-2" />}
              {group.tools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <button
                    key={tool.id}
                    onClick={() => onToolSelect(tool.id)}
                    className={`w-8 h-8 rounded-md flex items-center justify-center transition-colors ${
                      selectedTool === tool.id
                        ? 'bg-blue-100 text-blue-600 shadow-sm'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                    title={tool.tooltip || `${tool.label} (${tool.shortcut})`}
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center gap-2">
          {toolGroups.map((group, groupIndex) => {
            const firstTool = group.tools[0];
            const Icon = firstTool.icon;
            return (
              <button
                key={group.name}
                onClick={() => onToolSelect(firstTool.id)}
                className={`w-8 h-8 rounded-md flex items-center justify-center transition-colors ${
                  selectedTool === firstTool.id
                    ? 'bg-blue-100 text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                title={firstTool.tooltip || `${firstTool.label} (${firstTool.shortcut})`}
              >
                <Icon className="w-4 h-4" />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

interface SidePanelProps {
  isCollapsed: boolean;
  onToggle: () => void;
  side: 'left' | 'right';
  children: React.ReactNode;
  title?: string;
}

function SidePanel({ isCollapsed, onToggle, side, children, title }: SidePanelProps) {
  if (isCollapsed) {
    return (
      <div className={`bg-white border-${side === 'left' ? 'r' : 'l'} border-gray-200 w-12 flex flex-col items-center py-4`}>
        <button
          onClick={onToggle}
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
          title={`Expand ${title || (side === 'left' ? 'Left Panel' : 'Right Panel')}`}
        >
          {side === 'left' ? <PanelLeftOpen className="w-4 h-4" /> : <PanelRightOpen className="w-4 h-4" />}
        </button>
      </div>
    );
  }

  return (
    <div className={`bg-white border-${side === 'left' ? 'r' : 'l'} border-gray-200 transition-all duration-300 w-80 flex flex-col`}>
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
          <h3 className="font-semibold text-gray-900 text-sm">
            {title || (side === 'left' ? 'Design Panel' : 'Properties')}
          </h3>
          <button
            onClick={onToggle}
            className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-md transition-colors"
          >
            {side === 'left' ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}

interface LayerItemProps {
  name: string;
  type: 'frame' | 'group' | 'shape' | 'text' | 'image';
  isVisible: boolean;
  isLocked: boolean;
  isSelected: boolean;
  level: number;
  onToggleVisibility: () => void;
  onToggleLock: () => void;
  onSelect: () => void;
}

function LayerItem({ name, type, isVisible, isLocked, isSelected, level, onToggleVisibility, onToggleLock, onSelect }: LayerItemProps) {
  const getTypeIcon = () => {
    switch (type) {
      case 'frame': return <Monitor className="w-3 h-3" />;
      case 'group': return <Folder className="w-3 h-3" />;
      case 'shape': return <Square className="w-3 h-3" />;
      case 'text': return <Type className="w-3 h-3" />;
      case 'image': return <Image className="w-3 h-3" />;
      default: return <Square className="w-3 h-3" />;
    }
  };

  return (
    <div 
      className={`flex items-center gap-2 px-3 py-2 text-sm cursor-pointer hover:bg-gray-50 ${
        isSelected ? 'bg-blue-50 border-l-2 border-blue-500' : ''
      }`}
      style={{ paddingLeft: `${12 + level * 16}px` }}
      onClick={onSelect}
    >
      <div className="flex items-center gap-1 flex-1 min-w-0">
        <div className="text-gray-500 flex-shrink-0">
          {getTypeIcon()}
        </div>
        <span className="truncate text-gray-900">{name}</span>
      </div>
      <div className="flex items-center gap-1 flex-shrink-0">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleVisibility();
          }}
          className="p-1 text-gray-400 hover:text-gray-600 rounded"
        >
          {isVisible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleLock();
          }}
          className="p-1 text-gray-400 hover:text-gray-600 rounded"
        >
          {isLocked ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
        </button>
      </div>
    </div>
  );
}

export default function DesignCanvas() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [selectedTool, setSelectedTool] = useState('select');
  const [leftPanelCollapsed, setLeftPanelCollapsed] = useState(false);
  const [rightPanelCollapsed, setRightPanelCollapsed] = useState(false);
  const [toolbarCollapsed, setToolbarCollapsed] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [activeLeftTab, setActiveLeftTab] = useState<'layers' | 'assets' | 'components'>('layers');
  const [activeRightTab, setActiveRightTab] = useState<'ai' | 'design' | 'prototype'>('design');
  const [selectedLayer, setSelectedLayer] = useState<string | null>(null);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [showGrid, setShowGrid] = useState(false);
  const [isCreatingShape, setIsCreatingShape] = useState(false);
  const [canvasElements, setCanvasElements] = useState<any[]>([]);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [dragStart, setDragStart] = useState<{x: number, y: number} | null>(null);
  const [contextMenu, setContextMenu] = useState<{x: number, y: number, elementId?: string} | null>(null);
  const [multiSelection, setMultiSelection] = useState<string[]>([]);
  const [canvasOffset, setCanvasOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState<{ x: number, y: number } | null>(null);
  const [isSpacePressed, setIsSpacePressed] = useState(false);

  // Mock project data - in real app, this would be fetched based on projectId
  const projectTitle = `Design Project ${projectId}`;

  // Enhanced keyboard shortcuts
  // Close context menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setContextMenu(null);
    };

    if (contextMenu) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [contextMenu]);

  const handleAlignment = (alignmentType: string) => {
    const selectedElements = canvasElements.filter(el => 
      el.selected || multiSelection.includes(el.id)
    );
    
    if (selectedElements.length < 2 && !alignmentType.includes('align')) return;
    
    let updatedElements = [...canvasElements];
    
    switch (alignmentType) {
      case 'align-left':
        const leftMost = Math.min(...selectedElements.map(el => el.x));
        updatedElements = updatedElements.map(el => 
          selectedElements.find(sel => sel.id === el.id) 
            ? { ...el, x: leftMost }
            : el
        );
        break;
      case 'align-center':
        const centerX = selectedElements.reduce((sum, el) => sum + el.x + el.width / 2, 0) / selectedElements.length;
        updatedElements = updatedElements.map(el => 
          selectedElements.find(sel => sel.id === el.id) 
            ? { ...el, x: centerX - el.width / 2 }
            : el
        );
        break;
      case 'align-right':
        const rightMost = Math.max(...selectedElements.map(el => el.x + el.width));
        updatedElements = updatedElements.map(el => 
          selectedElements.find(sel => sel.id === el.id) 
            ? { ...el, x: rightMost - el.width }
            : el
        );
        break;
      case 'align-top':
        const topMost = Math.min(...selectedElements.map(el => el.y));
        updatedElements = updatedElements.map(el => 
          selectedElements.find(sel => sel.id === el.id) 
            ? { ...el, y: topMost }
            : el
        );
        break;
      case 'align-middle':
        const centerY = selectedElements.reduce((sum, el) => sum + el.y + el.height / 2, 0) / selectedElements.length;
        updatedElements = updatedElements.map(el => 
          selectedElements.find(sel => sel.id === el.id) 
            ? { ...el, y: centerY - el.height / 2 }
            : el
        );
        break;
      case 'align-bottom':
        const bottomMost = Math.max(...selectedElements.map(el => el.y + el.height));
        updatedElements = updatedElements.map(el => 
          selectedElements.find(sel => sel.id === el.id) 
            ? { ...el, y: bottomMost - el.height }
            : el
        );
        break;
      case 'distribute-horizontal':
        if (selectedElements.length >= 3) {
          const sorted = selectedElements.sort((a, b) => a.x - b.x);
          const totalWidth = sorted[sorted.length - 1].x - sorted[0].x;
          const spacing = totalWidth / (sorted.length - 1);
          
          updatedElements = updatedElements.map(el => {
            const index = sorted.findIndex(sel => sel.id === el.id);
            return index !== -1 
              ? { ...el, x: sorted[0].x + spacing * index }
              : el;
          });
        }
        break;
      case 'distribute-vertical':
        if (selectedElements.length >= 3) {
          const sorted = selectedElements.sort((a, b) => a.y - b.y);
          const totalHeight = sorted[sorted.length - 1].y - sorted[0].y;
          const spacing = totalHeight / (sorted.length - 1);
          
          updatedElements = updatedElements.map(el => {
            const index = sorted.findIndex(sel => sel.id === el.id);
            return index !== -1 
              ? { ...el, y: sorted[0].y + spacing * index }
              : el;
          });
        }
        break;
    }
    
    setCanvasElements(updatedElements);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Handle space key for panning
      if (e.code === 'Space' && !isSpacePressed) {
        e.preventDefault();
        setIsSpacePressed(true);
        return;
      }
      
      // Handle Ctrl/Cmd combinations
      if (e.ctrlKey || e.metaKey) {
        if (e.shiftKey) {
          switch (e.key.toLowerCase()) {
            case 'l':
              e.preventDefault();
              handleAlignment('align-left');
              break;
            case 'c':
              e.preventDefault();
              handleAlignment('align-center');
              break;
            case 'r':
              e.preventDefault();
              handleAlignment('align-right');
              break;
            case 't':
              e.preventDefault();
              handleAlignment('align-top');
              break;
            case 'm':
              e.preventDefault();
              handleAlignment('align-middle');
              break;
            case 'b':
              e.preventDefault();
              handleAlignment('align-bottom');
              break;
            case 'h':
              e.preventDefault();
              handleAlignment('distribute-horizontal');
              break;
            case 'v':
              e.preventDefault();
              handleAlignment('distribute-vertical');
              break;
          }
        } else {
          switch (e.key.toLowerCase()) {
            case 'g':
               e.preventDefault();
               setShowGrid(prev => !prev);
               break;
            case '/':
              e.preventDefault();
              setSelectedTool('comment');
              break;
            case 'd':
              e.preventDefault();
              // Duplicate selected elements
              if (selectedElement || multiSelection.length > 0) {
                const elementsToDuplicate = selectedElement 
                  ? [canvasElements.find(el => el.id === selectedElement)]
                  : canvasElements.filter(el => multiSelection.includes(el.id));
                
                const duplicatedElements = elementsToDuplicate
                  .filter(Boolean)
                  .map(el => ({
                    ...el,
                    id: `${el.type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                    x: el.x + 20,
                    y: el.y + 20,
                    selected: true
                  }));
                
                setCanvasElements(prev => [...prev, ...duplicatedElements]);
                if (duplicatedElements.length === 1) {
                  setSelectedElement(duplicatedElements[0].id);
                  setMultiSelection([]);
                } else {
                  setMultiSelection(duplicatedElements.map(el => el.id));
                  setSelectedElement(null);
                }
              }
              break;
            case 'a':
              e.preventDefault();
              // Select all elements
              setMultiSelection(canvasElements.map(el => el.id));
              setSelectedElement(null);
              setCanvasElements(prev => prev.map(el => ({ ...el, selected: true })));
              break;
          }
        }
        return;
      }
      
      // Handle Delete key
      if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault();
        const elementsToDelete = selectedElement 
          ? [selectedElement]
          : multiSelection;
        
        if (elementsToDelete.length > 0) {
          setCanvasElements(prev => prev.filter(el => !elementsToDelete.includes(el.id)));
          setSelectedElement(null);
          setMultiSelection([]);
        }
        return;
      }
      
      // Handle Escape key
      if (e.key === 'Escape') {
        e.preventDefault();
        setSelectedElement(null);
        setMultiSelection([]);
        setCanvasElements(prev => prev.map(el => ({ ...el, selected: false })));
        setContextMenu(null);
        return;
      }
      
      // Handle single key shortcuts
      switch (e.key.toLowerCase()) {
        case 'v':
          setSelectedTool('select');
          break;
        case 'h':
          setSelectedTool('hand');
          break;
        case 'f':
          setSelectedTool('frame');
          break;
        case 'r':
          setSelectedTool('rectangle');
          break;
        case 'o':
          setSelectedTool('circle');
          break;
        case 'l':
          setSelectedTool('line');
          break;
        case 'p':
          setSelectedTool('polygon');
          break;
        case 't':
          setSelectedTool('text');
          break;
        case 'i':
          setSelectedTool('eyedropper');
          break;
        case 'c':
          setSelectedTool('component');
          break;
        case ' ':
          e.preventDefault();
          setSelectedTool('hand');
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        setIsSpacePressed(false);
        setIsPanning(false);
        setPanStart(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [selectedElement, multiSelection, canvasElements, handleAlignment]);

  // Auto-expand right panel when element is selected
  // (handleElementSelect function is defined later with enhanced functionality)

  // Dynamic layers data - starts empty for new projects
  const [layers, setLayers] = useState<Array<{
    id: string;
    name: string;
    type: 'frame' | 'group' | 'shape' | 'text' | 'image';
    isVisible: boolean;
    isLocked: boolean;
    level: number;
  }>>([]);

  const toggleLayerVisibility = (layerId: string) => {
    setLayers(prev => prev.map(layer => 
      layer.id === layerId ? { ...layer, isVisible: !layer.isVisible } : layer
    ));
    // Also update the canvas element visibility
    setCanvasElements(prev => prev.map(element => 
      element.id === layerId ? { ...element, isVisible: !element.isVisible } : element
    ));
  };

  const toggleLayerLock = (layerId: string) => {
    setLayers(prev => prev.map(layer => 
      layer.id === layerId ? { ...layer, isLocked: !layer.isLocked } : layer
    ));
    // Also update the canvas element lock state
    setCanvasElements(prev => prev.map(element => 
      element.id === layerId ? { ...element, isLocked: !element.isLocked } : element
    ));
  };

  // Sync canvas elements with layers panel
  const syncElementsToLayers = (elements: any[]) => {
    const newLayers = elements.map((element, index) => ({
      id: element.id,
      name: element.device || element.content || `${element.type.charAt(0).toUpperCase() + element.type.slice(1)} ${index + 1}`,
      type: element.type === 'rectangle' || element.type === 'circle' || element.type === 'line' || element.type === 'polygon' ? 'shape' as const :
            element.type === 'text' ? 'text' as const :
            element.type === 'frame' ? 'frame' as const :
            element.type === 'image' ? 'image' as const :
            'shape' as const,
      isVisible: true,
      isLocked: false,
      level: 0
    }));
    setLayers(newLayers);
  };

  // Update layers whenever canvas elements change
  useEffect(() => {
    syncElementsToLayers(canvasElements);
  }, [canvasElements]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 25, 400));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 25, 25));
  };

  // Canvas interaction handlers
  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    // Check if panning (space key held, middle mouse button, or Ctrl/Cmd+click)
    if (e.button === 1 || (e.button === 0 && (e.ctrlKey || e.metaKey)) || (e.button === 0 && isSpacePressed)) {
      setIsPanning(true);
      setPanStart({ x: e.clientX, y: e.clientY });
      return;
    }
    
    if (selectedTool === 'select') return;
    
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const x = e.clientX - rect.left - canvasOffset.x;
    const y = e.clientY - rect.top - canvasOffset.y;
    
    setDragStart({ x, y });
    setIsCreatingShape(true);
  };

  const handleCanvasMouseMove = (e: React.MouseEvent) => {
    // Handle panning
    if (isPanning && panStart) {
      const deltaX = e.clientX - panStart.x;
      const deltaY = e.clientY - panStart.y;
      
      setCanvasOffset(prev => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY
      }));
      
      setPanStart({ x: e.clientX, y: e.clientY });
      return;
    }
    
    if (!isCreatingShape || !dragStart) return;
    
    // Handle shape creation preview
  };

  const handleCanvasMouseUp = (e: React.MouseEvent) => {
    // End panning
    if (isPanning) {
      setIsPanning(false);
      setPanStart(null);
      return;
    }
    
    if (!isCreatingShape || !dragStart) return;
    
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const x = e.clientX - rect.left - canvasOffset.x;
    const y = e.clientY - rect.top - canvasOffset.y;
    
    // Create new element based on selected tool
    if (selectedTool === 'rectangle' || selectedTool === 'circle' || selectedTool === 'line') {
      const newElement = {
        id: `element-${Date.now()}`,
        type: selectedTool,
        x: Math.min(dragStart.x, x),
        y: Math.min(dragStart.y, y),
        width: Math.abs(x - dragStart.x),
        height: Math.abs(y - dragStart.y),
        selected: true
      };
      
      setCanvasElements(prev => [...prev, newElement]);
      setSelectedElement(newElement.id);
    }
    
    setIsCreatingShape(false);
    setDragStart(null);
  };

  const handleElementSelect = (elementId: string, isShiftClick = false) => {
    if (isShiftClick) {
      // Multi-selection with Shift+Click
      setMultiSelection(prev => {
        if (prev.includes(elementId)) {
          return prev.filter(id => id !== elementId);
        } else {
          return [...prev, elementId];
        }
      });
    } else {
      setSelectedElement(elementId);
      setMultiSelection([]);
      setCanvasElements(prev => prev.map(el => ({
        ...el,
        selected: el.id === elementId
      })));
    }
    
    if (rightPanelCollapsed) {
      setRightPanelCollapsed(false);
    }
    setContextMenu(null);
  };

  const handleContextMenu = (e: React.MouseEvent, elementId?: string) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      elementId
    });
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSelectedElement(null);
      setMultiSelection([]);
      setCanvasElements(prev => prev.map(el => ({ ...el, selected: false })));
    }
    setContextMenu(null);
  };

  const handleToolSelect = (toolId: string) => {
    setSelectedTool(toolId);
    
    // Handle special tool actions
    switch (toolId) {
      case 'grid':
        setShowGrid(prev => !prev);
        break;
      case 'text':
        // Text tool creates text immediately
        const textElement = {
          id: `text-${Date.now()}`,
          type: 'text',
          x: 100,
          y: 100,
          width: 200,
          height: 40,
          content: 'Edit this text',
          selected: true,
          fontSize: 16,
          fontFamily: 'Inter',
          color: '#1F2937',
          fontWeight: 'normal'
        };
        setCanvasElements(prev => [...prev, textElement]);
        setSelectedElement(textElement.id);
        break;
      case 'frame':
        // Frame tool creates a device frame with default iPhone dimensions
        const frameElement = {
          id: `frame-${Date.now()}`,
          type: 'frame',
          x: 50,
          y: 50,
          width: 375,
          height: 812,
          device: 'iPhone 14 Pro',
          selected: true,
          backgroundColor: '#FFFFFF',
          borderRadius: 8
        };
        setCanvasElements(prev => [...prev, frameElement]);
        setSelectedElement(frameElement.id);
        break;
      // Handle specific frame types from submenu
      default:
        if (toolId.startsWith('iphone-') || toolId.startsWith('android-') || toolId.startsWith('ipad-') || 
            toolId.startsWith('web-') || toolId.startsWith('macbook-') || toolId.startsWith('imac') || 
            toolId.startsWith('tv') || toolId.startsWith('apple-watch-')) {
          // Find the frame configuration
          const frameConfig = toolGroups.find(group => group.some(tool => tool.id === 'frame'))
            ?.find(tool => tool.id === 'frame')?.submenu?.find(frame => frame.id === toolId);
          
          if (frameConfig) {
            const specificFrameElement = {
              id: `frame-${Date.now()}`,
              type: 'frame',
              x: 50,
              y: 50,
              width: frameConfig.dimensions.width,
              height: frameConfig.dimensions.height,
              device: frameConfig.label,
              selected: true,
              backgroundColor: '#FFFFFF',
              borderRadius: toolId.startsWith('apple-watch-') ? 12 : 8
            };
            setCanvasElements(prev => [...prev, specificFrameElement]);
            setSelectedElement(specificFrameElement.id);
          }
        }
        break;
      case 'component':
        // Component tool creates a reusable component
        const componentElement = {
          id: `component-${Date.now()}`,
          type: 'component',
          x: 100,
          y: 100,
          width: 120,
          height: 40,
          componentType: 'Button',
          selected: true,
          backgroundColor: '#3B82F6',
          borderRadius: 6
        };
        setCanvasElements(prev => [...prev, componentElement]);
        setSelectedElement(componentElement.id);
        break;
      case 'comment':
        // Comment tool creates a comment pin
        const commentElement = {
          id: `comment-${Date.now()}`,
          type: 'comment',
          x: 150,
          y: 150,
          width: 24,
          height: 24,
          content: 'Add your comment here...',
          selected: true,
          author: 'Current User',
          timestamp: new Date().toISOString()
        };
        setCanvasElements(prev => [...prev, commentElement]);
        setSelectedElement(commentElement.id);
        break;
      case 'align-left':
      case 'align-center':
      case 'align-right':
      case 'align-top':
      case 'align-middle':
      case 'align-bottom':
      case 'distribute-horizontal':
      case 'distribute-vertical':
        handleAlignment(toolId);
        break;
    }
  };



  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      {/* Top Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={handleBack}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">{projectTitle}</h1>
          
          {/* Frame Selection */}
          <div className="flex items-center gap-2 ml-8">
            <button className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
              <Smartphone className="w-4 h-4" />
              iPhone 14 Pro
              <ChevronDown className="w-3 h-3" />
            </button>
            <button className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors">
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {/* History Controls */}
          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
            <Undo className="w-4 h-4" />
          </button>
          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
            <Redo className="w-4 h-4" />
          </button>
          
          <div className="w-px h-6 bg-gray-300 mx-2" />
          
          {/* Zoom Controls */}
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={handleZoomOut}
              className="p-1 text-gray-600 hover:text-gray-900 rounded"
            >
              <ZoomOut className="w-3 h-3" />
            </button>
            <span className="px-2 text-xs font-medium text-gray-700 min-w-[2.5rem] text-center">
              {zoomLevel}%
            </span>
            <button
              onClick={handleZoomIn}
              className="p-1 text-gray-600 hover:text-gray-900 rounded"
            >
              <ZoomIn className="w-3 h-3" />
            </button>
          </div>
          
          <div className="w-px h-6 bg-gray-300 mx-2" />
          
          {/* Collaboration */}
          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
            <MessageCircle className="w-4 h-4" />
          </button>
          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
            <Users className="w-4 h-4" />
          </button>
          
          {/* Action Buttons */}
          <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
            <Play className="w-3 h-3" />
            Preview
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
            <Share className="w-3 h-3" />
            Share
          </button>
          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {/* Horizontal Toolbar */}
      <HorizontalToolbar
        selectedTool={selectedTool}
        onToolSelect={handleToolSelect}
        isCollapsed={toolbarCollapsed}
        onToggleCollapse={() => setToolbarCollapsed(!toolbarCollapsed)}
      />
      
      {/* Main Canvas Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel */}
        <SidePanel
          isCollapsed={leftPanelCollapsed}
          onToggle={() => setLeftPanelCollapsed(!leftPanelCollapsed)}
          side="left"
        >
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200 bg-gray-50">
            {[
              { id: 'layers' as const, label: 'Layers', icon: Layers },
              { id: 'assets' as const, label: 'Assets', icon: Image },
              { id: 'components' as const, label: 'Components', icon: Component }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveLeftTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 px-3 py-3 text-xs font-medium transition-colors ${
                    activeLeftTab === tab.id
                      ? 'bg-white text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="p-4">
            {activeLeftTab === 'layers' && (
              <div className="space-y-2">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold text-gray-900">Layers</h4>
                  <div className="flex items-center gap-1">
                    <button className="p-1 text-gray-500 hover:text-gray-700 rounded">
                      <Search className="w-3 h-3" />
                    </button>
                    <button className="p-1 text-gray-500 hover:text-gray-700 rounded">
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <div className="space-y-0.5">
                  {layers.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <Layers className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No layers yet</p>
                      <p className="text-xs text-gray-400 mt-1">Create elements on the canvas to see them here</p>
                    </div>
                  ) : (
                    layers.map((layer) => (
                      <LayerItem
                        key={layer.id}
                        name={layer.name}
                        type={layer.type}
                        isVisible={layer.isVisible}
                        isLocked={layer.isLocked}
                        isSelected={selectedLayer === layer.id || selectedElement === layer.id}
                        level={layer.level}
                        onToggleVisibility={() => toggleLayerVisibility(layer.id)}
                        onToggleLock={() => toggleLayerLock(layer.id)}
                        onSelect={() => {
                           setSelectedLayer(layer.id);
                           setSelectedElement(layer.id);
                           setCanvasElements(prev => prev.map(el => ({
                             ...el,
                             selected: el.id === layer.id
                           })));
                         }}
                      />
                    ))
                  )}
                </div>
              </div>
            )}

            {activeLeftTab === 'assets' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-gray-900">Assets</h4>
                  <button className="p-1 text-gray-500 hover:text-gray-700 rounded">
                    <Upload className="w-3 h-3" />
                  </button>
                </div>
                
                <div className="text-center py-8 text-gray-500">
                  <Upload className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No assets yet</p>
                  <p className="text-xs text-gray-400 mt-1">Upload images, icons, and other assets to use in your designs</p>
                  <button className="mt-3 px-3 py-1.5 bg-blue-500 text-white text-xs rounded-md hover:bg-blue-600 transition-colors">
                    Upload Assets
                  </button>
                </div>
              </div>
            )}

            {activeLeftTab === 'components' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-gray-900">Components</h4>
                  <button className="p-1 text-gray-500 hover:text-gray-700 rounded">
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
                
                <div className="text-center py-8 text-gray-500">
                  <Component className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No components yet</p>
                  <p className="text-xs text-gray-400 mt-1">Create reusable components from your designs</p>
                  <button className="mt-3 px-3 py-1.5 bg-purple-500 text-white text-xs rounded-md hover:bg-purple-600 transition-colors">
                    Create Component
                  </button>
                </div>
              </div>
            )}
          </div>
        </SidePanel>
        
        {/* Canvas - Infinite Canvas with optional grid */}
        <div className="flex-1 bg-gray-50 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div 
              ref={canvasRef}
              className={`relative ${isPanning ? 'cursor-grabbing' : isSpacePressed ? 'cursor-grab' : 'cursor-crosshair'}`}
              style={{
                width: '400%',
                height: '400%',
                minWidth: '4000px',
                minHeight: '4000px',
                backgroundImage: showGrid ? 'radial-gradient(circle, #d1d5db 1px, transparent 1px)' : 'none',
                backgroundSize: showGrid ? '20px 20px' : 'auto',
                transform: `translate(${canvasOffset.x}px, ${canvasOffset.y}px)`
              }}
              onMouseDown={handleCanvasMouseDown}
              onMouseMove={handleCanvasMouseMove}
              onMouseUp={handleCanvasMouseUp}
              onClick={handleCanvasClick}
              onContextMenu={(e) => handleContextMenu(e)}
            >
              {/* Grid Overlay */}
              {showGrid && (
                <div className="absolute inset-0 pointer-events-none opacity-30">
                  <svg width="100%" height="100%" className="absolute inset-0">
                    <defs>
                      <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#9CA3AF" strokeWidth="0.5"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>
                </div>
              )}
              
              {/* Canvas Elements */}
              {canvasElements.filter(element => element.isVisible !== false).map((element) => (
                <div
                  key={element.id}
                  className={`absolute border-2 cursor-pointer transition-all group ${
                    element.selected || multiSelection.includes(element.id)
                      ? 'border-blue-500 shadow-lg' 
                      : 'border-transparent hover:border-gray-300'
                  }`}
                  style={{
                    left: `${element.x}px`,
                    top: `${element.y}px`,
                    width: `${element.width}px`,
                    height: `${element.height}px`,
                    backgroundColor: element.type === 'rectangle' ? element.backgroundColor || '#DBEAFE' : 
                                   element.type === 'circle' ? element.backgroundColor || '#F3E8FF' :
                                   element.type === 'frame' ? element.backgroundColor || '#FFFFFF' :
                                   element.type === 'text' ? 'transparent' :
                                   element.type === 'component' ? '#F5F3FF' :
                                   element.type === 'comment' ? '#FEF3C7' :
                                   '#F3F4F6',
                    borderRadius: element.type === 'circle' ? '50%' : 
                                 element.type === 'frame' ? element.borderRadius || '8px' :
                                 element.type === 'component' ? '8px' :
                                 element.type === 'comment' ? '8px' :
                                 '4px',
                    fontSize: element.type === 'text' ? element.fontSize || '16px' : undefined,
                    fontWeight: element.type === 'text' ? element.fontWeight || 'normal' : undefined,
                    color: element.type === 'text' ? element.color || '#000000' : undefined,
                    fontFamily: element.type === 'text' ? element.fontFamily || 'Inter' : undefined,
                    display: element.type === 'text' ? 'flex' : 'block',
                    alignItems: element.type === 'text' ? 'center' : undefined,
                    justifyContent: element.type === 'text' ? 'center' : undefined,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleElementSelect(element.id, e.shiftKey);
                  }}
                  onContextMenu={(e) => {
                    e.stopPropagation();
                    handleContextMenu(e, element.id);
                  }}
                >
                  {element.type === 'text' && (
                    <div className="w-full h-full flex items-center justify-center text-gray-900 font-medium">
                      {element.content}
                    </div>
                  )}
                  {element.type === 'frame' && (
                    <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm border border-gray-200 rounded-lg">
                      {element.device || 'Frame'}
                    </div>
                  )}
                  {element.type === 'line' && (
                    <svg width="100%" height="100%" className="pointer-events-none">
                      <line
                        x1="0"
                        y1="50%"
                        x2="100%"
                        y2="50%"
                        stroke={element.color || '#374151'}
                        strokeWidth={element.strokeWidth || '2'}
                      />
                    </svg>
                  )}
                  {element.type === 'polygon' && (
                    <svg width="100%" height="100%" className="pointer-events-none">
                      <polygon
                        points="50,10 90,90 10,90"
                        fill={element.backgroundColor || '#F3F4F6'}
                        stroke={element.color || '#9CA3AF'}
                        strokeWidth={element.strokeWidth || '2'}
                      />
                    </svg>
                  )}
                  {element.type === 'component' && (
                    <div className="w-full h-full bg-purple-100 border-2 border-purple-300 rounded-lg flex items-center justify-center text-purple-600 font-medium">
                      <Component className="w-4 h-4 mr-2" />
                      Component
                    </div>
                  )}
                  {element.type === 'comment' && (
                    <div className="w-full h-full bg-yellow-100 border-2 border-yellow-300 rounded-lg flex items-center justify-center text-yellow-700 font-medium relative">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Comment
                      <div className="absolute -bottom-2 left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-yellow-300"></div>
                    </div>
                  )}
                  
                  {/* Selection Handles */}
                  {(element.selected || multiSelection.includes(element.id)) && (
                    <>
                      {/* Corner handles */}
                      <div className="absolute -top-1 -left-1 w-3 h-3 bg-blue-500 border-2 border-white rounded-sm cursor-nw-resize shadow-sm" />
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 border-2 border-white rounded-sm cursor-ne-resize shadow-sm" />
                      <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-blue-500 border-2 border-white rounded-sm cursor-sw-resize shadow-sm" />
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-500 border-2 border-white rounded-sm cursor-se-resize shadow-sm" />
                      
                      {/* Edge handles */}
                      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-blue-500 border-2 border-white rounded-sm cursor-n-resize shadow-sm" />
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-blue-500 border-2 border-white rounded-sm cursor-s-resize shadow-sm" />
                      <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-blue-500 border-2 border-white rounded-sm cursor-w-resize shadow-sm" />
                      <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-blue-500 border-2 border-white rounded-sm cursor-e-resize shadow-sm" />
                      
                      {/* Element label */}
                      <div className="absolute -top-8 left-0 bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium shadow-sm">
                        {element.type.charAt(0).toUpperCase() + element.type.slice(1)}
                        {element.width && element.height && (
                          <span className="ml-1 opacity-75">
                            {Math.round(element.width)} × {Math.round(element.height)}
                          </span>
                        )}
                      </div>
                    </>
                  )}
                </div>
              ))}
              {/* Canvas Content */}
              <div className="absolute" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                <div 
                  className="bg-white shadow-xl rounded-lg border border-gray-200 relative cursor-pointer transition-all hover:shadow-2xl"
                  style={{
                    width: `${375 * (zoomLevel / 100)}px`,
                    height: `${812 * (zoomLevel / 100)}px`
                  }}
                  onClick={(e) => {
                     e.stopPropagation();
                     handleElementSelect('frame-1', e.shiftKey);
                   }}
                   onContextMenu={(e) => {
                     e.stopPropagation();
                     handleContextMenu(e, 'frame-1');
                   }}
                >
                {/* Phone Frame */}
                <div className="absolute inset-0 rounded-lg overflow-hidden">
                  {/* Status Bar */}
                  <div className="h-12 bg-black flex items-center justify-between px-6 text-white text-sm">
                    <span>9:41</span>
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-2 bg-white rounded-sm" />
                      <div className="w-6 h-3 border border-white rounded-sm" />
                    </div>
                  </div>
                  
                  {/* App Content */}
                  <div className="flex-1 bg-gradient-to-br from-blue-50 to-purple-50 p-6">
                    <div className="space-y-6">
                      <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">UIForge</h1>
                        <p className="text-gray-600">Design System</p>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="bg-white rounded-xl p-4 shadow-sm">
                          <div className="w-full h-32 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg mb-3" />
                          <h3 className="font-semibold text-gray-900">Component Card</h3>
                          <p className="text-sm text-gray-600">Interactive design element</p>
                        </div>
                        
                        <div className="bg-white rounded-xl p-4 shadow-sm">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-blue-500 rounded-full" />
                            <div>
                              <h4 className="font-medium text-gray-900">User Profile</h4>
                              <p className="text-xs text-gray-500">Designer</p>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="h-2 bg-gray-200 rounded-full">
                              <div className="h-2 bg-blue-500 rounded-full w-3/4" />
                            </div>
                            <div className="h-2 bg-gray-200 rounded-full">
                              <div className="h-2 bg-purple-500 rounded-full w-1/2" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Selection Indicator */}
                {selectedElement === 'frame-1' && (
                  <div className="absolute inset-0 border-2 border-blue-500 rounded-lg pointer-events-none">
                    <div className="absolute -top-6 left-0 bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium">
                      iPhone 14 Pro
                    </div>
                  </div>
                )}
                </div>
              </div>
              
              {/* Context Menu */}
              {contextMenu && (
                <div
                  className="fixed bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50 min-w-[150px]"
                  style={{
                    left: `${contextMenu.x}px`,
                    top: `${contextMenu.y}px`
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                    onClick={() => {
                      // Copy functionality
                      setContextMenu(null);
                    }}
                  >
                    <Copy className="w-4 h-4" />
                    Copy
                  </button>
                  <button
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                    onClick={() => {
                      // Duplicate functionality
                      setContextMenu(null);
                    }}
                  >
                    <Copy className="w-4 h-4" />
                    Duplicate
                  </button>
                  <hr className="my-1" />
                  <button
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                    onClick={() => {
                      if (contextMenu.elementId) {
                        setCanvasElements(prev => prev.filter(el => el.id !== contextMenu.elementId));
                        if (selectedElement === contextMenu.elementId) {
                          setSelectedElement(null);
                        }
                        setMultiSelection(prev => prev.filter(id => id !== contextMenu.elementId));
                      }
                      setContextMenu(null);
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Right Panel with AI/Design/Prototype tabs */}
        <SidePanel
          isCollapsed={rightPanelCollapsed}
          onToggle={() => setRightPanelCollapsed(!rightPanelCollapsed)}
          side="right"
          title={activeRightTab === 'ai' ? 'AI' : activeRightTab === 'design' ? 'Design' : 'Prototype'}
        >
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200 bg-gray-50">
            {[
              { id: 'ai' as const, label: 'AI', icon: Bot },
              { id: 'design' as const, label: 'Design', icon: Wand2 },
              { id: 'prototype' as const, label: 'Prototype', icon: Code }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveRightTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 px-3 py-3 text-xs font-medium transition-colors ${
                    activeRightTab === tab.id
                      ? 'bg-white text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="p-4">
            {activeRightTab === 'ai' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-semibold text-gray-900">AI Assistant</h4>
                  <div className="flex items-center gap-1">
                    <button className="p-1 text-gray-500 hover:text-gray-700 rounded">
                      <Sparkles className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="flex items-start gap-3">
                      <div className="p-1.5 bg-blue-100 rounded-full">
                        <Bot className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-700 mb-2">I can help you design this screen. What would you like to create?</p>
                        <div className="flex flex-wrap gap-2">
                          <button className="px-2 py-1 bg-white border border-gray-200 rounded text-xs text-gray-700 hover:bg-gray-50 transition-colors">
                            Create login form
                          </button>
                          <button className="px-2 py-1 bg-white border border-gray-200 rounded text-xs text-gray-700 hover:bg-gray-50 transition-colors">
                            Add navigation menu
                          </button>
                          <button className="px-2 py-1 bg-white border border-gray-200 rounded text-xs text-gray-700 hover:bg-gray-50 transition-colors">
                            Generate color palette
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Ask AI for design help..."
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 bg-blue-500 rounded-full text-white">
                      <Zap className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeRightTab === 'design' && (
              <div className="space-y-6">
                {/* Element Properties */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Properties</h4>
                  <div className="space-y-4">
                    {/* Position & Size */}
                    <div>
                      <h5 className="text-xs font-medium text-gray-700 mb-2">Position & Size</h5>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">X</label>
                          <input 
                            type="number" 
                            className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                            defaultValue="0"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Y</label>
                          <input 
                            type="number" 
                            className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                            defaultValue="0"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">W</label>
                          <input 
                            type="number" 
                            className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                            defaultValue="375"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">H</label>
                          <input 
                            type="number" 
                            className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                            defaultValue="812"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Appearance */}
                    <div>
                      <h5 className="text-xs font-medium text-gray-700 mb-2">Appearance</h5>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Fill</label>
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-gradient-to-br from-blue-50 to-purple-50 border border-gray-300 rounded" />
                            <input 
                              type="text" 
                              className="flex-1 px-2 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                              defaultValue="Linear Gradient"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Border</label>
                          <div className="flex items-center gap-2">
                            <input 
                              type="number" 
                              className="w-16 px-2 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                              defaultValue="1"
                            />
                            <div className="w-6 h-6 bg-gray-200 border border-gray-300 rounded" />
                            <input 
                              type="text" 
                              className="flex-1 px-2 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                              defaultValue="#E5E7EB"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Corner Radius</label>
                          <input 
                            type="number" 
                            className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                            defaultValue="8"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Effects */}
                    <div>
                      <h5 className="text-xs font-medium text-gray-700 mb-2">Effects</h5>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-600">Drop Shadow</span>
                          <button className="w-4 h-4 border border-gray-300 rounded-sm flex items-center justify-center">
                            <div className="w-2 h-2 bg-blue-500 rounded-sm" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-600">Inner Shadow</span>
                          <button className="w-4 h-4 border border-gray-300 rounded-sm" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-600">Blur</span>
                          <button className="w-4 h-4 border border-gray-300 rounded-sm" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Design System */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Design System</h4>
                  <div className="space-y-4">
                    <div>
                      <h5 className="text-xs font-medium text-gray-700 mb-2">Colors</h5>
                      <div className="grid grid-cols-6 gap-2">
                        {[
                          '#3B82F6', '#8B5CF6', '#EF4444', '#10B981', '#F59E0B', '#6B7280',
                          '#1E40AF', '#7C3AED', '#DC2626', '#059669', '#D97706', '#4B5563'
                        ].map((color) => (
                          <div 
                            key={color}
                            className="w-8 h-8 rounded border border-gray-200 cursor-pointer hover:scale-110 transition-transform"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="text-xs font-medium text-gray-700 mb-2">Typography</h5>
                      <div className="space-y-2">
                        {['Heading 1', 'Heading 2', 'Body', 'Caption'].map((style) => (
                          <div key={style} className="p-2 bg-gray-50 rounded border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                            <span className="text-xs text-gray-900">{style}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeRightTab === 'prototype' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-semibold text-gray-900">Prototype Settings</h4>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h5 className="text-xs font-medium text-gray-700 mb-2">Flow starting point</h5>
                    <div className="p-3 bg-gray-50 rounded border border-gray-200 flex items-center justify-between">
                      <span className="text-xs text-gray-700">None set</span>
                      <button className="text-xs text-blue-600 hover:text-blue-700">Set starting point</button>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="text-xs font-medium text-gray-700 mb-2">Scroll behavior</h5>
                    <div className="flex items-center gap-2">
                      <button className="flex-1 p-2 bg-white border border-gray-300 rounded text-xs text-gray-700 hover:bg-gray-50 transition-colors">
                        Overflow
                      </button>
                      <button className="flex-1 p-2 bg-blue-50 border border-blue-200 rounded text-xs text-blue-700 hover:bg-blue-100 transition-colors">
                        No scrolling
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="text-xs font-medium text-gray-700 mb-2">Show prototyping settings</h5>
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded border border-gray-200">
                      <span className="text-xs text-gray-700">Show connections</span>
                      <div className="relative inline-block w-8 h-4 rounded-full bg-blue-500">
                        <div className="absolute right-0.5 top-0.5 w-3 h-3 rounded-full bg-white shadow-sm"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <button className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
                    <Play className="w-4 h-4" />
                    Preview Prototype
                  </button>
                </div>
              </div>
            )}
          </div>
        </SidePanel>
      </div>
    </div>
  );
}