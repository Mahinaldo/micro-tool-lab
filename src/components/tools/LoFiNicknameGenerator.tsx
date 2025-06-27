
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Music, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const LoFiNicknameGenerator = () => {
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const { toast } = useToast();

  const adjectives = [
    'Sad', 'Chill', 'Dreamy', 'Mellow', 'Vintage', 'Dusty', 'Faded', 'Soft',
    'Blurred', 'Hazy', 'Sleepy', 'Quiet', 'Lost', 'Broken', 'Lonely', 'Deep',
    'Dark', 'Warm', 'Cold', 'Nostalgic', 'Cloudy', 'Rainy', 'Midnight', 'Dawn'
  ];

  const nouns = [
    'Vibes', 'Beats', 'Waves', 'Dreams', 'Echoes', 'Shadows', 'Memories', 'Thoughts',
    'Bassline', 'Melody', 'Rhythm', 'Soul', 'Heart', 'Mind', 'Ghost', 'Spirit',
    'Moon', 'Stars', 'Rain', 'Coffee', 'Vinyl', 'Tape', 'Radio', 'Static',
    'Noise', 'Silence', 'Void', 'Space', 'Time', 'Flow', 'Stream', 'Current'
  ];

  const generateNickname = () => {
    if (!name.trim()) {
      toast({
        title: "Error",
        description: "Enter your name first!",
        variant: "destructive"
      });
      return;
    }

    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    const includeNumber = Math.random() > 0.6;
    const randomNumber = Math.floor(Math.random() * 100);
    
    // Different formats
    const formats = [
      `${randomAdjective}_${randomNoun}`,
      `${randomAdjective}${randomNoun}${includeNumber ? randomNumber : ''}`,
      `${name.toLowerCase()}.${randomNoun.toLowerCase()}`,
      `${randomAdjective}${name}${includeNumber ? randomNumber : ''}`,
      `${randomNoun}_${name.toLowerCase()}`,
    ];

    const selectedFormat = formats[Math.floor(Math.random() * formats.length)];
    setNickname(selectedFormat);
    
    toast({
      title: "Your lo-fi alter ego is born! 🎵",
      description: selectedFormat
    });
  };

  const copyNickname = async () => {
    if (!nickname) return;
    
    try {
      await navigator.clipboard.writeText(nickname);
      toast({
        title: "Copied!",
        description: "Nickname copied to clipboard"
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
              <div className="text-4xl mb-2">🎧</div>
              <h3 className="text-xl font-semibold text-gray-900">Lo-Fi Nickname Generator</h3>
              <p className="text-gray-600">
                Transform your boring name into a chill lo-fi persona
              </p>
            </div>

            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your real name..."
              onKeyPress={(e) => e.key === 'Enter' && generateNickname()}
            />
            
            <Button 
              onClick={generateNickname}
              disabled={!name.trim()}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
            >
              <Music className="w-4 h-4 mr-2" />
              Generate Lo-Fi Name
            </Button>
          </div>
        </CardContent>
      </Card>

      {nickname && (
        <Card className="bg-white/80 backdrop-blur-sm border-l-4 border-l-indigo-500">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Your Lo-Fi Persona
                </label>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={generateNickname}
                    className="flex items-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Regenerate
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyNickname}
                    className="flex items-center gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    Copy
                  </Button>
                </div>
              </div>
              <div className="text-center p-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-200">
                <div className="text-2xl font-mono font-bold text-gray-900 mb-4">
                  {nickname}
                </div>
                <p className="text-gray-600">
                  Now streaming: late night coding sessions 🌙
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
