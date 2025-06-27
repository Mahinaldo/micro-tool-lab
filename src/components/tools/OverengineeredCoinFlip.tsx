
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, RefreshCw, Coins, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const OverengineeredCoinFlip = () => {
  const [result, setResult] = useState<string | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [quantumState, setQuantumState] = useState('');
  const { toast } = useToast();

  const flipCoin = () => {
    setIsFlipping(true);
    setResult(null);
    setQuantumState('Initializing quantum flux capacitor...');
    
    setTimeout(() => {
      setQuantumState('Analyzing subatomic coin particles...');
    }, 500);
    
    setTimeout(() => {
      setQuantumState('Consulting the universe\'s random number generator...');
    }, 1000);
    
    setTimeout(() => {
      setQuantumState('Applying gravity simulation...');
    }, 1500);
    
    setTimeout(() => {
      setQuantumState('Finalizing probability matrix...');
    }, 2000);
    
    setTimeout(() => {
      const coinResult = Math.random() < 0.5 ? 'HEADS' : 'TAILS';
      setResult(coinResult);
      setIsFlipping(false);
      setQuantumState('');
      
      toast({
        title: `🪙 ${coinResult}!`,
        description: "The quantum algorithms have spoken!"
      });
    }, 2500);
  };

  const copyResult = async () => {
    if (!result) return;
    
    try {
      await navigator.clipboard.writeText(result);
      toast({
        title: "Copied!",
        description: "Coin flip result copied to clipboard"
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
              <div className="text-4xl mb-2">🪙</div>
              <h3 className="text-xl font-semibold text-gray-900">Overengineered Coin Flip</h3>
              <p className="text-gray-600">
                Because a simple coin flip is too mainstream. We use quantum algorithms.
              </p>
            </div>

            <Button 
              onClick={flipCoin}
              disabled={isFlipping}
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700"
            >
              {isFlipping ? (
                <>
                  <Zap className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Coins className="w-4 h-4 mr-2" />
                  Activate Quantum Coin Flip
                </>
              )}
            </Button>

            {quantumState && (
              <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800 animate-pulse">
                  {quantumState}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {result && (
        <Card className="bg-white/80 backdrop-blur-sm border-l-4 border-l-yellow-500">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Quantum Result
                </label>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={flipCoin}
                    className="flex items-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Flip Again
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
              <div className="text-center p-8 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                <div className="text-6xl font-bold text-gray-900 mb-4 animate-bounce">
                  {result}
                </div>
                <p className="text-gray-600 text-sm">
                  ⚛️ Calculated using advanced quantum probability matrices ⚛️
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
