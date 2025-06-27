
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, RefreshCw, Hash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const numberPersonalities = {
  0: "You are the void. Mysterious, empty, yet full of potential. You contain everything and nothing.",
  1: "You are the leader. Independent, pioneering, and always first. You stand alone but stand tall.",
  2: "You are the peacemaker. Diplomatic, cooperative, and balanced. You bring harmony wherever you go.",
  3: "You are the entertainer. Creative, expressive, and optimistic. You light up every room.",
  4: "You are the builder. Practical, reliable, and organized. You create order from chaos.",
  5: "You are the adventurer. Dynamic, curious, and freedom-loving. You never sit still.",
  6: "You are the nurturer. Caring, responsible, and family-oriented. You heal hearts.",
  7: "You are the mystic. Analytical, introspective, and wise. You seek deeper truths.",
  8: "You are the achiever. Ambitious, powerful, and business-minded. You build empires.",
  9: "You are the humanitarian. Generous, compassionate, and universal. You serve the world."
};

export const NumberPersonalityTest = () => {
  const [number, setNumber] = useState('');
  const [personality, setPersonality] = useState('');
  const { toast } = useToast();

  const analyzeNumber = () => {
    if (!number.trim()) {
      toast({
        title: "Error",
        description: "Please enter a number!",
        variant: "destructive"
      });
      return;
    }

    const num = parseInt(number);
    if (isNaN(num)) {
      toast({
        title: "Error",
        description: "Please enter a valid number!",
        variant: "destructive"
      });
      return;
    }

    // Reduce to single digit (numerology style)
    let reducedNum = Math.abs(num);
    while (reducedNum > 9) {
      reducedNum = reducedNum.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    }

    const result = numberPersonalities[reducedNum as keyof typeof numberPersonalities];
    setPersonality(result);
    
    toast({
      title: `🔢 Number ${reducedNum} Analysis Complete!`,
      description: "Your number's personality revealed"
    });
  };

  const copyPersonality = async () => {
    if (!personality) return;
    
    try {
      await navigator.clipboard.writeText(personality);
      toast({
        title: "Copied!",
        description: "Number personality copied to clipboard"
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
              <div className="text-4xl mb-2">🔢</div>
              <h3 className="text-xl font-semibold text-gray-900">Number Personality Test</h3>
              <p className="text-gray-600">
                Enter any number and discover its secret personality!
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Your Number
              </label>
              <Input
                type="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="42, 777, 12345..."
                className="text-center text-lg"
                onKeyPress={(e) => e.key === 'Enter' && analyzeNumber()}
              />
            </div>
            
            <Button 
              onClick={analyzeNumber}
              disabled={!number.trim()}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
            >
              <Hash className="w-4 h-4 mr-2" />
              Analyze My Number
            </Button>
          </div>
        </CardContent>
      </Card>

      {personality && (
        <Card className="bg-white/80 backdrop-blur-sm border-l-4 border-l-cyan-500">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Your Number's Personality
                </label>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={analyzeNumber}
                    className="flex items-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Re-analyze
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyPersonality}
                    className="flex items-center gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    Copy
                  </Button>
                </div>
              </div>
              <div className="text-center p-8 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg border border-cyan-200">
                <div className="text-6xl mb-4">🔮</div>
                <p className="text-lg text-gray-800 leading-relaxed italic">
                  {personality}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
