
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Copy, Sparkles, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const TextSummarizer = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const summarizeText = async () => {
    if (!input.trim()) {
      toast({
        title: "Error",
        description: "Please enter some text to summarize",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate AI summarization (replace with actual API call)
    setTimeout(() => {
      const sentences = input.split(/[.!?]+/).filter(s => s.trim().length > 0);
      const summary = sentences.slice(0, Math.max(1, Math.floor(sentences.length / 3))).join('. ') + '.';
      setOutput(summary);
      setIsLoading(false);
      
      toast({
        title: "Text summarized!",
        description: "Your summary is ready"
      });
    }, 2000);
  };

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Summary copied to clipboard"
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
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">
                  Text to Summarize
                </label>
                <Badge variant="outline" className="text-xs">
                  {input.length} characters
                </Badge>
              </div>
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste your text here and I'll create a concise summary..."
                rows={6}
                className="resize-none"
              />
            </div>
            
            <Button 
              onClick={summarizeText}
              disabled={isLoading || !input.trim()}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Summarizing...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Summarize Text
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {output && (
        <Card className="bg-white/80 backdrop-blur-sm border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Summary
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
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-800 leading-relaxed">{output}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
