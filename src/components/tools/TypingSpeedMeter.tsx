
import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, RefreshCw, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const testSentences = [
  "The quick brown fox jumps over the lazy dog.",
  "Pack my box with five dozen liquor jugs.",
  "How razorback-jumping frogs can level six piqued gymnasts!",
  "Sphinx of black quartz, judge my vow.",
  "The five boxing wizards jump quickly."
];

export const TypingSpeedMeter = () => {
  const [targetText, setTargetText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [result, setResult] = useState<{ wpm: number; accuracy: number; message: string } | null>(null);
  const { toast } = useToast();

  const startTest = () => {
    const randomSentence = testSentences[Math.floor(Math.random() * testSentences.length)];
    setTargetText(randomSentence);
    setUserInput('');
    setResult(null);
    setStartTime(null);
  };

  const handleInputChange = (value: string) => {
    if (!startTime && value.length > 0) {
      setStartTime(Date.now());
    }
    
    setUserInput(value);
    
    if (value === targetText) {
      const endTime = Date.now();
      const timeTaken = (endTime - (startTime || endTime)) / 1000 / 60; // in minutes
      const wordsTyped = targetText.split(' ').length;
      const wpm = Math.round(wordsTyped / timeTaken);
      
      // Calculate accuracy
      const accuracy = 100; // Perfect match since they completed it
      
      let message = `${wpm} WPM - Not bad!`;
      if (wpm > 60) message = `${wpm} WPM - You're fast! 🔥`;
      if (wpm > 80) message = `${wpm} WPM - Lightning fingers! ⚡`;
      if (wpm > 100) message = `${wpm} WPM - Are you even human?! 🚀`;
      
      setResult({ wpm, accuracy, message });
      
      toast({
        title: "🎯 Test completed!",
        description: message
      });
    }
  };

  const copyResult = async () => {
    if (!result) return;
    
    try {
      await navigator.clipboard.writeText(result.message);
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
              <div className="text-4xl mb-2">⚡</div>
              <h3 className="text-xl font-semibold text-gray-900">
                Typing Speed Meter
              </h3>
              <p className="text-gray-600">
                Test your typing speed and accuracy with visual feedback!
              </p>
            </div>

            {!targetText ? (
              <Button 
                onClick={startTest}
                className="w-full bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700"
              >
                <Zap className="w-4 h-4 mr-2" />
                Start Typing Test
              </Button>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Type this text:
                  </label>
                  <div className="p-4 bg-gray-100 rounded-lg mb-4">
                    <p className="text-gray-800 font-mono">
                      {targetText.split('').map((char, index) => (
                        <span
                          key={index}
                          className={
                            index < userInput.length
                              ? userInput[index] === char
                                ? 'bg-green-200'
                                : 'bg-red-200'
                              : ''
                          }
                        >
                          {char}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Your typing:
                  </label>
                  <Textarea
                    value={userInput}
                    onChange={(e) => handleInputChange(e.target.value)}
                    placeholder="Start typing the text above..."
                    rows={4}
                    className="resize-none font-mono"
                    disabled={!!result}
                  />
                </div>
                
                <Button 
                  onClick={startTest}
                  variant="outline"
                  className="w-full"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  New Test
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {result && (
        <Card className="bg-white/80 backdrop-blur-sm border-l-4 border-l-red-500">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Your Results
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
              <div className="text-center p-8 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border border-red-200">
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {result.wpm} WPM
                </div>
                <div className="text-lg text-gray-700 mb-4">
                  {result.accuracy}% Accuracy
                </div>
                <p className="text-gray-600">
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
