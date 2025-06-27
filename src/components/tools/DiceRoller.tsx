
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const DiceRoller = () => {
  const [result, setResult] = useState<number | null>(null);
  const [diceType, setDiceType] = useState(6);
  const [isRolling, setIsRolling] = useState(false);
  const { toast } = useToast();

  const rollDice = () => {
    setIsRolling(true);
    
    // Animate the roll
    setTimeout(() => {
      const rolled = Math.floor(Math.random() * diceType) + 1;
      setResult(rolled);
      setIsRolling(false);
      
      toast({
        title: `🎲 Rolled a ${rolled}!`,
        description: `On a ${diceType}-sided die`
      });
    }, 1000);
  };

  const copyResult = async () => {
    if (result === null) return;
    
    try {
      await navigator.clipboard.writeText(result.toString());
      toast({
        title: "Copied!",
        description: "Dice result copied to clipboard"
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
          <div className="text-center space-y-4">
            <div className="text-4xl mb-4">🎲</div>
            <h3 className="text-xl font-semibold text-gray-900">
              Roll the Dice!
            </h3>
            
            <div className="flex justify-center gap-2 mb-4">
              {[4, 6, 8, 10, 12, 20].map(sides => (
                <Button
                  key={sides}
                  variant={diceType === sides ? "default" : "outline"}
                  size="sm"
                  onClick={() => setDiceType(sides)}
                  className="text-sm"
                >
                  D{sides}
                </Button>
              ))}
            </div>
            
            <Button 
              onClick={rollDice}
              disabled={isRolling}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
            >
              {isRolling ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Rolling...
                </>
              ) : (
                `Roll D${diceType}`
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {result !== null && (
        <Card className="bg-white/80 backdrop-blur-sm border-l-4 border-l-amber-500">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  You Rolled
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
              <div className="text-center p-8 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200">
                <div className="text-6xl font-bold text-gray-900 mb-2 animate-bounce">
                  {result}
                </div>
                <p className="text-gray-600">
                  On a {diceType}-sided die
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
