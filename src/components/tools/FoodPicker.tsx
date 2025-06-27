
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, RefreshCw, Utensils } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const foods = [
  "🍕 Pizza",
  "🍔 Burger",
  "🍜 Ramen",
  "🥗 Salad",
  "🌮 Tacos",
  "🍝 Pasta",
  "🍣 Sushi",
  "🥘 Curry",
  "🍖 BBQ",
  "🥪 Sandwich",
  "🍲 Soup",
  "🌯 Burrito",
  "🥙 Kebab",
  "🍱 Bento Box",
  "🥟 Dumplings",
  "🍛 Rice Bowl",
  "🐟 Fish & Chips",
  "🥩 Steak",
  "🍗 Fried Chicken",
  "🥐 Croissant",
  "🌭 Hot Dog",
  "🍳 Eggs Benedict",
  "🥯 Bagel",
  "🧆 Falafel",
  "🍤 Shrimp",
  "🥡 Chinese Takeout",
  "🫔 Tamales",
  "🍊 Pho",
  "🥓 Bacon & Eggs",
  "🧀 Grilled Cheese"
];

export const FoodPicker = () => {
  const [selectedFood, setSelectedFood] = useState('');
  const { toast } = useToast();

  const pickFood = () => {
    const randomFood = foods[Math.floor(Math.random() * foods.length)];
    setSelectedFood(randomFood);
    toast({
      title: "Decision made!",
      description: "Your meal has been chosen"
    });
  };

  const copyToClipboard = async () => {
    if (!selectedFood) return;
    
    try {
      await navigator.clipboard.writeText(selectedFood);
      toast({
        title: "Copied!",
        description: "Food choice copied to clipboard"
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
          <div className="text-center space-y-4">
            <div className="text-4xl mb-4">🤔</div>
            <h3 className="text-xl font-semibold text-gray-900">
              What Should I Eat?
            </h3>
            <p className="text-gray-600">
              Can't decide what to eat? Let us help you make that tough decision! 
              Just click the button and we'll pick something delicious for you.
            </p>
            
            <Button 
              onClick={pickFood}
              className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700"
            >
              <Utensils className="w-4 h-4 mr-2" />
              What Should I Eat?
            </Button>
          </div>
        </CardContent>
      </Card>

      {selectedFood && (
        <Card className="bg-white/80 backdrop-blur-sm border-l-4 border-l-rose-500">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Your Meal Decision
                </label>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={pickFood}
                    className="flex items-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Pick Again
                  </Button>
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
              </div>
              <div className="text-center p-8 bg-gradient-to-r from-rose-50 to-pink-50 rounded-lg border border-rose-200">
                <div className="text-4xl font-bold text-gray-900 mb-4">
                  {selectedFood}
                </div>
                <p className="text-gray-600 text-lg">
                  Bon appétit! 🎉
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
