
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const VibeChecker = () => {
  const [input, setInput] = useState('');
  const [vibeResult, setVibeResult] = useState<{ score: number; emoji: string; description: string } | null>(null);
  const { toast } = useToast();

  const vibeEmojis = ['😴', '😕', '😐', '😊', '😄', '🔥', '✨', '💯', '🚀', '⚡'];
  const vibeDescriptions = [
    'Dead inside', 'Meh energy', 'Neutral vibes', 'Good vibes', 'Great energy', 
    'Fire vibes', 'Sparkling energy', 'Peak vibes', 'Rocket fuel', 'Electric!'
  ];

  const checkVibe = () => {
    if (!input.trim()) {
      toast({
        title: "Error",
        description: "Enter something to check the vibe!",
        variant: "destructive"
      });
      return;
    }

    // Calculate vibe based on text characteristics
    const length = input.length;
    const exclamations = (input.match(/!/g) || []).length;
    const caps = (input.match(/[A-Z]/g) || []).length;
    const positiveWords = ['good', 'great', 'amazing', 'awesome', 'love', 'yes', 'happy'].filter(word => 
      input.toLowerCase().includes(word)
    ).length;

    let score = Math.min(99, Math.max(1, 
      (length * 0.5) + 
      (exclamations * 15) + 
      (caps * 2) + 
      (positiveWords * 20) + 
      Math.floor(Math.random() * 30)
    ));

    const emojiIndex = Math.floor((score / 10));
    const emoji = vibeEmojis[Math.min(emojiIndex, vibeEmojis.length - 1)];
    const description = vibeDescriptions[Math.min(emojiIndex, vibeDescriptions.length - 1)];

    setVibeResult({ score, emoji, description });
    
    toast({
      title: `Vibe Level: ${score}% ${emoji}`,
      description: description
    });
  };

  const copyResult = async () => {
    if (!vibeResult) return;
    
    try {
      await navigator.clipboard.writeText(`Vibe Level: ${vibeResult.score}% ${vibeResult.emoji} - ${vibeResult.description}`);
      toast({
        title: "Copied!",
        description: "Vibe result copied to clipboard"
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
              <div className="text-4xl mb-2">⚡</div>
              <h3 className="text-xl font-semibold text-gray-900">Vibe Checker</h3>
              <p className="text-gray-600">
                Type anything and I'll rate your vibe energy!
              </p>
            </div>

            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Let's code this weekend!"
              onKeyPress={(e) => e.key === 'Enter' && checkVibe()}
            />
            
            <Button 
              onClick={checkVibe}
              disabled={!input.trim()}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
            >
              <Zap className="w-4 h-4 mr-2" />
              Check My Vibe
            </Button>
          </div>
        </CardContent>
      </Card>

      {vibeResult && (
        <Card className="bg-white/80 backdrop-blur-sm border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Your Vibe Reading
                </label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyResult}
                  className="flex items-center gap-2"
                >
                  <Copy className="w-4 h-4" />
                  Copy
                </Button>
              </div>
              <div className="text-center p-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                <div className="text-6xl mb-4">{vibeResult.emoji}</div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {vibeResult.score}%
                </div>
                <p className="text-lg text-gray-700 font-medium">
                  {vibeResult.description}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
