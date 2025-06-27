
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const SecretMessageTool = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'caesar' | 'emoji' | 'pirate'>('caesar');
  const { toast } = useToast();

  const caesarCipher = (text: string, shift: number = 3) => {
    return text.replace(/[a-zA-Z]/g, (char) => {
      const start = char <= 'Z' ? 65 : 97;
      return String.fromCharCode((char.charCodeAt(0) - start + shift) % 26 + start);
    });
  };

  const emojiEncode = (text: string) => {
    const emojiMap: { [key: string]: string } = {
      a: '🍎', b: '🌊', c: '🎵', d: '🐶', e: '🌟', f: '🔥', g: '🌿', h: '🏠',
      i: '🍦', j: '🃏', k: '🔑', l: '🦁', m: '🌙', n: '🎯', o: '🐙', p: '🍕',
      q: '👑', r: '🌈', s: '🌞', t: '🌳', u: '☂️', v: '🌋', w: '🐋', x: '❌',
      y: '💛', z: '⚡', ' ': '🌌'
    };
    
    return text.toLowerCase().split('').map(char => emojiMap[char] || char).join('');
  };

  const pirateSpeakEncode = (text: string) => {
    const pirateMap: { [key: string]: string } = {
      hello: 'ahoy',
      hi: 'ahoy',
      yes: 'aye',
      you: 'ye',
      your: 'yer',
      my: 'me',
      are: 'be',
      is: 'be',
      the: 'th\'',
      and: 'an\'',
      to: 'ta',
      over: 'o\'er',
      for: 'fer',
      between: 'betwixt'
    };
    
    let result = text.toLowerCase();
    Object.entries(pirateMap).forEach(([key, value]) => {
      result = result.replace(new RegExp(`\\b${key}\\b`, 'g'), value);
    });
    
    return result + ' arrr!';
  };

  const encodeMessage = () => {
    if (!input.trim()) {
      toast({
        title: "Error",
        description: "Please enter a message to encode",
        variant: "destructive"
      });
      return;
    }

    let encoded = '';
    switch (mode) {
      case 'caesar':
        encoded = caesarCipher(input);
        break;
      case 'emoji':
        encoded = emojiEncode(input);
        break;
      case 'pirate':
        encoded = pirateSpeakEncode(input);
        break;
    }
    
    setOutput(encoded);
    toast({
      title: "🕵️ Message encoded!",
      description: "Your secret message is ready"
    });
  };

  const copyOutput = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Secret message copied to clipboard"
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
              <div className="text-4xl mb-2">🕵️</div>
              <h3 className="text-xl font-semibold text-gray-900">
                Secret Message Encoder
              </h3>
            </div>

            <div className="flex justify-center gap-2 mb-4">
              <Button
                variant={mode === 'caesar' ? "default" : "outline"}
                size="sm"
                onClick={() => setMode('caesar')}
              >
                Caesar Cipher
              </Button>
              <Button
                variant={mode === 'emoji' ? "default" : "outline"}
                size="sm"
                onClick={() => setMode('emoji')}
              >
                Emoji Code
              </Button>
              <Button
                variant={mode === 'pirate' ? "default" : "outline"}
                size="sm"
                onClick={() => setMode('pirate')}
              >
                Pirate Speak
              </Button>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Your Secret Message
              </label>
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter your secret message here..."
                rows={4}
                className="resize-none"
              />
            </div>
            
            <Button 
              onClick={encodeMessage}
              disabled={!input.trim()}
              className="w-full bg-gradient-to-r from-slate-500 to-gray-600 hover:from-slate-600 hover:to-gray-700"
            >
              <Eye className="w-4 h-4 mr-2" />
              Encode Message
            </Button>
          </div>
        </CardContent>
      </Card>

      {output && (
        <Card className="bg-white/80 backdrop-blur-sm border-l-4 border-l-slate-500">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Encoded Message
                </label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyOutput}
                  className="flex items-center gap-2"
                >
                  <Copy className="w-4 h-4" />
                  Copy
                </Button>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-800 leading-relaxed font-mono break-all">
                  {output}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
