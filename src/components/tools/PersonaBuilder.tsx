
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, RefreshCw, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const colors = ['Red', 'Blue', 'Green', 'Purple', 'Orange', 'Pink', 'Yellow', 'Black', 'White', 'Silver'];
const animals = ['Wolf', 'Eagle', 'Lion', 'Panther', 'Dragon', 'Phoenix', 'Tiger', 'Bear', 'Shark', 'Falcon'];
const seasons = ['Spring', 'Summer', 'Autumn', 'Winter'];

const vibes = ['Chill', 'Fierce', 'Mysterious', 'Noble', 'Wild', 'Elegant', 'Bold', 'Serene', 'Ancient', 'Electric'];

export const PersonaBuilder = () => {
  const [color, setColor] = useState('');
  const [animal, setAnimal] = useState('');
  const [season, setSeason] = useState('');
  const [persona, setPersona] = useState('');
  const { toast } = useToast();

  const buildPersona = () => {
    if (!color || !animal || !season) {
      toast({
        title: "Error",
        description: "Please select all three options!",
        variant: "destructive"
      });
      return;
    }

    const vibe = vibes[Math.floor(Math.random() * vibes.length)];
    const generatedPersona = `You are a ${vibe} ${animal} of ${season}`;
    
    setPersona(generatedPersona);
    
    toast({
      title: "🎭 Persona Created!",
      description: generatedPersona
    });
  };

  const copyPersona = async () => {
    if (!persona) return;
    
    try {
      await navigator.clipboard.writeText(persona);
      toast({
        title: "Copied!",
        description: "Persona copied to clipboard"
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
              <div className="text-4xl mb-2">🎭</div>
              <h3 className="text-xl font-semibold text-gray-900">Persona Builder</h3>
              <p className="text-gray-600">
                Choose your preferences and discover your unique persona!
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Favorite Color
                </label>
                <Select value={color} onValueChange={setColor}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a color" />
                  </SelectTrigger>
                  <SelectContent>
                    {colors.map(c => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Spirit Animal
                </label>
                <Select value={animal} onValueChange={setAnimal}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an animal" />
                  </SelectTrigger>
                  <SelectContent>
                    {animals.map(a => (
                      <SelectItem key={a} value={a}>{a}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Favorite Season
                </label>
                <Select value={season} onValueChange={setSeason}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a season" />
                  </SelectTrigger>
                  <SelectContent>
                    {seasons.map(s => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Button 
              onClick={buildPersona}
              disabled={!color || !animal || !season}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
            >
              <User className="w-4 h-4 mr-2" />
              Build My Persona
            </Button>
          </div>
        </CardContent>
      </Card>

      {persona && (
        <Card className="bg-white/80 backdrop-blur-sm border-l-4 border-l-indigo-500">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Your Persona
                </label>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={buildPersona}
                    className="flex items-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    New Persona
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyPersona}
                    className="flex items-center gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    Copy
                  </Button>
                </div>
              </div>
              <div className="text-center p-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-200">
                <div className="text-2xl font-bold text-gray-900 mb-4">
                  {persona}
                </div>
                <p className="text-gray-600">
                  Based on: {color} • {animal} • {season}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
