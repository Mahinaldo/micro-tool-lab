
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Flame, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const bugRageMap = [
  { keywords: ['missing semicolon', 'semicolon', ';'], rage: 15, emoji: '😐' },
  { keywords: ['undefined is not a function', 'undefined'], rage: 45, emoji: '😤' },
  { keywords: ['cannot read property', 'null', 'undefined'], rage: 55, emoji: '😡' },
  { keywords: ['async await', 'foreach', 'for each'], rage: 85, emoji: '🤬' },
  { keywords: ['merge conflict', 'conflict'], rage: 70, emoji: '😠' },
  { keywords: ['cors', 'cross-origin'], rage: 60, emoji: '😖' },
  { keywords: ['internet explorer', 'ie', 'explorer'], rage: 95, emoji: '💢' },
  { keywords: ['works on my machine'], rage: 80, emoji: '🙄' },
  { keywords: ['npm install', 'node_modules'], rage: 40, emoji: '😓' },
  { keywords: ['git push', 'force'], rage: 90, emoji: '🔥' },
  { keywords: ['production', 'prod', 'live'], rage: 100, emoji: '💀' },
  { keywords: ['css', 'center', 'vertical'], rage: 35, emoji: '😵‍💫' },
  { keywords: ['regex', 'regular expression'], rage: 65, emoji: '🤯' },
  { keywords: ['legacy code', 'legacy'], rage: 75, emoji: '👹' },
  { keywords: ['memory leak', 'leak'], rage: 70, emoji: '🫠' }
];

export const CodeRageMeter = () => {
  const [bugDescription, setBugDescription] = useState('');
  const [rageResult, setRageResult] = useState<{ rage: number; emoji: string; message: string } | null>(null);
  const { toast } = useToast();

  const calculateRage = () => {
    if (!bugDescription.trim()) {
      toast({
        title: "Error",
        description: "Please describe your bug or issue!",
        variant: "destructive"
      });
      return;
    }

    const lowerText = bugDescription.toLowerCase();
    let maxRage = 20; // base rage
    let matchedEmoji = '😐';
    
    for (const bug of bugRageMap) {
      for (const keyword of bug.keywords) {
        if (lowerText.includes(keyword)) {
          if (bug.rage > maxRage) {
            maxRage = bug.rage;
            matchedEmoji = bug.emoji;
          }
        }
      }
    }

    // Add some randomness
    maxRage += Math.floor(Math.random() * 15);
    maxRage = Math.min(100, maxRage);

    let message = "";
    if (maxRage >= 90) message = "🚨 DEVELOPER MELTDOWN IMMINENT! Step away from the keyboard!";
    else if (maxRage >= 70) message = "🔥 High rage levels detected. Coffee and deep breaths recommended.";
    else if (maxRage >= 50) message = "😤 Moderate frustration. Rubber duck debugging advised.";
    else if (maxRage >= 30) message = "😓 Mild annoyance. You've got this!";
    else message = "😌 Pretty chill bug. Easy fix incoming!";

    setRageResult({ rage: maxRage, emoji: matchedEmoji, message });
    
    toast({
      title: `🔥 Rage Level: ${maxRage}%`,
      description: message
    });
  };

  const copyResult = async () => {
    if (!rageResult) return;
    
    try {
      await navigator.clipboard.writeText(`Code Rage Level: ${rageResult.rage}% ${rageResult.emoji} - ${rageResult.message}`);
      toast({
        title: "Copied!",
        description: "Rage level copied to clipboard"
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
              <div className="text-4xl mb-2">💢</div>
              <h3 className="text-xl font-semibold text-gray-900">Code Rage Meter</h3>
              <p className="text-gray-600">
                Describe your bug and see how angry it would make a developer!
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Describe Your Bug or Issue
              </label>
              <Textarea
                value={bugDescription}
                onChange={(e) => setBugDescription(e.target.value)}
                placeholder="Missing semicolon crashed production server..."
                rows={4}
                className="resize-none"
              />
            </div>
            
            <Button 
              onClick={calculateRage}
              disabled={!bugDescription.trim()}
              className="w-full bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700"
            >
              <Flame className="w-4 h-4 mr-2" />
              Measure Developer Rage
            </Button>
          </div>
        </CardContent>
      </Card>

      {rageResult && (
        <Card className="bg-white/80 backdrop-blur-sm border-l-4 border-l-red-500">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Developer Rage Level
                </label>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={calculateRage}
                    className="flex items-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Re-calculate
                  </Button>
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
              </div>
              <div className="text-center p-8 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border border-red-200">
                <div className="text-6xl mb-4">{rageResult.emoji}</div>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {rageResult.rage}%
                </div>
                <p className="text-lg text-gray-800">
                  {rageResult.message}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
