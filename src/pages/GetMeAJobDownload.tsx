import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Download, Monitor, Smartphone, Calendar, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const GetMeAJobDownload = () => {
  const currentVersion = "v0.1.0";
  
  const versions = [
    {
      version: "v0.1.0",
      date: "2024-01-15",
      isCurrent: true,
      releaseNotes: "Initial release with core AI features and voice processing",
      downloads: {
        windows: "https://yashgori20.vercel.app/downloads/GetMeAJob-v0.1.0-windows.exe",
        mac: "https://yashgori20.vercel.app/downloads/GetMeAJob-v0.1.0-mac.dmg",
        linux: "https://yashgori20.vercel.app/downloads/GetMeAJob-v0.1.0-linux.AppImage"
      }
    }
  ];

  const handleDownload = (url: string, platform: string) => {
    // Track download
    console.log(`Downloading ${platform} version from: ${url}`);
    
    // Open download link
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/getmeajob" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Back to Get Me A Job
            </Link>
            <Badge variant="outline" className="bg-primary/10">
              Latest: {currentVersion}
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center border-2 border-primary/20">
              <Download className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">Download Get Me A Job</h1>
          <p className="text-muted-foreground">
            Get the desktop app to unlock AI-powered job application assistance
          </p>
        </div>

        <div className="space-y-6">
          {/* Current Version */}
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="h-5 w-5" />
                    Get Me A Job {currentVersion}
                  </CardTitle>
                  <CardDescription>
                    Latest stable release - Recommended for all users
                  </CardDescription>
                </div>
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  Current
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                {/* Windows */}
                <Card className="border-2 hover:border-primary/30 transition-colors">
                  <CardContent className="p-4 text-center">
                    <Monitor className="h-8 w-8 mx-auto mb-3 text-blue-500" />
                    <h3 className="font-semibold mb-2">Windows</h3>
                    <p className="text-sm text-muted-foreground mb-4">Windows 10/11 (64-bit)</p>
                    <Button 
                      className="w-full"
                      onClick={() => handleDownload(versions[0].downloads.windows, 'Windows')}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download .exe
                    </Button>
                  </CardContent>
                </Card>

                {/* macOS */}
                <Card className="border-2 hover:border-primary/30 transition-colors">
                  <CardContent className="p-4 text-center">
                    <Smartphone className="h-8 w-8 mx-auto mb-3 text-gray-600" />
                    <h3 className="font-semibold mb-2">macOS</h3>
                    <p className="text-sm text-muted-foreground mb-4">macOS 10.15+ (Intel/Apple Silicon)</p>
                    <Button 
                      className="w-full"
                      onClick={() => handleDownload(versions[0].downloads.mac, 'macOS')}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download .dmg
                    </Button>
                  </CardContent>
                </Card>

                {/* Linux */}
                <Card className="border-2 hover:border-primary/30 transition-colors">
                  <CardContent className="p-4 text-center">
                    <Monitor className="h-8 w-8 mx-auto mb-3 text-orange-500" />
                    <h3 className="font-semibold mb-2">Linux</h3>
                    <p className="text-sm text-muted-foreground mb-4">Ubuntu 18.04+ / Any modern distro</p>
                    <Button 
                      className="w-full"
                      onClick={() => handleDownload(versions[0].downloads.linux, 'Linux')}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download .AppImage
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-semibold mb-2">What's in this version:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• AI-powered resume analysis and job matching</li>
                  <li>• Voice-to-text interview practice</li>
                  <li>• Automated application tracking</li>
                  <li>• Real-time job market insights</li>
                  <li>• Secure authentication with API tokens</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Version History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Version History
              </CardTitle>
              <CardDescription>
                Previous releases and release notes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {versions.map((version) => (
                  <div key={version.version} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold">{version.version}</h3>
                        {version.isCurrent && (
                          <Badge variant="secondary" className="text-xs">
                            Current
                          </Badge>
                        )}
                      </div>
                      <span className="text-sm text-muted-foreground">{version.date}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {version.releaseNotes}
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDownload(version.downloads.windows, 'Windows')}
                      >
                        Windows
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDownload(version.downloads.mac, 'macOS')}
                      >
                        macOS
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDownload(version.downloads.linux, 'Linux')}
                      >
                        Linux
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Installation Instructions */}
          <Card>
            <CardHeader>
              <CardTitle>Installation Instructions</CardTitle>
              <CardDescription>
                How to install and set up Get Me A Job on your system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Monitor className="h-4 w-4 text-blue-500" />
                    Windows
                  </h4>
                  <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                    <li>Download the .exe file</li>
                    <li>Right-click and "Run as administrator"</li>
                    <li>Follow the installation wizard</li>
                    <li>Launch from Start Menu</li>
                  </ol>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Smartphone className="h-4 w-4 text-gray-600" />
                    macOS
                  </h4>
                  <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                    <li>Download the .dmg file</li>
                    <li>Open and drag to Applications</li>
                    <li>Right-click and "Open" first time</li>
                    <li>Allow in Security & Privacy if prompted</li>
                  </ol>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Monitor className="h-4 w-4 text-orange-500" />
                    Linux
                  </h4>
                  <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                    <li>Download the .AppImage file</li>
                    <li>Make executable: <code>chmod +x</code></li>
                    <li>Double-click to run</li>
                    <li>Or run from terminal</li>
                  </ol>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm">
                  <strong>Next Steps:</strong> After installation, go to{' '}
                  <Link to="/getmeajob/login" className="text-primary hover:underline">
                    Login Page
                  </Link>
                  {' '}to get your authentication token and connect your account.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GetMeAJobDownload;