
import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Timer, Brain } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const MultitaskerIQChecker = () => {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [result, setResult] = useState<{ score: number; message: string } | null>(null);
  const [isActive, setIsActive] = useState(false);
  const { toast } = useToast();

  const resetTest = () => {
    setInput1('');
    setInput2('');
    setStartTime(null);
    setResult(null);
    setIsActive(false);
  };

  const startTest = () => {
    setInput1('');
    setInput2('');
    setResult(null);
    setIsActive(true);
    setStartTime(Date.now());
    
    toast({
      title: "Test Started! 🧠",
      description: "Type different words in both inputs simultaneously!"
    });
  };

  const checkMultitasking = () => {
    if (!startTime || !input1.trim() || !input2.trim()) {
      toast({
        title: "Error",
        description: "Please fill both inputs!",
        variant: "destructive"
      });
      return;
    }

    const timeSpent = (Date.now() - startTime) / 1000;
    const totalChars = input1.length + input2.length;
    const speed = totalChars / timeSpent;
    
    // Check if words are different
    const isDifferent = input1.toLowerCase() !== input2.toLowerCase();
    
    let score = Math.min(100, Math.max(10, 
      (speed * 10) + 
      (isDifferent ? 25 : -15) + 
      (totalChars > 10 ? 15 : 0) +
      Math.floor(Math.random() * 20)
    ));

    let message = "";
    if (score >= 85) message = "🚀 Multitasking Genius! Your brain operates on multiple cores!";
    else if (score >= 70) message = "💪 Solid multitasker! You can juggle like a pro!";
    else if (score >= 50) message = "🤔 Decent effort, but maybe stick to one task at a time?";
    else message = "😅 Multitasking isn't your superpower, but that's totally fine!";

    setResult({ score: Math.round(score), message });
    setIsActive(false);
    
    toast({
      title: `Multitasking IQ: ${Math.round(score)}%`,
      description: message
    });
  };

  const copyResult = async () => {
    if (!result) return;
    
    try {
      await navigator.clipboard.writeText(`Multitasking IQ: ${result.score}% - ${result.message}`);
      toast({
        title: "Copied!",
        description: "Result copied to clipboard"
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
              <div className="text-4xl mb-2">🤹</div>
              <h3 className="text-xl font-semibold text-gray-900">Multitasker IQ Checker</h3>
              <p className="text-gray-600">
                Test your ability to type two different things at once!
              </p>
            </div>

            {!isActive && !result && (
              <Button 
                onClick={startTest}
                className="w-full bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700"
              >
                <Brain className="w-4 h-4 mr-2" />
                Start Multitasking Test
              </Button>
            )}

            {isActive && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Input 1
                    </label>
                    <Input
                      value={input1}
                      onChange={(e) => setInput1(e.target.value)}
                      placeholder="Type here..."
                      className="text-center"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Input 2
                    </label>
                    <Input
                      value={input2}
                      onChange={(e) => setInput2(e.target.value)}
                      placeholder="Different word here..."
                      className="text-center"
                    />
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    onClick={checkMultitasking}
                    disabled={!input1.trim() || !input2.trim()}
                    className="flex-1"
                  >
                    <Timer className="w-4 h-4 mr-2" />
                    Check My Multitasking IQ
                  </Button>
                  <Button 
                    onClick={resetTest}
                    variant="outline"
                    className="w-auto"
                  >
                    Reset
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {result && (
        <Card className="bg-white/80 backdrop-blur-sm border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Your Multitasking IQ
                </label>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyResult}
                    className="flex items-center gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    Copy
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resetTest}
                    className="w-auto"
                  >
                    Reset
                  </Button>
                </div>
              </div>
              <div className="text-center p-8 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {result.score}%
                </div>
                <p className="text-lg text-gray-800">
                  {result.message}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
