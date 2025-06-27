
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
  }
];

const Index = () => {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...new Set(tools.map(tool => tool.category))];
  const filteredTools = selectedCategory === 'All' 
    ? tools 
    : tools.filter(tool => tool.category === selectedCategory);

  const currentTool = tools.find(tool => tool.id === selectedTool);

  if (selectedTool && currentTool) {
    const ToolComponent = currentTool.component;
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {filteredTools.map((tool) => (
            <Card
              key={tool.id}
              className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl bg-white/70 backdrop-blur-sm border-0 shadow-lg"
              onClick={() => setSelectedTool(tool.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${tool.gradient} flex items-center justify-center text-white font-bold text-lg shadow-md`}>
                    {tool.title.charAt(0)}
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {tool.category}
                  </Badge>
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

        {/* Footer */}
        <div className="text-center mt-16 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-center gap-2 text-gray-600 mb-4">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>for productivity</span>
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
