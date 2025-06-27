
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, RefreshCw, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const RandomPicker = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const { toast } = useToast();

  const pickRandom = () => {
    const items = input.split('\n').filter(item => item.trim().length > 0);
    
    if (items.length === 0) {
      toast({
        title: "Error",
        description: "Please enter some items to pick from",
        variant: "destructive"
      });
      return;
    }

    const randomItem = items[Math.floor(Math.random() * items.length)].trim();
    setResult(randomItem);
    
    toast({
      title: "🎉 Picked!",
      description: `Selected: ${randomItem}`
    });
  };

  const copyResult = async () => {
    if (!result) return;
    
    try {
      await navigator.clipboard.writeText(result);
      toast({
        title: "Copied!",
        description: "Selection copied to clipboard"
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
              <div className="text-4xl mb-2">🎯</div>
              <p className="text-gray-600">
                Enter your options (one per line) and let fate decide!
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Your Options
              </label>
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Pizza&#10;Burgers&#10;Sushi&#10;Tacos&#10;Pasta"
                rows={6}
                className="resize-none"
              />
            </div>
            
            <Button 
              onClick={pickRandom}
              disabled={!input.trim()}
              className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Pick One For Me!
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && (
        <Card className="bg-white/80 backdrop-blur-sm border-l-4 border-l-emerald-500">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  The Winner Is...
                </label>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={pickRandom}
                    className="flex items-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Pick Again
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
              <div className="text-center p-8 bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg border border-emerald-200">
                <div className="text-2xl font-bold text-gray-900 mb-4 animate-pulse">
                  🎉 {result} 🎉
                </div>
                <p className="text-gray-600">
                  Congratulations! This is your pick!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
