
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const LifeProgressBar = () => {
  const [birthDate, setBirthDate] = useState('');
  const [lifeStats, setLifeStats] = useState<{
    ageYears: number;
    ageMonths: number;
    ageDays: number;
    progressPercent: number;
    level: number;
    message: string;
  } | null>(null);
  const { toast } = useToast();

  const calculateLife = () => {
    if (!birthDate) {
      toast({
        title: "Error",
        description: "Please enter your birth date",
        variant: "destructive"
      });
      return;
    }

    const birth = new Date(birthDate);
    const now = new Date();
    const lifeExpectancy = 80; // years

    // Calculate age
    const ageMs = now.getTime() - birth.getTime();
    const ageYears = Math.floor(ageMs / (365.25 * 24 * 60 * 60 * 1000));
    const ageMonths = Math.floor((ageMs % (365.25 * 24 * 60 * 60 * 1000)) / (30.44 * 24 * 60 * 60 * 1000));
    const ageDays = Math.floor(ageMs / (24 * 60 * 60 * 1000));

    // Calculate progress
    const progressPercent = Math.min(100, (ageYears / lifeExpectancy) * 100);

    // Generate motivational message
    let message = `You're at level ${ageYears}/${lifeExpectancy}. Keep leveling up! 🚀`;
    
    if (ageYears === 18) message = "🎉 Adult mode unlocked!";
    else if (ageYears === 21) message = "🍻 All permissions granted!";
    else if (ageYears === 25) message = "🧠 Brain fully developed (allegedly)!";
    else if (ageYears === 30) message = "🏠 Adulting intensifies!";
    else if (ageYears === 40) message = "🎯 Mid-game checkpoint reached!";
    else if (ageYears === 50) message = "🎖️ Wisdom level: Expert!";
    else if (ageYears >= 65) message = "👑 Elder status achieved!";
    else if (progressPercent < 20) message = "🌱 Just getting started!";
    else if (progressPercent < 40) message = "🏃‍♀️ Building momentum!";
    else if (progressPercent < 60) message = "⚡ Peak performance zone!";
    else if (progressPercent < 80) message = "🎯 Mastering the game!";

    setLifeStats({
      ageYears,
      ageMonths,
      ageDays,
      progressPercent,
      level: ageYears,
      message
    });

    toast({
      title: "Life stats calculated! 📊",
      description: `You've completed ${progressPercent.toFixed(1)}% of your journey`
    });
  };

  const copyStats = async () => {
    if (!lifeStats) return;
    
    const statsText = `Life Progress: ${lifeStats.progressPercent.toFixed(1)}% | Level ${lifeStats.level}/80 | ${lifeStats.ageDays} days lived`;
    
    try {
      await navigator.clipboard.writeText(statsText);
      toast({
        title: "Copied!",
        description: "Life stats copied to clipboard"
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
              <div className="text-4xl mb-2">📊</div>
              <h3 className="text-xl font-semibold text-gray-900">Life Progress Bar</h3>
              <p className="text-gray-600">
                See how far you've come in your life's journey
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Your Birth Date
              </label>
              <Input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                max={new Date().toISOString().split('T')[0]}
              />
            </div>
            
            <Button 
              onClick={calculateLife}
              disabled={!birthDate}
              className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Calculate My Life Progress
            </Button>
          </div>
        </CardContent>
      </Card>

      {lifeStats && (
        <Card className="bg-white/80 backdrop-blur-sm border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Your Life Stats
                </label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyStats}
                  className="flex items-center gap-2"
                >
                  <Copy className="w-4 h-4" />
                  Copy
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-gray-900">
                      Level {lifeStats.level}/80
                    </div>
                    <p className="text-gray-600 mt-2">{lifeStats.message}</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Life Progress</span>
                      <span>{lifeStats.progressPercent.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-blue-600 h-4 rounded-full transition-all duration-1000"
                        style={{ width: `${lifeStats.progressPercent}%` }}
                      />
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mt-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-gray-900">{lifeStats.ageYears}</div>
                        <div className="text-xs text-gray-600">Years</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-900">{lifeStats.ageMonths}</div>
                        <div className="text-xs text-gray-600">Months</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-900">{lifeStats.ageDays.toLocaleString()}</div>
                        <div className="text-xs text-gray-600">Days</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
