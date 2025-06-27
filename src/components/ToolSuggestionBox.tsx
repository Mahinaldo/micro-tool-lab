
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Lightbulb, Send, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ToolSuggestion {
  id: string;
  title: string;
  description: string;
  timestamp: number;
}

export const ToolSuggestionBox = () => {
  const [suggestions, setSuggestions] = useState<ToolSuggestion[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const saved = localStorage.getItem('toolSuggestions');
    if (saved) {
      setSuggestions(JSON.parse(saved));
    }
  }, []);

  const saveSuggestions = (newSuggestions: ToolSuggestion[]) => {
    localStorage.setItem('toolSuggestions', JSON.stringify(newSuggestions));
    setSuggestions(newSuggestions);
  };

  const submitSuggestion = () => {
    if (!title.trim() || !description.trim()) {
      toast({
        title: "Error",
        description: "Please fill in both title and description!",
        variant: "destructive"
      });
      return;
    }

    const newSuggestion: ToolSuggestion = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      timestamp: Date.now()
    };

    const updatedSuggestions = [newSuggestion, ...suggestions];
    saveSuggestions(updatedSuggestions);

    setTitle('');
    setDescription('');
    setIsExpanded(false);

    toast({
      title: "💡 Suggestion Submitted!",
      description: "Thanks for your creative idea!"
    });
  };

  const deleteSuggestion = (id: string) => {
    const updatedSuggestions = suggestions.filter(s => s.id !== id);
    saveSuggestions(updatedSuggestions);
    
    toast({
      title: "Suggestion Deleted",
      description: "Your suggestion has been removed"
    });
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Lightbulb className="w-5 h-5 text-yellow-500" />
          Got a Tool Idea?
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isExpanded ? (
          <Button
            onClick={() => setIsExpanded(true)}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
          >
            <Lightbulb className="w-4 h-4 mr-2" />
            Suggest a New Tool
          </Button>
        ) : (
          <div className="space-y-3">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Tool name (e.g., 'Meme Generator')"
              maxLength={50}
            />
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what it should do..."
              rows={3}
              maxLength={200}
            />
            <div className="flex gap-2">
              <Button onClick={submitSuggestion} className="flex-1">
                <Send className="w-4 h-4 mr-2" />
                Submit
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsExpanded(false);
                  setTitle('');
                  setDescription('');
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {suggestions.length > 0 && (
          <div className="pt-4 border-t">
            <h4 className="font-medium text-sm text-gray-700 mb-3">
              Community Suggestions ({suggestions.length})
            </h4>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {suggestions.slice(0, 5).map((suggestion) => (
                <div
                  key={suggestion.id}
                  className="p-3 bg-gray-50 rounded-lg text-sm"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">
                        {suggestion.title}
                      </div>
                      <div className="text-gray-600 mt-1">
                        {suggestion.description}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteSuggestion(suggestion.id)}
                      className="text-red-500 hover:text-red-700 ml-2"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
