
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, RefreshCw, Brain } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const wittyResponses = [
  "Yes, but only if you bring snacks.",
  "No. Trust me on this one.",
  "Maybe, but check your horoscope first.",
  "Absolutely! Go for it!",
  "Hard no. Your future self will thank me.",
  "Yes, but wear your lucky socks.",
  "Only if it's a Tuesday.",
  "No way, José.",
  "Yes, but ask your mom first.",
  "Maybe... flip a coin to be sure.",
  "Do it! What's the worst that could happen?",
  "Nope, that's a trap.",
  "Yes, but only after coffee.",
  "Maybe, but not today.",
  "Definitely! The stars are aligned.",
  "No, but nice try.",
  "Yes, but take a friend.",
  "Only if you really, really want to.",
  "No, save your energy for something better.",
  "Maybe, but sleep on it first."
];

export const DecisionMaker = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const { toast } = useToast();

  const getDecision = () => {
    if (!question.trim()) {
      toast({
        title: "Error",
        description: "Please ask me a question first!",
        variant: "destructive"
      });
      return;
    }

    const randomAnswer = wittyResponses[Math.floor(Math.random() * wittyResponses.length)];
    setAnswer(randomAnswer);
    
    toast({
      title: "🧠 Decision made!",
      description: "Your answer is ready"
    });
  };

  const copyAnswer = async () => {
    if (!answer) return;
    
    try {
      await navigator.clipboard.writeText(answer);
      toast({
        title: "Copied!",
        description: "Answer copied to clipboard"
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
              <div className="text-4xl mb-2">🧠</div>
              <h3 className="text-xl font-semibold text-gray-900">
                The Decision Maker
              </h3>
              <p className="text-gray-600">
                Ask me any yes/no question and I'll give you wisdom (with a twist)!
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Your Question
              </label>
              <Input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Should I eat pizza for breakfast?"
                className="text-center"
              />
            </div>
            
            <Button 
              onClick={getDecision}
              disabled={!question.trim()}
              className="w-full bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700"
            >
              <Brain className="w-4 h-4 mr-2" />
              Make My Decision!
            </Button>
          </div>
        </CardContent>
      </Card>

      {answer && (
        <Card className="bg-white/80 backdrop-blur-sm border-l-4 border-l-violet-500">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  The Answer
                </label>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={getDecision}
                    className="flex items-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Ask Again
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyAnswer}
                    className="flex items-center gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    Copy
                  </Button>
                </div>
              </div>
              <div className="text-center p-8 bg-gradient-to-r from-violet-50 to-purple-50 rounded-lg border border-violet-200">
                <p className="text-xl text-gray-800 italic leading-relaxed">
                  "{answer}"
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
