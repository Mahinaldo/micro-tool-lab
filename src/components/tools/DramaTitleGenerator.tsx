
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, RefreshCw, Film } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const dramaPrefixes = [
  "The Chronicles of",
  "Rise of",
  "Fall of the",
  "The Last",
  "Revenge of the",
  "The Secret of",
  "Legend of",
  "The Curse of",
  "Dawn of the",
  "The Dark",
  "Shadows of",
  "The Lost",
  "Empire of",
  "The Sacred",
  "Blood of the"
];

const dramaSuffixes = [
  ": The Beginning",
  ": Resurrection",
  ": Final Chapter",
  ": Reborn",
  ": Unleashed",
  ": The Reckoning",
  ": Origins",
  ": Revolution",
  ": Awakening",
  ": Legacy",
  ": Vengeance",
  ": The Prophecy",
  ": Redemption",
  ": Rising Storm",
  ": Eternal"
];

export const DramaTitleGenerator = () => {
  const [input, setInput] = useState('');
  const [dramaticTitle, setDramaticTitle] = useState('');
  const { toast } = useToast();

  const generateTitle = () => {
    if (!input.trim()) {
      toast({
        title: "Error",
        description: "Please enter a word or name first!",
        variant: "destructive"
      });
      return;
    }

    const prefix = dramaPrefixes[Math.floor(Math.random() * dramaPrefixes.length)];
    const suffix = dramaSuffixes[Math.floor(Math.random() * dramaSuffixes.length)];
    const title = `${prefix} ${input.trim()}${suffix}`;
    
    setDramaticTitle(title);
    
    toast({
      title: "🎬 Dramatic Title Created!",
      description: "Ready for Hollywood!"
    });
  };

  const copyTitle = async () => {
    if (!dramaticTitle) return;
    
    try {
      await navigator.clipboard.writeText(dramaticTitle);
      toast({
        title: "Copied!",
        description: "Dramatic title copied to clipboard"
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
              <div className="text-4xl mb-2">🎭</div>
              <h3 className="text-xl font-semibold text-gray-900">Drama Title Generator</h3>
              <p className="text-gray-600">
                Turn any word into an epic movie title!
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Enter a word or name
              </label>
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="React, Coffee, Monday..."
                className="text-center"
                onKeyPress={(e) => e.key === 'Enter' && generateTitle()}
              />
            </div>
            
            <Button 
              onClick={generateTitle}
              disabled={!input.trim()}
              className="w-full bg-gradient-to-r from-purple-500 to-red-600 hover:from-purple-600 hover:to-red-700"
            >
              <Film className="w-4 h-4 mr-2" />
              Create Drama Title
            </Button>
          </div>
        </CardContent>
      </Card>

      {dramaticTitle && (
        <Card className="bg-white/80 backdrop-blur-sm border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Your Dramatic Title
                </label>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={generateTitle}
                    className="flex items-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    New Title
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyTitle}
                    className="flex items-center gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    Copy
                  </Button>
                </div>
              </div>
              <div className="text-center p-8 bg-gradient-to-r from-purple-50 to-red-50 rounded-lg border border-purple-200">
                <div className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                  {dramaticTitle}
                </div>
                <p className="text-gray-600 italic">
                  🎬 Coming to theaters near you! 🍿
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
