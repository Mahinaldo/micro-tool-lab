
import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Save, Trash2, Brain } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const SaveMyLastBraincell = () => {
  const [thought, setThought] = useState('');
  const [savedThought, setSavedThought] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const saved = localStorage.getItem('lastBraincell');
    if (saved) {
      setSavedThought(saved);
    }
  }, []);

  const saveThought = () => {
    if (!thought.trim()) {
      toast({
        title: "Error",
        description: "Please enter a thought to save!",
        variant: "destructive"
      });
      return;
    }

    localStorage.setItem('lastBraincell', thought);
    setSavedThought(thought);
    
    toast({
      title: "🧠 Braincell Saved!",
      description: "Your precious thought is now preserved"
    });
  };

  const clearThought = () => {
    localStorage.removeItem('lastBraincell');
    setSavedThought('');
    setThought('');
    
    toast({
      title: "🗑️ Braincell Cleared",
      description: "Ready for a fresh thought"
    });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="text-center mb-4">
              <div className="text-4xl mb-2">🧠</div>
              <h3 className="text-xl font-semibold text-gray-900">Save My Last Braincell</h3>
              <p className="text-gray-600">
                Preserve that one important thought before it disappears forever
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Your Precious Thought
              </label>
              <Textarea
                value={thought}
                onChange={(e) => setThought(e.target.value)}
                placeholder="That brilliant idea you just had..."
                rows={4}
                className="resize-none"
              />
            </div>
            
            <Button 
              onClick={saveThought}
              disabled={!thought.trim()}
              className="w-full bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700"
            >
              <Save className="w-4 h-4 mr-2" />
              Save My Braincell
            </Button>
          </div>
        </CardContent>
      </Card>

      {savedThought && (
        <Card className="bg-white/80 backdrop-blur-sm border-l-4 border-l-pink-500">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Your Saved Braincell
                </label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearThought}
                  className="flex items-center gap-2 text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear
                </Button>
              </div>
              <div className="p-6 bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg border border-pink-200">
                <div className="flex items-start gap-3">
                  <Brain className="w-6 h-6 text-pink-600 mt-1 flex-shrink-0" />
                  <p className="text-gray-800 leading-relaxed">{savedThought}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
