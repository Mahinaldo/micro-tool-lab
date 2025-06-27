
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, RefreshCw, Smile } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const MockingTextGenerator = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const { toast } = useToast();

  const generateMockingText = () => {
    if (!input.trim()) {
      toast({
        title: "Error",
        description: "Please enter some text to mock",
        variant: "destructive"
      });
      return;
    }

    const mockingText = input
      .split('')
      .map((char, index) => {
        if (char.match(/[a-zA-Z]/)) {
          return index % 2 === 0 ? char.toLowerCase() : char.toUpperCase();
        }
        return char;
      })
      .join('');

    setOutput(mockingText);
    
    toast({
      title: "😏 Text mocked!",
      description: "Your mocking text is ready"
    });
  };

  const copyOutput = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Mocking text copied to clipboard"
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
              <div className="text-4xl mb-2">😏</div>
              <h3 className="text-xl font-semibold text-gray-900">
                Mocking Text Generator
              </h3>
              <p className="text-gray-600">
                cReAtE mOcKiNg TeXt LiKe ThIs FoR mAxImUm SaRcAsM!
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Text to Mock
              </label>
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="I am very serious about this"
                rows={4}
                className="resize-none"
              />
            </div>
            
            <Button 
              onClick={generateMockingText}
              disabled={!input.trim()}
              className="w-full bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700"
            >
              <Smile className="w-4 h-4 mr-2" />
              mAkE iT mOcKiNg!
            </Button>
          </div>
        </CardContent>
      </Card>

      {output && (
        <Card className="bg-white/80 backdrop-blur-sm border-l-4 border-l-red-500">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Mocking Text
                </label>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={generateMockingText}
                    className="flex items-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Regenerate
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyOutput}
                    className="flex items-center gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    Copy
                  </Button>
                </div>
              </div>
              <div className="p-6 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg border border-red-200">
                <p className="text-lg text-gray-800 font-mono leading-relaxed">
                  {output}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
