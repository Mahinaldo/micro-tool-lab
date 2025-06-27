
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, ArrowDownUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const Base64Tool = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const { toast } = useToast();

  const processBase64 = () => {
    if (!input.trim()) {
      toast({
        title: "Error",
        description: "Please enter some text to process",
        variant: "destructive"
      });
      return;
    }

    try {
      if (mode === 'encode') {
        const encoded = btoa(input);
        setOutput(encoded);
        toast({
          title: "Encoded!",
          description: "Text has been encoded to Base64"
        });
      } else {
        const decoded = atob(input);
        setOutput(decoded);
        toast({
          title: "Decoded!",
          description: "Base64 has been decoded to text"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: mode === 'decode' ? "Invalid Base64 string" : "Failed to encode text",
        variant: "destructive"
      });
    }
  };

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
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

  const switchMode = () => {
    setMode(mode === 'encode' ? 'decode' : 'encode');
    setInput(output);
    setOutput('');
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">
                Base64 {mode === 'encode' ? 'Encoder' : 'Decoder'}
              </h3>
              <Button
                variant="outline"
                onClick={switchMode}
                className="flex items-center gap-2"
              >
                <ArrowDownUp className="w-4 h-4" />
                Switch to {mode === 'encode' ? 'Decode' : 'Encode'}
              </Button>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                {mode === 'encode' ? 'Text to Encode' : 'Base64 to Decode'}
              </label>
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={mode === 'encode' 
                  ? "Enter text to encode to Base64..." 
                  : "Enter Base64 string to decode..."
                }
                rows={6}
                className="resize-none font-mono"
              />
            </div>
            
            <Button 
              onClick={processBase64}
              disabled={!input.trim()}
              className="w-full bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700"
            >
              {mode === 'encode' ? 'Encode to Base64' : 'Decode from Base64'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {output && (
        <Card className="bg-white/80 backdrop-blur-sm border-l-4 border-l-indigo-500">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  {mode === 'encode' ? 'Base64 Result' : 'Decoded Text'}
                </label>
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
              <Textarea
                value={output}
                readOnly
                rows={6}
                className="resize-none font-mono bg-gray-50"
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
