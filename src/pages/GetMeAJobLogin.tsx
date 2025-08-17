import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, LogIn, UserPlus, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { apiService, AuthRequest } from '@/services/apiService';

const GetMeAJobLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const navigate = useNavigate();

  // Check if already authenticated and redirect
  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      navigate('/getmeajob/dashboard');
    }
  }, [navigate]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    // Validate email
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setIsLoading(false);
      return;
    }
    
    try {
      const credentials: AuthRequest = { email, password };
      let response;

      if (isSignUpMode) {
        response = await apiService.register(credentials);
      } else {
        response = await apiService.login(credentials);
      }

      if (response.token) {
        // Store JWT token and user data
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('userEmail', response.user?.email || email);
        localStorage.setItem('userPlan', response.user?.subscription || 'free');
        
        navigate('/getmeajob/dashboard');
      } else {
        setError(response.message || 'Authentication failed');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setError('');
  };



  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8">
          <Link to="/getmeajob" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Get Me A Job
          </Link>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              {isSignUpMode ? <UserPlus className="h-5 w-5" /> : <LogIn className="h-5 w-5" />}
              {isSignUpMode ? 'Sign Up for Get Me A Job' : 'Login to Get Me A Job'}
            </CardTitle>
            <CardDescription>
              {isSignUpMode 
                ? 'Create your account to get your API token' 
                : 'Access your API token and manage your account'
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Mode Toggle */}
            <div className="flex justify-center">
              <div className="flex bg-muted rounded-lg p-1">
                <button
                  type="button"
                  onClick={() => setIsSignUpMode(false)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    !isSignUpMode 
                      ? 'bg-background text-foreground shadow-sm' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Log In
                </button>
                <button
                  type="button"
                  onClick={() => setIsSignUpMode(true)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    isSignUpMode 
                      ? 'bg-background text-foreground shadow-sm' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Sign Up
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                <AlertCircle className="h-4 w-4 text-destructive" />
                <span className="text-sm text-destructive">{error}</span>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading 
                  ? (isSignUpMode ? 'Creating Account...' : 'Signing In...') 
                  : (isSignUpMode ? 'Create Account' : 'Sign In')
                }
              </Button>
            </form>

            <div className="text-center text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
              <p><strong>Instructions:</strong></p>
              <p>After {isSignUpMode ? 'creating your account' : 'logging in'}, you'll get an API token.</p>
              <p>Copy this token and paste it into the Get Me A Job app to authenticate.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GetMeAJobLogin;