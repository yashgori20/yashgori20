import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Copy, Check, RefreshCw, LogOut, Key, Crown, Zap, Star, CreditCard, TrendingUp } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { apiService } from '@/services/apiService';

const GetMeAJobDashboard = () => {
  const [token, setToken] = useState('');
  const [copied, setCopied] = useState(false);
  const [isTokenLoading, setIsTokenLoading] = useState(true);
  const [userEmail, setUserEmail] = useState('');
  const [userPlan, setUserPlan] = useState<'free' | 'pro'>('free');
  const navigate = useNavigate();

  useEffect(() => {
    initializeDashboard();
  }, [navigate]);

  const initializeDashboard = async () => {
    setIsTokenLoading(true);
    
    try {
      const authToken = localStorage.getItem('authToken');
      const savedEmail = localStorage.getItem('userEmail');
      const savedPlan = localStorage.getItem('userPlan') as 'free' | 'pro';

      if (!authToken) {
        navigate('/getmeajob/login');
        return;
      }

      // Set the token (it's the JWT from backend)
      setToken(authToken);
      
      // Set user data from localStorage
      if (savedEmail) {
        setUserEmail(savedEmail);
      }
      
      if (savedPlan) {
        setUserPlan(savedPlan);
      }

      // Verify token with backend and get fresh subscription data
      try {
        const verifyResponse = await apiService.verifyToken(authToken);
        if (verifyResponse.success && verifyResponse.user) {
          setUserEmail(verifyResponse.user.email);
          setUserPlan(verifyResponse.user.subscription);
          
          // Update localStorage with fresh data
          localStorage.setItem('userEmail', verifyResponse.user.email);
          localStorage.setItem('userPlan', verifyResponse.user.subscription);
        }
      } catch (verifyError) {
        console.log('Token verification failed, using cached data');
      }
      
    } catch (error) {
      console.error('Dashboard initialization error:', error);
      navigate('/getmeajob/login');
    } finally {
      setIsTokenLoading(false);
    }
  };

  const copyToken = async () => {
    try {
      await navigator.clipboard.writeText(token);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Copy failed:', error);
    }
  };

  const regenerateToken = async () => {
    setIsTokenLoading(true);
    try {
      const currentToken = localStorage.getItem('authToken');
      if (!currentToken) {
        navigate('/getmeajob/login');
        return;
      }

      // For now, we'll keep the same token since regeneration 
      // would require a new API endpoint. The token is valid until logout.
      setToken(currentToken);
      console.log('Token refreshed');
    } catch (error) {
      console.error('Token regeneration error:', error);
    } finally {
      setIsTokenLoading(false);
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userPlan');
    localStorage.removeItem('userEmail');
    navigate('/getmeajob/login');
  };

  const handleUpgrade = async (plan: 'free' | 'pro' | 'enterprise') => {
    // For demo, just update the plan in localStorage
    // In real implementation, this would call a subscription API
    localStorage.setItem('userPlan', plan);
    setUserPlan(plan as 'free' | 'pro');
  };

  // Get current subscription type
  const getCurrentSubscription = () => {
    return userPlan;
  };

  const getPlanDetails = (plan: string) => {
    switch (plan) {
      case 'pro':
        return { name: 'Pro Plan', icon: Zap, color: 'text-blue-500', limit: '1,000' };
      case 'enterprise':
        return { name: 'Enterprise', icon: Crown, color: 'text-purple-500', limit: 'Unlimited' };
      default:
        return { name: 'Free Tier', icon: Star, color: 'text-yellow-500', limit: '100' };
    }
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
            <Button variant="outline" size="sm" onClick={handleLogout} className="flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center border-2 border-primary/20">
              <Key className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your Get Me A Job API access
          </p>
        </div>

        <div className="space-y-6">
          {/* User Information */}
          {userEmail && (
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Account Information
                </CardTitle>
                <CardDescription>
                  Your Get Me A Job account details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Email:</span>
                    <span className="text-sm">{userEmail}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Subscription:</span>
                    <Badge variant={userPlan === 'pro' ? 'default' : 'secondary'} className="flex items-center gap-1">
                      {userPlan === 'pro' ? (
                        <>
                          <Crown className="h-3 w-3" />
                          You are a Pro user
                        </>
                      ) : (
                        <>
                          <Star className="h-3 w-3" />
                          You are on Free tier
                        </>
                      )}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                Your API Token
              </CardTitle>
              <CardDescription>
                Copy this token and paste it into the Get Me A Job desktop app to authenticate
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="token-section">
                <div className="token-display space-y-3">
                  <div className="relative">
                    <Input
                      type="text"
                      value={isTokenLoading ? 'Loading...' : token}
                      readOnly
                      className="pr-12 font-mono text-sm"
                    />
                    <Button
                      onClick={copyToken}
                      size="sm"
                      variant="ghost"
                      className="absolute right-1 top-1 h-8 w-8 p-0"
                      disabled={isTokenLoading}
                    >
                      {copied ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      onClick={copyToken}
                      variant="default"
                      size="sm"
                      disabled={isTokenLoading}
                      className="flex-1"
                    >
                      {copied ? (
                        <>
                          <Check className="h-4 w-4 mr-2" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 mr-2" />
                          Copy Token
                        </>
                      )}
                    </Button>
                    
                    <Button
                      onClick={regenerateToken}
                      variant="outline"
                      size="sm"
                      disabled={isTokenLoading}
                    >
                      <RefreshCw className={`h-4 w-4 mr-2 ${isTokenLoading ? 'animate-spin' : ''}`} />
                      Regenerate
                    </Button>
                  </div>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-sm text-muted-foreground instructions">
                  <strong>Instructions:</strong>
                </p>
                <ol className="text-sm text-muted-foreground mt-2 space-y-1 list-decimal list-inside">
                  <li>Copy the token above</li>
                  <li>Open the Get Me A Job desktop app</li>
                  <li>Go to Settings ⚙️ and click "Login"</li>
                  <li>Paste the token in the overlay box</li>
                  <li>Press "Login" to authenticate</li>
                </ol>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Usage Information</CardTitle>
              <CardDescription>
                Your current API usage and limits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-secondary/20 rounded-lg">
                  <div className="text-2xl font-bold text-primary">0</div>
                  <div className="text-sm text-muted-foreground">Requests Today</div>
                </div>
                <div className="text-center p-4 bg-secondary/20 rounded-lg">
                  <div className="text-2xl font-bold text-primary">
                    {getPlanDetails(getCurrentSubscription()).limit}
                  </div>
                  <div className="text-sm text-muted-foreground">Daily Limit</div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Current Plan:</span>
                <Badge variant="secondary" className="flex items-center gap-1">
                  {React.createElement(getPlanDetails(getCurrentSubscription()).icon, { className: `h-3 w-3 ${getPlanDetails(getCurrentSubscription()).color}` })}
                  {getPlanDetails(getCurrentSubscription()).name}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Upgrade Plans */}
          {getCurrentSubscription() === 'free' && (
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Upgrade Your Plan
                </CardTitle>
                <CardDescription>
                  Get more API requests and advanced features
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Pro Plan */}
                  <Card className="border-2 border-primary">
                    <CardHeader className="text-center pb-4">
                      <CardTitle className="flex items-center justify-center gap-2">
                        <Zap className="h-5 w-5 text-blue-500" />
                        Pro Plan
                      </CardTitle>
                      <div className="text-2xl font-bold">$19<span className="text-sm font-normal text-muted-foreground">/month</span></div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <ul className="space-y-1 text-sm">
                        <li>• 1,000 API requests/day</li>
                        <li>• Advanced multi-modal analysis</li>
                        <li>• Priority response time</li>
                        <li>• Voice input (20MB limit)</li>
                        <li>• Email support</li>
                      </ul>
                      <Button 
                        className="w-full"
                        onClick={() => handleUpgrade('pro')}
                      >
                        <CreditCard className="h-4 w-4 mr-2" />
                        Upgrade to Pro
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Enterprise Plan */}
                  <Card className="border-2">
                    <CardHeader className="text-center pb-4">
                      <CardTitle className="flex items-center justify-center gap-2">
                        <Crown className="h-5 w-5 text-purple-500" />
                        Enterprise
                      </CardTitle>
                      <div className="text-2xl font-bold">$99<span className="text-sm font-normal text-muted-foreground">/month</span></div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <ul className="space-y-1 text-sm">
                        <li>• Unlimited API requests</li>
                        <li>• Custom model fine-tuning</li>
                        <li>• Instant response time</li>
                        <li>• Advanced voice features</li>
                        <li>• Priority support & training</li>
                        <li>• Custom integrations</li>
                      </ul>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => handleUpgrade('enterprise')}
                      >
                        <CreditCard className="h-4 w-4 mr-2" />
                        Contact Sales
                      </Button>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="text-center text-xs text-muted-foreground mt-4">
                  <p>All plans include 7-day free trial • Cancel anytime • Secure payments powered by Stripe</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Current Plan Details for Pro/Enterprise */}
          {getCurrentSubscription() !== 'free' && (
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {React.createElement(getPlanDetails(getCurrentSubscription()).icon, { className: `h-5 w-5 ${getPlanDetails(getCurrentSubscription()).color}` })}
                  {getPlanDetails(getCurrentSubscription()).name}
                </CardTitle>
                <CardDescription>
                  You're on our {getCurrentSubscription()} plan with premium features
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Daily API Limit:</span>
                    <Badge variant="outline">{getPlanDetails(getCurrentSubscription()).limit} requests</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Response Priority:</span>
                    <Badge variant="outline">{getCurrentSubscription() === 'enterprise' ? 'Instant' : 'Priority'}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Support Level:</span>
                    <Badge variant="outline">{getCurrentSubscription() === 'enterprise' ? 'Priority + Training' : 'Email Support'}</Badge>
                  </div>
                  
                  {getCurrentSubscription() === 'pro' && (
                    <div className="pt-4 border-t">
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => handleUpgrade('enterprise')}
                      >
                        <Crown className="h-4 w-4 mr-2" />
                        Upgrade to Enterprise
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>
                Keep your API token secure
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• Never share your API token with anyone</p>
                <p>• Use environment variables in production</p>
                <p>• Regenerate your token if you suspect it's compromised</p>
                <p>• The token expires after 90 days of inactivity</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GetMeAJobDashboard;