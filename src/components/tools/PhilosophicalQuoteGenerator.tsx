
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, RefreshCw, Quote } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const PhilosophicalQuoteGenerator = () => {
  const [quote, setQuote] = useState('');
  const { toast } = useToast();

  const funnyQuotes = [
    "To be is to... buffer?",
    "I code, therefore I am (confused).",
    "The only constant is... merge conflicts.",
    "Life is like JavaScript - full of unexpected behaviors.",
    "In the beginning was the Word, and the Word was 'Hello World'.",
    "To debug or not to debug, that is the undefined question.",
    "All roads lead to Stack Overflow.",
    "I think, therefore I am... probably overthinking this.",
    "The journey of a thousand commits begins with a single push.",
    "What doesn't kill your code makes it stronger... or breaks production.",
    "Time is an illusion. Deadlines are super illusions.",
    "To err is human, to really mess up requires a computer.",
    "The real treasure was the bugs we fixed along the way.",
    "Life is what happens when you're busy fixing other issues.",
    "Be yourself, unless you can be Batman. Always be Batman.",
    "The meaning of life is 42... status codes.",
    "I came, I saw, I refactored.",
    "A bug in the hand is worth two in the backlog.",
    "Rome wasn't built in a day, but they probably had better documentation.",
    "If at first you don't succeed, call it version 1.0.",
    "The pen is mightier than the sword, but the keyboard is mightier than both.",
    "Give a person a fish and they eat for a day. Teach them to Google and they debug for a lifetime."
  ];

  const generateQuote = () => {
    const randomQuote = funnyQuotes[Math.floor(Math.random() * funnyQuotes.length)];
    setQuote(randomQuote);
    
    toast({
      title: "Wisdom generated! 🧠",
      description: "Deep thoughts from the coding abyss"
    });
  };

  const copyQuote = async () => {
    if (!quote) return;
    
    try {
      await navigator.clipboard.writeText(quote);
      toast({
        title: "Copied!",
        description: "Philosophical wisdom copied to clipboard"
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
              <div className="text-4xl mb-2">🤔</div>
              <h3 className="text-xl font-semibold text-gray-900">Philosophical Quote Generator</h3>
              <p className="text-gray-600">
                Deep thoughts... but make them funny and relatable
              </p>
            </div>
            
            <Button 
              onClick={generateQuote}
              className="w-full bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900"
            >
              <Quote className="w-4 h-4 mr-2" />
              Generate Wisdom
            </Button>
          </div>
        </CardContent>
      </Card>

      {quote && (
        <Card className="bg-white/80 backdrop-blur-sm border-l-4 border-l-gray-600">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Today's Wisdom
                </label>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={generateQuote}
                    className="flex items-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    More Wisdom
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyQuote}
                    className="flex items-center gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    Copy
                  </Button>
                </div>
              </div>
              <div className="text-center p-8 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-300">
                <div className="text-4xl mb-4">💭</div>
                <blockquote className="text-lg text-gray-800 italic font-medium leading-relaxed">
                  "{quote}"
                </blockquote>
                <p className="text-sm text-gray-600 mt-4">
                  - Ancient Developer Proverb
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
