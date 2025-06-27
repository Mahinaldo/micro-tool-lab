
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, RefreshCw, Lightbulb } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const whatIfScenarios = [
  "What if dogs could code?",
  "What if CSS was a dessert?",
  "What if gravity only worked on Tuesdays?",
  "What if Wi-Fi passwords were actually magic spells?",
  "What if your keyboard could taste your thoughts?",
  "What if bugs in code were actual insects?",
  "What if you could download more RAM from the internet?",
  "What if Stack Overflow was a physical tower?",
  "What if rubber ducks could actually debug code?",
  "What if the cloud was made of actual clouds?",
  "What if semicolons had feelings?",
  "What if your computer ran on coffee instead of electricity?",
  "What if merge conflicts were resolved with rock-paper-scissors?",
  "What if 404 errors led to a secret dimension?",
  "What if Git commits were delivered by actual pigeons?",
  "What if programming languages could argue with each other?",
  "What if the delete key could erase regrets?",
  "What if every typo opened a portal to another universe?",
  "What if your browser history was publicly displayed?",
  "What if ctrl+z worked in real life?",
  "What if algorithms could dream?",
  "What if the internet was powered by hamsters on wheels?",
  "What if every website was a different planet?",
  "What if loading screens were actual time machines?",
  "What if your phone could charge itself by absorbing your stress?"
];

export const WhatIfGenerator = () => {
  const [scenario, setScenario] = useState('');
  const { toast } = useToast();

  const generateScenario = () => {
    const randomScenario = whatIfScenarios[Math.floor(Math.random() * whatIfScenarios.length)];
    setScenario(randomScenario);
    
    toast({
      title: "🤯 Mind blown!",
      description: "A new hypothetical scenario awaits"
    });
  };

  const copyScenario = async () => {
    if (!scenario) return;
    
    try {
      await navigator.clipboard.writeText(scenario);
      toast({
        title: "Copied!",
        description: "Scenario copied to clipboard"
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
            <div className="text-4xl mb-4">🤯</div>
            <h3 className="text-xl font-semibold text-gray-900">
              What If...? Generator
            </h3>
            <p className="text-gray-600">
              Prepare your mind for wonderfully weird hypothetical scenarios!
            </p>
            
            <Button 
              onClick={generateScenario}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
            >
              <Lightbulb className="w-4 h-4 mr-2" />
              Blow My Mind!
            </Button>
          </div>
        </CardContent>
      </Card>

      {scenario && (
        <Card className="bg-white/80 backdrop-blur-sm border-l-4 border-l-indigo-500">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Mind-Bending Scenario
                </label>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={generateScenario}
                    className="flex items-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Another One
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyScenario}
                    className="flex items-center gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    Copy
                  </Button>
                </div>
              </div>
              <div className="text-center p-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-200">
                <p className="text-xl text-gray-800 font-medium leading-relaxed">
                  {scenario}
                </p>
                <p className="text-sm text-gray-600 mt-4">
                  🤔 Now ponder this for the rest of the day...
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
