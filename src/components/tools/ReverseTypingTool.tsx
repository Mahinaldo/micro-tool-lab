
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const ReverseTypingTool = () => {
  const [input, setInput] = useState('');
  const { toast } = useToast();

  const reversed = input.split('').reverse().join('');

  const copyReversed = async () => {
    if (!reversed) return;
    
    try {
      await navigator.clipboard.writeText(reversed);
      toast({
        title: "Copied!",
        description: "Reversed text copied to clipboard"
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive"
      });
    }
  };

  const clearText = () => {
    setInput('');
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="text-center mb-4">
              <div className="text-4xl mb-2">🔄</div>
              <h3 className="text-xl font-semibold text-gray-900">Reverse Typing Tool</h3>
              <p className="text-gray-600">
                Watch your text reverse in real-time as you type!
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Type anything
              </label>
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Hello world..."
                className="text-center text-lg"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {input && (
        <Card className="bg-white/80 backdrop-blur-sm border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Reversed Text
                </label>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearText}
                    className="flex items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Clear
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyReversed}
                    className="flex items-center gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    Copy
                  </Button>
                </div>
              </div>
              <div className="text-center p-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                <div className="text-2xl font-mono text-gray-900 break-all">
                  {reversed}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
