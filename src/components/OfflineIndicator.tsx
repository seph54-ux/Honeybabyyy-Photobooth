import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-2xl bg-amber-500/95 backdrop-blur-md px-3.5 py-2 text-xs font-fredoka font-semibold text-white shadow-xl animate-in slide-in-from-bottom-2 border border-amber-300">
      <WifiOff size={15} className="animate-pulse" />
      <span>Offline Mode — Cached photobooth assets are ready!</span>
    </div>
  );
};
