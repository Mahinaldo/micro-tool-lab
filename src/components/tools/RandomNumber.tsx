
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, RefreshCw, Dices } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const RandomNumber = () => {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [result, setResult] = useState<number | null>(null);
  const { toast } = useToast();

  const generateNumber = () => {
    if (min >= max) {
      toast({
        title: "Error",
        description: "Minimum value must be less than maximum value",
        variant: "destructive"
      });
      return;
    }

    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    setResult(randomNum);
    toast({
      title: "Number generated!",
      description: `Your random number is ${randomNum}`
    });
  };

  const copyToClipboard = async () => {
    if (result === null) return;
    
    try {
      await navigator.clipboard.writeText(result.toString());
      toast({
        title: "Copied!",
        description: "Number copied to clipboard"
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
              <div className="text-4xl mb-2">🎲</div>
              <p className="text-gray-600">
                Generate random numbers within your specified range
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Minimum
                </label>
                <Input
                  type="number"
                  value={min}
                  onChange={(e) => setMin(parseInt(e.target.value) || 0)}
                  className="text-center"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Maximum
                </label>
                <Input
                  type="number"
                  value={max}
                  onChange={(e) => setMax(parseInt(e.target.value) || 100)}
                  className="text-center"
                />
              </div>
            </div>
            
            <Button 
              onClick={generateNumber}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
            >
              <Dices className="w-4 h-4 mr-2" />
              Generate Random Number
            </Button>
          </div>
        </CardContent>
      </Card>

      {result !== null && (
        <Card className="bg-white/80 backdrop-blur-sm border-l-4 border-l-cyan-500">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Your Random Number
                </label>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={generateNumber}
                    className="flex items-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    New
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyToClipboard}
                    className="flex items-center gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    Copy
                  </Button>
                </div>
              </div>
              <div className="text-center p-8 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg border border-cyan-200">
                <div className="text-6xl font-bold text-gray-900 mb-2">
                  {result}
                </div>
                <p className="text-gray-600">
                  Between {min} and {max}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
