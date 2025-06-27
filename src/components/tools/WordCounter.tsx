
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { FileText, Hash, Paragraph, Clock } from "lucide-react";

export const WordCounter = () => {
  const [text, setText] = useState('');

  const getStats = () => {
    if (!text.trim()) {
      return {
        characters: 0,
        charactersNoSpaces: 0,
        words: 0,
        paragraphs: 0,
        sentences: 0,
        readingTime: 0
      };
    }

    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, '').length;
    const words = text.trim().split(/\s+/).length;
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length;
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const readingTime = Math.ceil(words / 200); // Average reading speed: 200 words per minute

    return {
      characters,
      charactersNoSpaces,
      words,
      paragraphs,
      sentences,
      readingTime
    };
  };

  const stats = getStats();

  return (
    <div className="space-y-6">
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Type or paste your text here
              </label>
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Start typing to see live statistics..."
                rows={8}
                className="resize-none"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <FileText className="w-5 h-5 text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.words}</div>
            <div className="text-xs text-gray-600">Words</div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Hash className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.characters}</div>
            <div className="text-xs text-gray-600">Characters</div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Hash className="w-5 h-5 text-purple-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.charactersNoSpaces}</div>
            <div className="text-xs text-gray-600">No Spaces</div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Paragraph className="w-5 h-5 text-orange-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.paragraphs}</div>
            <div className="text-xs text-gray-600">Paragraphs</div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <FileText className="w-5 h-5 text-red-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.sentences}</div>
            <div className="text-xs text-gray-600">Sentences</div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Clock className="w-5 h-5 text-teal-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.readingTime}</div>
            <div className="text-xs text-gray-600">Min Read</div>
          </CardContent>
        </Card>
      </div>

      {text && (
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">
                Average word length: {stats.words > 0 ? (stats.charactersNoSpaces / stats.words).toFixed(1) : 0} chars
              </Badge>
              <Badge variant="secondary">
                Average sentence length: {stats.sentences > 0 ? (stats.words / stats.sentences).toFixed(1) : 0} words
              </Badge>
              {stats.readingTime > 0 && (
                <Badge variant="secondary">
                  Reading time: {stats.readingTime} minute{stats.readingTime !== 1 ? 's' : ''}
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
