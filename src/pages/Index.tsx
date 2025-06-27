import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Github, Heart } from "lucide-react";
import { TextSummarizer } from "@/components/tools/TextSummarizer";
import { PasswordGenerator } from "@/components/tools/PasswordGenerator";
import { WordCounter } from "@/components/tools/WordCounter";
import { Base64Tool } from "@/components/tools/Base64Tool";
import { JsonFormatter } from "@/components/tools/JsonFormatter";
import { ExcuseGenerator } from "@/components/tools/ExcuseGenerator";
import { RandomNumber } from "@/components/tools/RandomNumber";
import { FoodPicker } from "@/components/tools/FoodPicker";
import { DiceRoller } from "@/components/tools/DiceRoller";
import { RandomPicker } from "@/components/tools/RandomPicker";
import { DecisionMaker } from "@/components/tools/DecisionMaker";
import { ColorMoodFinder } from "@/components/tools/ColorMoodFinder";
import { SecretMessageTool } from "@/components/tools/SecretMessageTool";
import { DaysSinceTool } from "@/components/tools/DaysSinceTool";
import { LuckyNumberGenerator } from "@/components/tools/LuckyNumberGenerator";
import { FontPersonalityMatcher } from "@/components/tools/FontPersonalityMatcher";
import { MockingTextGenerator } from "@/components/tools/MockingTextGenerator";
import { MoodEmojiGenerator } from "@/components/tools/MoodEmojiGenerator";
import { TypingSpeedMeter } from "@/components/tools/TypingSpeedMeter";
import { WhatIfGenerator } from "@/components/tools/WhatIfGenerator";
import { VibeChecker } from "@/components/tools/VibeChecker";
import { ProductivityTimer } from "@/components/tools/ProductivityTimer";
import { LoFiNicknameGenerator } from "@/components/tools/LoFiNicknameGenerator";
import { PhilosophicalQuoteGenerator } from "@/components/tools/PhilosophicalQuoteGenerator";
import { LifeProgressBar } from "@/components/tools/LifeProgressBar";
import { MultitaskerIQChecker } from "@/components/tools/MultitaskerIQChecker";
import { ReverseTypingTool } from "@/components/tools/ReverseTypingTool";
import { RandomProductivityKiller } from "@/components/tools/RandomProductivityKiller";
import { ShowerThoughtMachine } from "@/components/tools/ShowerThoughtMachine";
import { DramaTitleGenerator } from "@/components/tools/DramaTitleGenerator";
import { OverengineeredCoinFlip } from "@/components/tools/OverengineeredCoinFlip";
import { PersonaBuilder } from "@/components/tools/PersonaBuilder";
import { SaveMyLastBraincell } from "@/components/tools/SaveMyLastBraincell";
import { NumberPersonalityTest } from "@/components/tools/NumberPersonalityTest";
import { CodeRageMeter } from "@/components/tools/CodeRageMeter";
import { EasterEggHandler } from "@/components/EasterEggHandler";
import { ToolSuggestionBox } from "@/components/ToolSuggestionBox";
import { useToolOfTheDay } from "@/hooks/useToolOfTheDay";

const tools = [
  {
    id: 'text-summarizer',
    title: 'Text Summarizer',
    description: 'Summarize any text in one click',
    category: 'Text',
    component: TextSummarizer,
    gradient: 'from-blue-500 to-purple-600'
  },
  {
    id: 'password-generator',
    title: 'Password Generator',
    description: 'Generate secure passwords instantly',
    category: 'Security',
    component: PasswordGenerator,
    gradient: 'from-green-500 to-teal-600'
  },
  {
    id: 'word-counter',
    title: 'Word Counter',
    description: 'Count words, characters, and paragraphs',
    category: 'Text',
    component: WordCounter,
    gradient: 'from-orange-500 to-red-600'
  },
  {
    id: 'base64-tool',
    title: 'Base64 Encoder/Decoder',
    description: 'Encode and decode Base64 strings',
    category: 'Dev',
    component: Base64Tool,
    gradient: 'from-indigo-500 to-blue-600'
  },
  {
    id: 'json-formatter',
    title: 'JSON Formatter',
    description: 'Pretty print and validate JSON',
    category: 'Dev',
    component: JsonFormatter,
    gradient: 'from-purple-500 to-pink-600'
  },
  {
    id: 'excuse-generator',
    title: 'Excuse Generator',
    description: 'Generate creative excuses for any situation',
    category: 'Fun',
    component: ExcuseGenerator,
    gradient: 'from-yellow-500 to-orange-600'
  },
  {
    id: 'random-number',
    title: 'Random Number',
    description: 'Generate random numbers with custom ranges',
    category: 'Fun',
    component: RandomNumber,
    gradient: 'from-cyan-500 to-blue-600'
  },
  {
    id: 'food-picker',
    title: 'What Should I Eat?',
    description: 'Let fate decide your next meal',
    category: 'Fun',
    component: FoodPicker,
    gradient: 'from-rose-500 to-pink-600'
  },
  {
    id: 'dice-roller',
    title: 'Dice Roller',
    description: 'Roll dice with animated results',
    category: 'Fun',
    component: DiceRoller,
    gradient: 'from-amber-500 to-orange-600'
  },
  {
    id: 'random-picker',
    title: 'Random Picker',
    description: 'Pick randomly from your list',
    category: 'Fun',
    component: RandomPicker,
    gradient: 'from-emerald-500 to-green-600'
  },
  {
    id: 'decision-maker',
    title: 'Decision Maker',
    description: 'Get witty answers to your questions',
    category: 'Fun',
    component: DecisionMaker,
    gradient: 'from-violet-500 to-purple-600'
  },
  {
    id: 'color-mood',
    title: 'Color Mood Finder',
    description: 'Find colors that match your vibe',
    category: 'Fun',
    component: ColorMoodFinder,
    gradient: 'from-pink-500 to-rose-600'
  },
  {
    id: 'secret-message',
    title: 'Secret Message Tool',
    description: 'Encode messages in fun ways',
    category: 'Fun',
    component: SecretMessageTool,
    gradient: 'from-slate-500 to-gray-600'
  },
  {
    id: 'days-since',
    title: 'Days Since Counter',
    description: 'Count days since any date',
    category: 'Utility',
    component: DaysSinceTool,
    gradient: 'from-sky-500 to-blue-600'
  },
  {
    id: 'lucky-number',
    title: 'Lucky Number Generator',
    description: 'Generate your personal lucky number',
    category: 'Fun',
    component: LuckyNumberGenerator,
    gradient: 'from-yellow-500 to-amber-600'
  },
  {
    id: 'font-personality',
    title: 'Font Personality Matcher',
    description: 'Discover your font personality',
    category: 'Fun',
    component: FontPersonalityMatcher,
    gradient: 'from-teal-500 to-cyan-600'
  },
  {
    id: 'mocking-text',
    title: 'Mocking Text Generator',
    description: 'cReAtE mOcKiNg TeXt LiKe ThIs',
    category: 'Text',
    component: MockingTextGenerator,
    gradient: 'from-red-500 to-pink-600'
  },
  {
    id: 'mood-emoji',
    title: 'Mood Emoji Generator',
    description: 'Find the perfect emoji for your mood',
    category: 'Fun',
    component: MoodEmojiGenerator,
    gradient: 'from-orange-500 to-yellow-600'
  },
  {
    id: 'typing-speed',
    title: 'Typing Speed Meter',
    description: 'Test your typing speed with flames',
    category: 'Utility',
    component: TypingSpeedMeter,
    gradient: 'from-red-500 to-orange-600'
  },
  {
    id: 'what-if-generator',
    title: 'What If...? Generator',
    description: 'Generate mind-bending hypotheticals',
    category: 'Fun',
    component: WhatIfGenerator,
    gradient: 'from-indigo-500 to-purple-600'
  },
  {
    id: 'vibe-checker',
    title: 'Vibe Checker',
    description: 'Rate the energy of anything you type',
    category: 'Fun',
    component: VibeChecker,
    gradient: 'from-purple-500 to-pink-600'
  },
  {
    id: 'productivity-timer',
    title: 'Productivity Timer Roulette',
    description: 'Random focus sessions to beat choice paralysis',
    category: 'Utility',
    component: ProductivityTimer,
    gradient: 'from-orange-500 to-red-600'
  },
  {
    id: 'lofi-nickname',
    title: 'Lo-Fi Nickname Generator',
    description: 'Transform your name into chill lo-fi vibes',
    category: 'Fun',
    component: LoFiNicknameGenerator,
    gradient: 'from-indigo-500 to-purple-600'
  },
  {
    id: 'philosophical-quotes',
    title: 'Philosophical Quote Generator',
    description: 'Deep thoughts, but funny and relatable',
    category: 'Fun',
    component: PhilosophicalQuoteGenerator,
    gradient: 'from-gray-600 to-gray-800'
  },
  {
    id: 'life-progress',
    title: 'Life Progress Bar',
    description: 'Visualize how far you\'ve come in life',
    category: 'Utility',
    component: LifeProgressBar,
    gradient: 'from-green-500 to-blue-600'
  },
  {
    id: 'multitasker-iq',
    title: 'Multitasker IQ Checker',
    description: 'Test your ability to type two things at once',
    category: 'Fun',
    component: MultitaskerIQChecker,
    gradient: 'from-purple-500 to-blue-600'
  },
  {
    id: 'reverse-typing',
    title: 'Reverse Typing Tool',
    description: 'Watch your text reverse in real-time',
    category: 'Text',
    component: ReverseTypingTool,
    gradient: 'from-green-500 to-emerald-600'
  },
  {
    id: 'productivity-killer',
    title: 'Random Productivity Killer',
    description: 'Generate perfect excuses to stop working',
    category: 'Fun',
    component: RandomProductivityKiller,
    gradient: 'from-red-500 to-pink-600'
  },
  {
    id: 'shower-thought',
    title: 'Shower Thought Machine',
    description: 'Generate mind-bending shower thoughts',
    category: 'Fun',
    component: ShowerThoughtMachine,
    gradient: 'from-blue-500 to-cyan-600'
  },
  {
    id: 'drama-title',
    title: 'Drama Title Generator',
    description: 'Turn anything into an epic movie title',
    category: 'Fun',
    component: DramaTitleGenerator,
    gradient: 'from-purple-500 to-red-600'
  },
  {
    id: 'coin-flip',
    title: 'Overengineered Coin Flip',
    description: 'Coin flipping with quantum algorithms',
    category: 'Fun',
    component: OverengineeredCoinFlip,
    gradient: 'from-yellow-500 to-orange-600'
  },
  {
    id: 'persona-builder',
    title: 'Persona Builder',
    description: 'Create your unique persona from preferences',
    category: 'Fun',
    component: PersonaBuilder,
    gradient: 'from-indigo-500 to-purple-600'
  },
  {
    id: 'save-braincell',
    title: 'Save My Last Braincell',
    description: 'Preserve that one important thought',
    category: 'Utility',
    component: SaveMyLastBraincell,
    gradient: 'from-pink-500 to-rose-600'
  },
  {
    id: 'number-personality',
    title: 'Number Personality Test',
    description: 'Discover what kind of person your number is',
    category: 'Fun',
    component: NumberPersonalityTest,
    gradient: 'from-cyan-500 to-blue-600'
  },
  {
    id: 'code-rage',
    title: 'Code Rage Meter',
    description: 'Rate how angry bugs would make developers',
    category: 'Dev',
    component: CodeRageMeter,
    gradient: 'from-red-500 to-orange-600'
  }
];

const Index = () => {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...new Set(tools.map(tool => tool.category))];
  const filteredTools = selectedCategory === 'All' 
    ? tools 
    : tools.filter(tool => tool.category === selectedCategory);

  const toolOfTheDay = useToolOfTheDay(tools);
  const currentTool = tools.find(tool => tool.id === selectedTool);

  if (selectedTool && currentTool) {
    const ToolComponent = currentTool.component;
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <EasterEggHandler />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              onClick={() => setSelectedTool(null)}
              className="flex items-center gap-2 hover:bg-white/50"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${currentTool.gradient} text-white text-2xl font-bold mb-4 shadow-lg`}>
                {currentTool.title.charAt(0)}
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{currentTool.title}</h1>
              <p className="text-gray-600">{currentTool.description}</p>
            </div>
            
            <ToolComponent />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <EasterEggHandler />
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            One Line, One Tool
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            A collection of tiny, powerful tools. Each one does exactly what it says, 
            with a clean one-line interface.
          </p>
          
          {/* Tool of the Day */}
          <div className="mb-8">
            <Card className="max-w-md mx-auto bg-gradient-to-r from-yellow-100 to-amber-100 border-2 border-yellow-300 shadow-lg animate-pulse">
              <CardContent className="p-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="text-2xl">⭐</div>
                  <h3 className="font-bold text-yellow-800">Tool of the Day</h3>
                  <div className="text-2xl">⭐</div>
                </div>
                <Button
                  onClick={() => setSelectedTool(toolOfTheDay.id)}
                  className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-white font-semibold"
                >
                  🎯 Try {toolOfTheDay.title}
                </Button>
              </CardContent>
            </Card>
          </div>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto mb-12">
          {filteredTools.map((tool) => (
            <Card
              key={tool.id}
              className={`group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl bg-white/70 backdrop-blur-sm border-0 shadow-lg ${
                tool.id === toolOfTheDay.id ? 'ring-2 ring-yellow-400 shadow-yellow-200' : ''
              }`}
              onClick={() => setSelectedTool(tool.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${tool.gradient} flex items-center justify-center text-white font-bold text-lg shadow-md`}>
                    {tool.title.charAt(0)}
                  </div>
                  <div className="flex items-center gap-2">
                    {tool.id === toolOfTheDay.id && (
                      <div className="text-lg animate-bounce">⭐</div>
                    )}
                    <Badge variant="secondary" className="text-xs">
                      {tool.category}
                    </Badge>
                  </div>
                </div>
                <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                  {tool.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">
                  {tool.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tool Suggestion Box */}
        <div className="max-w-md mx-auto mb-12">
          <ToolSuggestionBox />
        </div>

        {/* Easter Egg Hint */}
        <div className="text-center mb-8">
          <p className="text-sm text-gray-500 italic">
            💡 Psst... try typing some keywords while browsing! 
            <br />
            (rickroll, coffee, debug, konami)
          </p>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-center gap-2 text-gray-600 mb-4">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>by Mahin</span>
          </div>
          <div className="flex items-center justify-center gap-4">
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
              <Github className="w-4 h-4 mr-2" />
              View Source
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
