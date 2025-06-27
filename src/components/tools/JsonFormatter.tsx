
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Copy, CheckCircle, XCircle, Code } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const JsonFormatter = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [error, setError] = useState('');
  const { toast } = useToast();

  const formatJson = () => {
    if (!input.trim()) {
      toast({
        title: "Error",
        description: "Please enter JSON to format",
        variant: "destructive"
      });
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setIsValid(true);
      setError('');
      toast({
        title: "JSON formatted!",
        description: "Your JSON has been prettified"
      });
    } catch (err) {
      setIsValid(false);
      setError(err instanceof Error ? err.message : 'Invalid JSON');
      setOutput('');
      toast({
        title: "Invalid JSON",
        description: "Please check your JSON syntax",
        variant: "destructive"
      });
    }
  };

  const minifyJson = () => {
    if (!input.trim()) {
      toast({
        title: "Error",
        description: "Please enter JSON to minify",
        variant: "destructive"
      });
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setIsValid(true);
      setError('');
      toast({
        title: "JSON minified!",
        description: "Your JSON has been compressed"
      });
    } catch (err) {
      setIsValid(false);
      setError(err instanceof Error ? err.message : 'Invalid JSON');
      setOutput('');
      toast({
        title: "Invalid JSON",
        description: "Please check your JSON syntax",
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
        description: "Formatted JSON copied to clipboard"
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
                  JSON Input
                </label>
                {isValid !== null && (
                  <Badge variant={isValid ? "default" : "destructive"} className="flex items-center gap-1">
                    {isValid ? (
                      <>
                        <CheckCircle className="w-3 h-3" />
                        Valid JSON
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3 h-3" />
                        Invalid JSON
                      </>
                    )}
                  </Badge>
                )}
              </div>
              <Textarea
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  setIsValid(null);
                  setError('');
                }}
                placeholder='{"name": "John", "age": 30, "city": "New York"}'
                rows={8}
                className="resize-none font-mono text-sm"
              />
              {error && (
                <p className="text-red-500 text-xs mt-1">{error}</p>
              )}
            </div>
            
            <div className="flex gap-2">
              <Button 
                onClick={formatJson}
                disabled={!input.trim()}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
              >
                <Code className="w-4 h-4 mr-2" />
                Pretty Print
              </Button>
              <Button 
                onClick={minifyJson}
                disabled={!input.trim()}
                variant="outline"
                className="flex-1"
              >
                Minify
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {output && (
        <Card className="bg-white/80 backdrop-blur-sm border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Formatted JSON
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
                rows={12}
                className="resize-none font-mono text-sm bg-gray-50"
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
