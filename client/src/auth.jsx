import React, { useState, useCallback } from 'react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Label } from './components/ui/label';
import { useNavigate } from 'react-router-dom';
import { useToast } from './hooks/use-toast';
import Navbar from './components/Navbar';
import { Eye, EyeOff, LogIn, UserCheck } from 'lucide-react';
import './auth.css';

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('login');

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleLogin = useCallback(async (e) => {
    if (!e) return;
    try {
      e.preventDefault();
    } catch (error) {
      console.error("Error calling e.preventDefault() in handleLogin:", error);
    }

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: loginEmail,
          password: loginPassword
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Login failed');
      }

      const data = await response.json();
      // Store token in localStorage or context as needed
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);

      toast({
        title: "Login successful",
        description: "Welcome back to CodeForge!"
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [loginEmail, loginPassword, navigate, toast]);

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (signupPassword !== signupConfirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/signup/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: signupName,
          email: signupEmail,
          password: signupPassword,
          password2: signupConfirmPassword
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(Object.values(errorData).flat().join(' ') || 'Signup failed');
      }

      toast({
        title: "Account created",
        description: "Welcome to CodeForge! Your account has been created successfully."
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Signup failed",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <Navbar/>
      <div className="auth-background-pattern" />
      <div className="auth-circle top-1/4 -left-20 bg-emerald-400" />
      <div className="auth-circle top-3/4 -right-20 bg-emerald-300 animation-delay-2000" />
      <div className="auth-circle bottom-1/4 left-1/2 transform -translate-x-1/2 bg-emerald-200 animation-delay-4000" />

      <div className="auth-card-wrapper">
        <Card className="auth-card">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="auth-card-title">
              <span className="auth-card-title-gradient">CodeForge</span>
            </CardTitle>
            <CardDescription>
              Join our community of developers
            </CardDescription>
          </CardHeader>

          <Tabs
            defaultValue="login"
            className="w-full"
            onValueChange={(value) => setActiveTab(value)}
          >
            <TabsList className="auth-tabs-list">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign up</TabsTrigger>
            </TabsList>

            {activeTab === 'login' && (
              <TabsContent value="login">
                <form onSubmit={handleLogin}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        className="auth-input"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="auth-label-forgot">
                        <Label htmlFor="password">Password</Label>
                        <a href="#" className="auth-forgot-password">Forgot password?</a>
                      </div>
                      <div className="auth-password-input-wrapper">
                        <Input
                          id="password"
                          type={showLoginPassword ? "text" : "password"}
                          required
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          className="auth-input auth-password-input"
                        />
                        <button
                          type="button"
                          onClick={() => setShowLoginPassword(!showLoginPassword)}
                          className="auth-password-toggle-button"
                        >
                          {showLoginPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="auth-button" disabled={isLoading}>
                      {isLoading ? (
                        <div className="auth-loading-button">
                          <div className="auth-spinner" />
                          <span>Logging in...</span>
                        </div>
                      ) : (
                        <div className="auth-login-button">
                          <LogIn size={18} />
                          <span>Login</span>
                        </div>
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </TabsContent>
            )}

            {activeTab === 'signup' && (
              <TabsContent value="signup">
                <form onSubmit={handleSignup}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        required
                        value={signupName}
                        onChange={(e) => setSignupName(e.target.value)}
                        className="auth-input"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="m@example.com"
                        required
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        className="auth-input"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <div className="auth-password-input-wrapper">
                        <Input
                          id="signup-password"
                          type={showSignupPassword ? "text" : "password"}
                          required
                          value={signupPassword}
                          onChange={(e) => setSignupPassword(e.target.value)}
                          className="auth-input auth-password-input"
                        />
                        <button
                          type="button"
                          onClick={() => setShowSignupPassword(!showSignupPassword)}
                          className="auth-password-toggle-button"
                        >
                          {showSignupPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <div className="auth-password-input-wrapper">
                        <Input
                          id="confirm-password"
                          type={showConfirmPassword ? "text" : "password"}
                          required
                          value={signupConfirmPassword}
                          onChange={(e) => setSignupConfirmPassword(e.target.value)}
                          className="auth-input auth-password-input"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="auth-password-toggle-button"
                        >
                          {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="auth-button" disabled={isLoading}>
                      {isLoading ? (
                        <div className="auth-loading-button">
                          <div className="auth-spinner" />
                          <span>Creating Account...</span>
                        </div>
                      ) : (
                        <div className="auth-signup-button">
                          <UserCheck size={18} />
                          <span>Create Account</span>
                        </div>
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </TabsContent>
            )}
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
