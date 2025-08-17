import React from 'react';
import { 
  // Outline icons (24x24, 1.5px stroke)
  HomeIcon,
  UserIcon,
  CogIcon,
  BellIcon,
  // Solid icons (24x24, filled)
  HomeIcon as HomeIconSolid,
  UserIcon as UserIconSolid,
  CogIcon as CogIconSolid,
  BellIcon as BellIconSolid,
  // Mini icons (20x20, 1.5px stroke)
  HomeIcon as HomeIconMini,
  UserIcon as UserIconMini,
  CogIcon as CogIconMini,
  BellIcon as BellIconMini,
} from '@heroicons/react/24/outline';
import { 
  HomeIcon as HomeIconSolid24,
  UserIcon as UserIconSolid24,
  CogIcon as CogIconSolid24,
  BellIcon as BellIconSolid24,
} from '@heroicons/react/24/solid';
import { 
  HomeIcon as HomeIconMini20,
  UserIcon as UserIconMini20,
  CogIcon as CogIconMini20,
  BellIcon as BellIconMini20,
} from '@heroicons/react/20/solid';

const IconExamples: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h2 className="text-2xl font-bold text-center mb-8">Heroicons Examples</h2>
      
      {/* Outline Icons (24x24) */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Outline Icons (24x24)</h3>
        <div className="flex gap-4 flex-wrap">
          <div className="flex flex-col items-center gap-2 p-4 border rounded-lg">
            <HomeIcon className="h-6 w-6 text-blue-600" />
            <span className="text-sm text-muted-foreground">HomeIcon</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-4 border rounded-lg">
            <UserIcon className="h-6 w-6 text-green-600" />
            <span className="text-sm text-muted-foreground">UserIcon</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-4 border rounded-lg">
            <CogIcon className="h-6 w-6 text-purple-600" />
            <span className="text-sm text-muted-foreground">CogIcon</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-4 border rounded-lg">
            <BellIcon className="h-6 w-6 text-orange-600" />
            <span className="text-sm text-muted-foreground">BellIcon</span>
          </div>
        </div>
      </div>

      {/* Solid Icons (24x24) */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Solid Icons (24x24)</h3>
        <div className="flex gap-4 flex-wrap">
          <div className="flex flex-col items-center gap-2 p-4 border rounded-lg">
            <HomeIconSolid24 className="h-6 w-6 text-blue-600" />
            <span className="text-sm text-muted-foreground">HomeIcon (Solid)</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-4 border rounded-lg">
            <UserIconSolid24 className="h-6 w-6 text-green-600" />
            <span className="text-sm text-muted-foreground">UserIcon (Solid)</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-4 border rounded-lg">
            <CogIconSolid24 className="h-6 w-6 text-purple-600" />
            <span className="text-sm text-muted-foreground">CogIcon (Solid)</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-4 border rounded-lg">
            <BellIconSolid24 className="h-6 w-6 text-orange-600" />
            <span className="text-sm text-muted-foreground">BellIcon (Solid)</span>
          </div>
        </div>
      </div>

      {/* Mini Icons (20x20) */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Mini Icons (20x20)</h3>
        <div className="flex gap-4 flex-wrap">
          <div className="flex flex-col items-center gap-2 p-4 border rounded-lg">
            <HomeIconMini20 className="h-5 w-5 text-blue-600" />
            <span className="text-sm text-muted-foreground">HomeIcon (Mini)</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-4 border rounded-lg">
            <UserIconMini20 className="h-5 w-5 text-green-600" />
            <span className="text-sm text-muted-foreground">UserIcon (Mini)</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-4 border rounded-lg">
            <CogIconMini20 className="h-5 w-5 text-purple-600" />
            <span className="text-sm text-muted-foreground">CogIcon (Mini)</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-4 border rounded-lg">
            <BellIconMini20 className="h-5 w-5 text-orange-600" />
            <span className="text-sm text-muted-foreground">BellIcon (Mini)</span>
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
              <HomeIcon className="h-4 w-4 text-blue-600" />
              <span>Navigate to home</span>
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium mb-2">Button Icon</h4>
            <button className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
              <UserIcon className="h-4 w-4" />
              Profile
            </button>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium mb-2">Notification Badge</h4>
            <div className="relative inline-block">
              <BellIcon className="h-6 w-6 text-gray-600" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium mb-2">Loading State</h4>
            <div className="flex items-center gap-2">
              <CogIcon className="h-4 w-4 text-gray-600 animate-spin" />
              <span className="text-sm text-gray-600">Processing...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IconExamples;
