
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const DaysSinceTool = () => {
  const [date, setDate] = useState('');
  const [result, setResult] = useState<{ days: number; message: string } | null>(null);
  const { toast } = useToast();

  const calculateDays = () => {
    if (!date) {
      toast({
        title: "Error",
        description: "Please select a date",
        variant: "destructive"
      });
      return;
    }

    const inputDate = new Date(date);
    const today = new Date();
    const diffTime = today.getTime() - inputDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    let message = `It's been ${Math.abs(diffDays)} days.`;
    
    if (diffDays < 0) {
      message = `That's ${Math.abs(diffDays)} days in the future!`;
    } else if (diffDays === 0) {
      message = "That's today!";
    } else if (diffDays === 100) {
      message = "🎉 Exactly 100 days! That's a milestone!";
    } else if (diffDays === 365) {
      message = "🎂 One full year! Time for a celebration!";
    } else if (diffDays === 1000) {
      message = "🚀 1000 days! You're practically a time traveler!";
    } else if (diffDays % 365 === 0 && diffDays > 0) {
      message = `🎉 Exactly ${diffDays / 365} year${diffDays / 365 > 1 ? 's' : ''}! Anniversary time!`;
    }

    setResult({ days: Math.abs(diffDays), message });
    
    toast({
      title: "📅 Calculated!",
      description: message
    });
  };

  const copyResult = async () => {
    if (!result) return;
    
    try {
      await navigator.clipboard.writeText(result.message);
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

  return (
    <div className="space-y-6">
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="text-center mb-4">
              <div className="text-4xl mb-2">📅</div>
              <h3 className="text-xl font-semibold text-gray-900">
                Days Since Counter
              </h3>
              <p className="text-gray-600">
                Find out how many days have passed since any date
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Select a Date
              </label>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="text-center"
              />
            </div>
            
            <Button 
              onClick={calculateDays}
              disabled={!date}
              className="w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Calculate Days
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && (
        <Card className="bg-white/80 backdrop-blur-sm border-l-4 border-l-sky-500">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Time Calculation
                </label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyResult}
                  className="flex items-center gap-2"
                >
                  <Copy className="w-4 h-4" />
                  Copy
                </Button>
              </div>
              <div className="text-center p-8 bg-gradient-to-r from-sky-50 to-blue-50 rounded-lg border border-sky-200">
                <div className="text-4xl font-bold text-gray-900 mb-4">
                  {result.days}
                </div>
                <p className="text-lg text-gray-800">
                  {result.message}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
