import { useState } from 'react';
import { Button } from '../../components/ui/button';
import { HelpCircle, X } from 'lucide-react';

export default function ControlsHelp() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="sm"
        variant="outline"
        className="absolute top-6 left-1/2 z-10 -translate-x-1/2 gap-2"
      >
        <HelpCircle className="h-4 w-4" />
        CONTROLS
      </Button>

      {isOpen && (
        <div className="absolute top-20 left-1/2 z-10 w-80 -translate-x-1/2 rounded-lg bg-black/80 p-6 backdrop-blur-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-bold text-white">Controls</h3>
            <Button onClick={() => setIsOpen(false)} size="sm" variant="ghost">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-2 text-sm text-gray-300">
            <div className="flex justify-between">
              <span>Steer:</span>
              <span className="font-mono">← → or A D</span>
            </div>
            <div className="flex justify-between">
              <span>Brake:</span>
              <span className="font-mono">↓ or S</span>
            </div>
            <div className="flex justify-between">
              <span>Boost:</span>
              <span className="font-mono">SPACE</span>
            </div>
            <div className="flex justify-between">
              <span>Pause:</span>
              <span className="font-mono">ESC</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
