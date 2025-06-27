
import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface EasterEgg {
  trigger: string;
  title: string;
  content: React.ReactNode;
}

const easterEggs: EasterEgg[] = [
  {
    trigger: 'rickroll',
    title: '🎵 Never Gonna Give You Up!',
    content: (
      <div className="text-center space-y-4">
        <div className="text-6xl animate-bounce">🕺</div>
        <p className="text-lg">You've been Rick Rolled!</p>
        <div className="text-sm text-gray-600">
          <p>🎵 Never gonna give you up 🎵</p>
          <p>🎵 Never gonna let you down 🎵</p>
          <p>🎵 Never gonna run around and desert you 🎵</p>
        </div>
      </div>
    )
  },
  {
    trigger: 'konami',
    title: '🎮 Konami Code Activated!',
    content: (
      <div className="text-center space-y-4">
        <div className="text-6xl animate-pulse">🚀</div>
        <p className="text-lg">30 Lives Granted!</p>
        <p className="text-sm text-gray-600">↑↑↓↓←→←→BA</p>
      </div>
    )
  },
  {
    trigger: 'coffee',
    title: '☕ Coffee Break!',
    content: (
      <div className="text-center space-y-4">
        <div className="text-6xl animate-bounce">☕</div>
        <p className="text-lg">Time for a coffee break!</p>
        <p className="text-sm text-gray-600">Productivity is temporary, caffeine is eternal ☕</p>
      </div>
    )
  },
  {
    trigger: 'debug',
    title: '🐛 Debug Mode',
    content: (
      <div className="text-center space-y-4">
        <div className="text-6xl animate-spin">🐛</div>
        <p className="text-lg">It's not a bug, it's a feature!</p>
        <p className="text-sm text-gray-600">console.log("Why is this not working?!")</p>
      </div>
    )
  }
];

export const EasterEggHandler = () => {
  const [activeEgg, setActiveEgg] = useState<EasterEgg | null>(null);
  const [keyBuffer, setKeyBuffer] = useState('');

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const newBuffer = (keyBuffer + e.key).toLowerCase().slice(-20);
      setKeyBuffer(newBuffer);

      // Check for easter eggs
      const triggeredEgg = easterEggs.find(egg => 
        newBuffer.includes(egg.trigger.toLowerCase())
      );

      if (triggeredEgg) {
        setActiveEgg(triggeredEgg);
        setKeyBuffer(''); // Reset buffer
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [keyBuffer]);

  return (
    <Dialog open={!!activeEgg} onOpenChange={() => setActiveEgg(null)}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{activeEgg?.title}</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          {activeEgg?.content}
        </div>
      </DialogContent>
    </Dialog>
  );
};
