
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, RefreshCw, Palette } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const moodColors = {
  happy: { color: '#FFD700', name: 'Golden Yellow' },
  sad: { color: '#4682B4', name: 'Steel Blue' },
  angry: { color: '#DC143C', name: 'Crimson Red' },
  calm: { color: '#98FB98', name: 'Pale Green' },
  excited: { color: '#FF4500', name: 'Orange Red' },
  peaceful: { color: '#87CEEB', name: 'Sky Blue' },
  energetic: { color: '#FF1493', name: 'Deep Pink' },
  relaxed: { color: '#DDA0DD', name: 'Plum' },
  focused: { color: '#4169E1', name: 'Royal Blue' },
  creative: { color: '#9370DB', name: 'Medium Purple' },
  romantic: { color: '#FF69B4', name: 'Hot Pink' },
  mysterious: { color: '#2F4F4F', name: 'Dark Slate Gray' },
  optimistic: { color: '#FFA500', name: 'Orange' },
  nostalgic: { color: '#D2B48C', name: 'Tan' },
  adventurous: { color: '#228B22', name: 'Forest Green' }
};

export const ColorMoodFinder = () => {
  const [mood, setMood] = useState('');
  const [result, setResult] = useState<{ color: string; name: string } | null>(null);
  const { toast } = useToast();

  const findColor = () => {
    if (!mood.trim()) {
      toast({
        title: "Error",
        description: "Please enter your mood first!",
        variant: "destructive"
      });
      return;
    }

    const moodKey = mood.toLowerCase().trim();
    let colorResult = moodColors[moodKey as keyof typeof moodColors];
    
    if (!colorResult) {
      // If exact match not found, pick a random color
      const colors = Object.values(moodColors);
      colorResult = colors[Math.floor(Math.random() * colors.length)];
    }
    
    setResult(colorResult);
    
    toast({
      title: "🎨 Color found!",
      description: `Your mood is ${colorResult.name}`
    });
  };

  const copyColor = async () => {
    if (!result) return;
    
    try {
      await navigator.clipboard.writeText(result.color);
      toast({
        title: "Copied!",
        description: "Color code copied to clipboard"
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="text-center mb-4">
              <div className="text-4xl mb-2">🎨</div>
              <h3 className="text-xl font-semibold text-gray-900">
                Color Mood Finder
              </h3>
              <p className="text-gray-600">
                Tell me your vibe and I'll find the perfect color to match!
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Your Mood or Vibe
              </label>
              <Input
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                placeholder="happy, calm, energetic, mysterious..."
                className="text-center"
              />
            </div>
            
            <Button 
              onClick={findColor}
              disabled={!mood.trim()}
              className="w-full bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700"
            >
              <Palette className="w-4 h-4 mr-2" />
              Find My Color!
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && (
        <Card className="bg-white/80 backdrop-blur-sm border-l-4 border-l-pink-500">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Your Mood Color
                </label>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={findColor}
                    className="flex items-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    New Color
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyColor}
                    className="flex items-center gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    Copy
                  </Button>
                </div>
              </div>
              <div className="text-center p-8 rounded-lg border" style={{ backgroundColor: result.color + '20' }}>
                <div 
                  className="w-20 h-20 rounded-full mx-auto mb-4 shadow-lg"
                  style={{ backgroundColor: result.color }}
                ></div>
                <div className="text-xl font-bold text-gray-900 mb-2">
                  {result.name}
                </div>
                <div className="text-sm text-gray-600 font-mono">
                  {result.color}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
