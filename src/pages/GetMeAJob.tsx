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

        <div className="text-center">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4">Ready to Ace Your Interviews?</h2>
              <p className="text-muted-foreground mb-6">
                Download Get Me A Job and transform your technical interview preparation with AI-powered assistance.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" onClick={handleDownloadWindows}>
                  <Monitor className="h-4 w-4 mr-2" />
                  Download for Windows
                </Button>
                <Button variant="outline" size="lg" onClick={handleDownloadMac}>
                  <Apple className="h-4 w-4 mr-2" />
                  Download for Mac
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                This is a secret release - not advertised anywhere else
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GetMeAJob;