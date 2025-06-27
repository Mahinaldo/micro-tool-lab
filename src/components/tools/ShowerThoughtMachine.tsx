
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, RefreshCw, Lightbulb } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const showerThoughts = [
  "We clean ourselves with water that has already cleaned countless other things.",
  "Your age is just the number of times you've traveled around the sun.",
  "Every photo is from the past, even the ones you just took.",
  "You've survived 100% of your worst days so far.",
  "Sleeping is just death being shy.",
  "Your future self is watching you right now through memories.",
  "The brain named itself.",
  "We say 'slept like a baby' but babies wake up every two hours crying.",
  "If you're waiting for the waiter, aren't you the waiter?",
  "The word 'queue' is just the letter Q followed by four silent letters.",
  "You've never seen your own face, only reflections and photos.",
  "Every odd number has the letter 'e' in it.",
  "Clapping is just hitting yourself because you like something.",
  "Your skeleton is always wet.",
  "The first person to milk a cow was probably very thirsty and very brave.",
  "Brushing your teeth is the only time you clean your skeleton.",
  "Pizza is a real-time pie chart of how much pizza is left.",
  "You're always in the exact center of your field of vision.",
  "Coffee is just bean soup.",
  "The alphabet song and Twinkle Twinkle Little Star have the same tune."
];

export const ShowerThoughtMachine = () => {
  const [thought, setThought] = useState('');
  const { toast } = useToast();

  const generateThought = () => {
    const randomThought = showerThoughts[Math.floor(Math.random() * showerThoughts.length)];
    setThought(randomThought);
    toast({
      title: "🚿 Mind = Blown",
      description: "Deep thoughts unlocked!"
    });
  };

  const copyThought = async () => {
    if (!thought) return;
    
    try {
      await navigator.clipboard.writeText(thought);
      toast({
        title: "Copied!",
        description: "Shower thought copied to clipboard"
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
              <div className="text-4xl mb-2">🚿</div>
              <h3 className="text-xl font-semibold text-gray-900">Shower Thought Machine</h3>
              <p className="text-gray-600">
                Generate random deep thoughts that'll make you go "hmmm..."
              </p>
            </div>

            <Button 
              onClick={generateThought}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700"
            >
              <Lightbulb className="w-4 h-4 mr-2" />
              Generate Shower Thought
            </Button>
          </div>
        </CardContent>
      </Card>

      {thought && (
        <Card className="bg-white/80 backdrop-blur-sm border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Your Shower Thought
                </label>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={generateThought}
                    className="flex items-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    New Thought
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyThought}
                    className="flex items-center gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    Copy
                  </Button>
                </div>
              </div>
              <div className="text-center p-8 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
                <div className="text-4xl mb-4">🤯</div>
                <p className="text-lg text-gray-800 italic leading-relaxed">
                  {thought}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
