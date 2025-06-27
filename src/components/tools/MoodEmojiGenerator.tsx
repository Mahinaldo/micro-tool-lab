
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, RefreshCw, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const moodEmojis: { [key: string]: string[] } = {
  happy: ['😊', '😄', '😁', '🙂', '😃', '🤗'],
  sad: ['😢', '😭', '😔', '☹️', '😞', '💔'],
  angry: ['😠', '😡', '🤬', '👿', '💢', '🔥'],
  tired: ['😴', '😪', '🥱', '😩', '😫', '💤'],
  excited: ['🤩', '🎉', '🥳', '⭐', '✨', '🚀'],
  love: ['❤️', '💕', '💖', '😍', '🥰', '💝'],
  confused: ['😕', '🤔', '😵', '🫤', '😐', '❓'],
  surprised: ['😲', '😯', '🤯', '😱', '🙀', '‼️'],
  cool: ['😎', '🆒', '👌', '🔥', '💯', '✌️'],
  nervous: ['😰', '😅', '🫣', '😬', '🤐', '😓'],
  sick: ['🤒', '🤧', '🤮', '😷', '🩹', '💊'],
  party: ['🎉', '🥳', '🎊', '🍾', '🎈', '🎁'],
  work: ['💼', '💻', '📊', '📈', '⚡', '🎯'],
  food: ['🍕', '🍔', '🍰', '🍩', '😋', '🤤'],
  sleep: ['😴', '🛏️', '💤', '🌙', '😪', '🥱']
};

export const MoodEmojiGenerator = () => {
  const [mood, setMood] = useState('');
  const [emoji, setEmoji] = useState('');
  const { toast } = useToast();

  const generateEmoji = () => {
    if (!mood.trim()) {
      toast({
        title: "Error",
        description: "Please enter your mood first!",
        variant: "destructive"
      });
      return;
    }

    const moodKey = mood.toLowerCase().trim();
    let emojiOptions = moodEmojis[moodKey];
    
    if (!emojiOptions) {
      // Find partial matches
      const partialMatch = Object.keys(moodEmojis).find(key => 
        key.includes(moodKey) || moodKey.includes(key)
      );
      
      if (partialMatch) {
        emojiOptions = moodEmojis[partialMatch];
      } else {
        // Default random emoji
        const allEmojis = Object.values(moodEmojis).flat();
        emojiOptions = [allEmojis[Math.floor(Math.random() * allEmojis.length)]];
      }
    }
    
    const selectedEmoji = emojiOptions[Math.floor(Math.random() * emojiOptions.length)];
    setEmoji(selectedEmoji);
    
    toast({
      title: "✨ Emoji found!",
      description: `Your mood emoji is ${selectedEmoji}`
    });
  };

  const copyEmoji = async () => {
    if (!emoji) return;
    
    try {
      await navigator.clipboard.writeText(emoji);
      toast({
        title: "Copied!",
        description: "Emoji copied to clipboard"
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
              <div className="text-4xl mb-2">😀</div>
              <h3 className="text-xl font-semibold text-gray-900">
                Mood Emoji Generator
              </h3>
              <p className="text-gray-600">
                Tell me how you're feeling and I'll find the perfect emoji!
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Your Current Mood
              </label>
              <Input
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                placeholder="happy, tired, excited, confused..."
                className="text-center"
              />
            </div>
            
            <Button 
              onClick={generateEmoji}
              disabled={!mood.trim()}
              className="w-full bg-gradient-to-r from-orange-500 to-yellow-600 hover:from-orange-600 hover:to-yellow-700"
            >
              <Heart className="w-4 h-4 mr-2" />
              Find My Emoji!
            </Button>
          </div>
        </CardContent>
      </Card>

      {emoji && (
        <Card className="bg-white/80 backdrop-blur-sm border-l-4 border-l-orange-500">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Your Mood Emoji
                </label>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={generateEmoji}
                    className="flex items-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    New Emoji
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyEmoji}
                    className="flex items-center gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    Copy
                  </Button>
                </div>
              </div>
              <div className="text-center p-8 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border border-orange-200">
                <div className="text-8xl mb-4">
                  {emoji}
                </div>
                <p className="text-lg text-gray-800">
                  Perfect for "{mood}"!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
