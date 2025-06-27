
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, RefreshCw, Type } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const fontPersonalities = [
  { name: 'Playfair Display', personality: 'Elegant and sophisticated', style: 'serif' },
  { name: 'Roboto', personality: 'Modern and friendly', style: 'sans-serif' },
  { name: 'Dancing Script', personality: 'Creative and expressive', style: 'cursive' },
  { name: 'Courier New', personality: 'Technical and precise', style: 'monospace' },
  { name: 'Comic Sans MS', personality: 'Fun and playful', style: 'cursive' },
  { name: 'Times New Roman', personality: 'Traditional and reliable', style: 'serif' },
  { name: 'Arial', personality: 'Clean and professional', style: 'sans-serif' },
  { name: 'Georgia', personality: 'Warm and readable', style: 'serif' },
  { name: 'Verdana', personality: 'Clear and accessible', style: 'sans-serif' },
  { name: 'Impact', personality: 'Bold and powerful', style: 'sans-serif' }
];

export const FontPersonalityMatcher = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<{ name: string; personality: string; style: string } | null>(null);
  const { toast } = useToast();

  const matchFont = () => {
    if (!input.trim()) {
      toast({
        title: "Error",
        description: "Please enter a word or name first!",
        variant: "destructive"
      });
      return;
    }

    // Simple hash to get consistent results
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      hash = ((hash << 5) - hash) + input.charCodeAt(i);
      hash = hash & hash;
    }
    
    const fontIndex = Math.abs(hash) % fontPersonalities.length;
    const selectedFont = fontPersonalities[fontIndex];
    
    setResult(selectedFont);
    
    toast({
      title: "🎨 Font matched!",
      description: `You are ${selectedFont.name}!`
    });
  };

  const copyFont = async () => {
    if (!result) return;
    
    try {
      await navigator.clipboard.writeText(result.name);
      toast({
        title: "Copied!",
        description: "Font name copied to clipboard"
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
              <div className="text-4xl mb-2">🔤</div>
              <h3 className="text-xl font-semibold text-gray-900">
                Font Personality Matcher
              </h3>
              <p className="text-gray-600">
                Discover which font best represents your personality!
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Enter a word or your name
              </label>
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Zen, Creative, Strong..."
                className="text-center"
              />
            </div>
            
            <Button 
              onClick={matchFont}
              disabled={!input.trim()}
              className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700"
            >
              <Type className="w-4 h-4 mr-2" />
              Find My Font!
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && (
        <Card className="bg-white/80 backdrop-blur-sm border-l-4 border-l-teal-500">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Your Font Personality
                </label>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={matchFont}
                    className="flex items-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    New Match
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyFont}
                    className="flex items-center gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    Copy
                  </Button>
                </div>
              </div>
              <div className="text-center p-8 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg border border-teal-200">
                <div 
                  className="text-3xl font-bold text-gray-900 mb-4"
                  style={{ fontFamily: result.style }}
                >
                  {result.name}
                </div>
                <p className="text-lg text-gray-800 mb-2">
                  You typed "{input}". You are...
                </p>
                <p className="text-gray-600 italic">
                  {result.personality}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
