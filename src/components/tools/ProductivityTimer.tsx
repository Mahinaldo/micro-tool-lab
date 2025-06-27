
import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Timer, Play, Pause, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const ProductivityTimer = () => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [currentSession, setCurrentSession] = useState<{ duration: number; tagline: string } | null>(null);
  const { toast } = useToast();

  const timerOptions = [
    { minutes: 10, tagline: "Quick burst! You've got this!" },
    { minutes: 15, tagline: "Perfect focus window." },
    { minutes: 17, tagline: "Oddly specific, oddly effective." },
    { minutes: 20, tagline: "Classic productivity chunk." },
    { minutes: 23, tagline: "Just enough time to get dangerous." },
    { minutes: 25, tagline: "The golden Pomodoro!" },
    { minutes: 30, tagline: "Half hour of pure focus." },
    { minutes: 45, tagline: "Deep work territory." }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && currentSession) {
      setIsRunning(false);
      toast({
        title: "Time's up! 🎉",
        description: "Great work! Take a breather."
      });
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, currentSession]);

  const startRandomTimer = () => {
    const randomOption = timerOptions[Math.floor(Math.random() * timerOptions.length)];
    const seconds = randomOption.minutes * 60;
    
    setCurrentSession({ duration: randomOption.minutes, tagline: randomOption.tagline });
    setTimeLeft(seconds);
    setIsRunning(true);
    
    toast({
      title: `${randomOption.minutes} minute session!`,
      description: randomOption.tagline
    });
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(0);
    setCurrentSession(null);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="text-center mb-4">
              <div className="text-4xl mb-2">⏱️</div>
              <h3 className="text-xl font-semibold text-gray-900">Productivity Timer Roulette</h3>
              <p className="text-gray-600">
                Get a random focus session - because choice paralysis is real!
              </p>
            </div>

            {!currentSession ? (
              <Button 
                onClick={startRandomTimer}
                className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
              >
                <Timer className="w-4 h-4 mr-2" />
                Spin the Timer Wheel!
              </Button>
            ) : (
              <div className="space-y-4">
                <div className="text-center p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-200">
                  <div className="text-4xl font-mono font-bold text-gray-900 mb-2">
                    {formatTime(timeLeft)}
                  </div>
                  <p className="text-gray-700 mb-2">
                    {currentSession.duration} minute session
                  </p>
                  <p className="text-sm text-gray-600 italic">
                    {currentSession.tagline}
                  </p>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    onClick={toggleTimer}
                    variant={isRunning ? "secondary" : "default"}
                    className="flex-1"
                  >
                    {isRunning ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                    {isRunning ? 'Pause' : 'Start'}
                  </Button>
                  <Button
                    onClick={resetTimer}
                    variant="outline"
                    className="flex-1"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
