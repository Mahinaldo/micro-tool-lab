
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, RefreshCw, Smile } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const excuses = [
  "My cat stepped on my keyboard and deleted everything",
  "I was abducted by aliens and they don't have WiFi",
  "My code was so good it became sentient and ran away",
  "I got trapped in an infinite loop and just escaped",
  "A bug in the matrix caused all my files to disappear",
  "My rubber duck debugger went on strike",
  "I was debugging someone else's code in my dreams all night",
  "The coffee machine broke and I can't function without caffeine",
  "I accidentally invented time travel and got stuck in 1995",
  "My Wi-Fi password changed itself and I can't guess what it picked",
  "A squirrel chewed through the internet cables in my area",
  "I was busy preventing Y2K from happening again",
  "My computer developed feelings and is currently in therapy",
  "I got lost in the documentation and needed a search and rescue team",
  "The git demons possessed my repository",
  "I was recruited by NASA to debug their Mars rover",
  "My IDE gained consciousness and decided to rewrite all my code",
  "I had to manually debug the universe's source code",
  "A time paradox caused my commits to happen before I wrote them",
  "I discovered a new programming language that only I can understand"
];

export const ExcuseGenerator = () => {
  const [excuse, setExcuse] = useState('');
  const { toast } = useToast();

  const generateExcuse = () => {
    const randomExcuse = excuses[Math.floor(Math.random() * excuses.length)];
    setExcuse(randomExcuse);
    toast({
      title: "Excuse generated!",
      description: "Your creative excuse is ready"
    });
  };

  const copyToClipboard = async () => {
    if (!excuse) return;
    
    try {
      await navigator.clipboard.writeText(excuse);
      toast({
        title: "Copied!",
        description: "Excuse copied to clipboard"
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
            <div className="text-4xl mb-4">🤷‍♂️</div>
            <p className="text-gray-600">
              Need a creative excuse? We've got you covered with our collection of 
              tech-savvy and delightfully absurd excuses!
            </p>
            
            <Button 
              onClick={generateExcuse}
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700"
            >
              <Smile className="w-4 h-4 mr-2" />
              Generate Random Excuse
            </Button>
          </div>
        </CardContent>
      </Card>

      {excuse && (
        <Card className="bg-white/80 backdrop-blur-sm border-l-4 border-l-yellow-500">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Your Excuse
                </label>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={generateExcuse}
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
              <div className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                <p className="text-lg text-gray-800 text-center italic leading-relaxed">
                  "{excuse}"
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
