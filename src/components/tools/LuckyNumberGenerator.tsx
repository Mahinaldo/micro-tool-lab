
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, RefreshCw, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const LuckyNumberGenerator = () => {
  const [name, setName] = useState('');
  const [luckyNumber, setLuckyNumber] = useState<number | null>(null);
  const { toast } = useToast();

  const generateLuckyNumber = () => {
    if (!name.trim()) {
      toast({
        title: "Error",
        description: "Please enter your name first!",
        variant: "destructive"
      });
      return;
    }

    // Simple hash function to generate consistent "lucky" number
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      const char = name.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    
    // Convert to positive number between 1-100
    const lucky = Math.abs(hash % 100) + 1;
    setLuckyNumber(lucky);
    
    toast({
      title: "⭐ Lucky number generated!",
      description: `${name}'s lucky number is ${lucky}!`
    });
  };

  const copyNumber = async () => {
    if (luckyNumber === null) return;
    
    try {
      await navigator.clipboard.writeText(luckyNumber.toString());
      toast({
        title: "Copied!",
        description: "Lucky number copied to clipboard"
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
              <div className="text-4xl mb-2">⭐</div>
              <h3 className="text-xl font-semibold text-gray-900">
                Lucky Number Generator
              </h3>
              <p className="text-gray-600">
                Enter your name and discover your personal lucky number!
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Your Name
              </label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name..."
                className="text-center"
              />
            </div>
            
            <Button 
              onClick={generateLuckyNumber}
              disabled={!name.trim()}
              className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700"
            >
              <Star className="w-4 h-4 mr-2" />
              Generate My Lucky Number!
            </Button>
          </div>
        </CardContent>
      </Card>

      {luckyNumber !== null && (
        <Card className="bg-white/80 backdrop-blur-sm border-l-4 border-l-yellow-500">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Your Lucky Number
                </label>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={generateLuckyNumber}
                    className="flex items-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Regenerate
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyNumber}
                    className="flex items-center gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    Copy
                  </Button>
                </div>
              </div>
              <div className="text-center p-8 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg border border-yellow-200">
                <div className="text-6xl font-bold text-gray-900 mb-4 animate-pulse">
                  {luckyNumber}
                </div>
                <p className="text-lg text-gray-800">
                  {name}'s Lucky Number! ✨
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  This number is uniquely yours based on your name!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
