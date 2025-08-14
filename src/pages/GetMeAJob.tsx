import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Download, Camera, Mic, MessageSquare, Zap, Brain, Eye, Keyboard, Settings, Monitor, Apple } from 'lucide-react';
import { Link } from 'react-router-dom';

const GetMeAJob = () => {
  const handleDownloadWindows = () => {
    // Google Drive direct download link
    window.open('https://drive.google.com/uc?export=download&id=1OXztpgwmgcDPBdBLs6uk1hnvgpG9cKRg', '_blank');
  };

  const handleDownloadMac = () => {
    // Google Drive direct download link
    window.open('https://drive.google.com/uc?export=download&id=1F1NDoqmmv2S94qnrqYoI5ETcRkmkqwFD', '_blank');
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Back to Portfolio
            </Link>
            <Badge variant="secondary" className="px-3 py-1">Secret Release</Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center border-4 border-primary/20">
              <Brain className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">Get Me A Job 🚀</h1>
          <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
            A powerful AI-powered technical interview assistant that helps developers prepare for coding interviews.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <Badge variant="secondary" className="px-3 py-1">AI-Powered</Badge>
            <Badge variant="secondary" className="px-3 py-1">Multi-Modal</Badge>
            <Badge variant="secondary" className="px-3 py-1">Desktop App</Badge>
            <Badge variant="secondary" className="px-3 py-1">Secret Release</Badge>
          </div>
        </div>

        <Card className="mb-8 bg-primary/5 border-primary/20">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <Download className="h-5 w-5" />
              Download Now
            </CardTitle>
            <CardDescription>Choose your platform and start acing technical interviews</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <Button onClick={handleDownloadWindows} size="lg" className="h-16 flex items-center gap-4">
                <Monitor className="h-6 w-6" />
                <div className="text-left">
                  <div className="font-semibold">Windows</div>
                  <div className="text-sm opacity-90">GetMeAJob-Windows.exe</div>
                </div>
              </Button>
              <Button onClick={handleDownloadMac} size="lg" variant="outline" className="h-16 flex items-center gap-4">
                <Apple className="h-6 w-6" />
                <div className="text-left">
                  <div className="font-semibold">macOS</div>
                  <div className="text-sm opacity-70">GetMeAJob-Mac.dmg</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Core Features */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Core Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-3">
                  <Camera className="h-6 w-6 text-primary" />
                  <h3 className="font-semibold">Screenshot Analysis</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Capture coding problems and get instant solutions with Llama 4 Scout 17B
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-3">
                  <Mic className="h-6 w-6 text-primary" />
                  <h3 className="font-semibold">Voice Input</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Record questions (up to 20MB/~8-12 minutes) with Whisper Large V3 + GPT OSS 120B
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-3">
                  <MessageSquare className="h-6 w-6 text-primary" />
                  <h3 className="font-semibold">Smart Text Input</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Type questions with conversation memory and context awareness
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-3">
                  <Eye className="h-6 w-6 text-primary" />
                  <h3 className="font-semibold">Contextual Questions</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Ask specific questions about screenshots with AI context
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-3">
                  <Zap className="h-6 w-6 text-primary" />
                  <h3 className="font-semibold">Fast Processing</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  2-3x faster responses with specialized model architecture
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-3">
                  <Brain className="h-6 w-6 text-primary" />
                  <h3 className="font-semibold">Multi-Model AI</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Uses specialized Groq models for optimal performance
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Keyboard Shortcuts */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Keyboard className="h-5 w-5" />
              Keyboard Shortcuts
            </CardTitle>
            <CardDescription>Master these shortcuts for lightning-fast workflow</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/20">
                  <span className="text-sm">Take screenshot</span>
                  <Badge variant="outline">Ctrl/Cmd + H</Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/20">
                  <span className="text-sm">Toggle voice recording</span>
                  <Badge variant="outline">Ctrl/Cmd + M</Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/20">
                  <span className="text-sm">Open text input</span>
                  <Badge variant="outline">Ctrl/Cmd + T</Badge>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/20">
                  <span className="text-sm">Toggle window visibility</span>
                  <Badge variant="outline">Ctrl/Cmd + B</Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/20">
                  <span className="text-sm">Complete reset</span>
                  <Badge variant="outline">Ctrl/Cmd + R</Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/20">
                  <span className="text-sm">Process screenshots</span>
                  <Badge variant="outline">Ctrl/Cmd + Enter</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Roadmap */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Roadmap v2.0 - Stealth & Enhanced UX
            </CardTitle>
            <CardDescription>Upcoming features in development</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span className="text-sm">Login/Logout System</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span className="text-sm">Language Preferences</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span className="text-sm">Continuous Listening</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span className="text-sm">Arrow Key Selection</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span className="text-sm">Stealth Mode Toggle</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span className="text-sm">Settings Panel</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span className="text-sm">Custom Shortcuts</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span className="text-sm">Local AI Integration</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span className="text-sm">Better Labels</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span className="text-sm">Configuration Website</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GetMeAJob;