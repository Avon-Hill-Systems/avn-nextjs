import React from 'react';
import { 
  Home,
  User,
  Settings,
  Bell,
  Code2,
  Palette,
  Rocket,
  Cpu,
  ArrowRight,
  BookOpen,
  Heart,
  Star,
  Zap,
  Shield,
  Globe,
  Smartphone,
  Monitor,
  Database
} from 'lucide-react';

const IconExamples: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h2 className="text-2xl font-bold text-center mb-8">Lucide Icons Examples</h2>
      
      {/* Basic Icons */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Basic Icons</h3>
        <div className="flex gap-4 flex-wrap">
          <div className="flex flex-col items-center gap-2 p-4 border rounded-lg">
            <Home className="h-6 w-6 text-blue-600" />
            <span className="text-sm text-muted-foreground">Home</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-4 border rounded-lg">
            <User className="h-6 w-6 text-green-600" />
            <span className="text-sm text-muted-foreground">User</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-4 border rounded-lg">
            <Settings className="h-6 w-6 text-purple-600" />
            <span className="text-sm text-muted-foreground">Settings</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-4 border rounded-lg">
            <Bell className="h-6 w-6 text-orange-600" />
            <span className="text-sm text-muted-foreground">Bell</span>
          </div>
        </div>
      </div>

      {/* Technology Icons */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Technology Icons</h3>
        <div className="flex gap-4 flex-wrap">
          <div className="flex flex-col items-center gap-2 p-4 border rounded-lg">
            <Code2 className="h-6 w-6 text-blue-600" />
            <span className="text-sm text-muted-foreground">Code2</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-4 border rounded-lg">
            <Cpu className="h-6 w-6 text-green-600" />
            <span className="text-sm text-muted-foreground">Cpu</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-4 border rounded-lg">
            <Palette className="h-6 w-6 text-purple-600" />
            <span className="text-sm text-muted-foreground">Palette</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-4 border rounded-lg">
            <Rocket className="h-6 w-6 text-orange-600" />
            <span className="text-sm text-muted-foreground">Rocket</span>
          </div>
        </div>
      </div>

      {/* Additional Icons */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">More Icons</h3>
        <div className="flex gap-4 flex-wrap">
          <div className="flex flex-col items-center gap-2 p-4 border rounded-lg">
            <Heart className="h-6 w-6 text-red-600" />
            <span className="text-sm text-muted-foreground">Heart</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-4 border rounded-lg">
            <Star className="h-6 w-6 text-yellow-600" />
            <span className="text-sm text-muted-foreground">Star</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-4 border rounded-lg">
            <Zap className="h-6 w-6 text-blue-600" />
            <span className="text-sm text-muted-foreground">Zap</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-4 border rounded-lg">
            <Shield className="h-6 w-6 text-green-600" />
            <span className="text-sm text-muted-foreground">Shield</span>
          </div>
        </div>
      </div>

      {/* Usage Examples */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Usage Examples</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium mb-2">With Text</h4>
            <div className="flex items-center gap-2 text-sm">
              <Home className="h-4 w-4 text-blue-600" />
              <span>Navigate to home</span>
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium mb-2">Button Icon</h4>
            <button className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
              <User className="h-4 w-4" />
              Profile
            </button>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium mb-2">Notification Badge</h4>
            <div className="relative inline-block">
              <Bell className="h-6 w-6 text-gray-600" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium mb-2">Loading State</h4>
            <div className="flex items-center gap-2">
              <Settings className="h-4 w-4 text-gray-600 animate-spin" />
              <span className="text-sm text-gray-600">Processing...</span>
            </div>
          </div>
        </div>
      </div>

      {/* Icon Sizes */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Icon Sizes</h3>
        <div className="flex gap-4 flex-wrap items-center">
          <div className="flex flex-col items-center gap-2 p-4 border rounded-lg">
            <Home className="h-4 w-4 text-blue-600" />
            <span className="text-sm text-muted-foreground">h-4 w-4</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-4 border rounded-lg">
            <Home className="h-6 w-6 text-blue-600" />
            <span className="text-sm text-muted-foreground">h-6 w-6</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-4 border rounded-lg">
            <Home className="h-8 w-8 text-blue-600" />
            <span className="text-sm text-muted-foreground">h-8 w-8</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-4 border rounded-lg">
            <Home className="h-12 w-12 text-blue-600" />
            <span className="text-sm text-muted-foreground">h-12 w-12</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IconExamples;
