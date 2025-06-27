
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, RefreshCw, Coffee } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const productivityKillers = [
  "Your keyboard needs rest too.",
  "The code spirits said no today.",
  "Mercury is in microwave mode.",
  "Your rubber duck called in sick.",
  "The Wi-Fi is having an existential crisis.",
  "Your coffee cup is judging your life choices.",
  "The compiler is feeling moody.",
  "Your brain.exe has stopped responding.",
  "The universe is buffering. Please wait.",
  "Your motivation went out for lunch and never came back.",
  "The debugging gods demand a sacrifice (of time).",
  "Your creativity is currently updating. 47% complete.",
  "Stack Overflow is down. That's a sign.",
  "Your chair is too comfortable for productivity.",
  "The ambient temperature is not optimized for coding.",
  "Your plants need to be watered. They're watching you.",
  "Someone, somewhere, is successfully procrastinating. Join them.",
  "The alignment of your monitor is 0.3 degrees off.",
  "Your socks don't match. How can you focus?",
  "It's definitely 5 o'clock somewhere."
];

export const RandomProductivityKiller = () => {
  const [excuse, setExcuse] = useState('');
  const { toast } = useToast();

  const generateExcuse = () => {
    const randomExcuse = productivityKillers[Math.floor(Math.random() * productivityKillers.length)];
    setExcuse(randomExcuse);
    toast({
      title: "Perfect excuse generated! 😏",
      description: "Time to embrace the procrastination"
    });
  };

  const copyExcuse = async () => {
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
          <div className="space-y-4">
            <div className="text-center mb-4">
              <div className="text-4xl mb-2">📉</div>
              <h3 className="text-xl font-semibold text-gray-900">Random Productivity Killer</h3>
              <p className="text-gray-600">
                Need a good reason to stop working? We've got you covered!
              </p>
            </div>

            <Button 
              onClick={generateExcuse}
              className="w-full bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700"
            >
              <Coffee className="w-4 h-4 mr-2" />
              Give Me An Excuse!
            </Button>
          </div>
        </CardContent>
      </Card>

      {excuse && (
        <Card className="bg-white/80 backdrop-blur-sm border-l-4 border-l-red-500">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Your Perfect Excuse
                </label>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={generateExcuse}
                    className="flex items-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    New Excuse
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyExcuse}
                    className="flex items-center gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    Copy
                  </Button>
                </div>
              </div>
              <div className="text-center p-8 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg border border-red-200">
                <p className="text-xl text-gray-800 italic leading-relaxed">
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
