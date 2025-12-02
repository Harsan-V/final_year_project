import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface LoginPageProps {
  onNavigate: (page: string) => void;
  onLogin: (user: any) => void;
}

export function LoginPage({ onNavigate, onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login
    setTimeout(() => {
      onLogin({ email, name: 'John Doe' });
      onNavigate('home');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#1E88E5] items-center justify-center p-12">
        <div className="max-w-lg text-center">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1659080910989-e98b93846605?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXd5ZXIlMjBjbGllbnQlMjBjb25zdWx0YXRpb24lMjBpbGx1c3RyYXRpb258ZW58MXx8fHwxNzU5NzcyMTIxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Lawyer and client consultation"
            className="w-full h-80 object-cover rounded-lg shadow-lg mb-8"
          />
          <h2 className="text-white text-3xl font-medium mb-4">
            Professional Legal Assistance
          </h2>
          <p className="text-blue-100 text-lg">
            Connect with verified lawyers and get instant AI-powered legal guidance
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl text-[#263238] mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to your account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#263238]">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 border-gray-300 focus:border-[#1E88E5] focus:ring-[#1E88E5] transition-colors"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#263238]">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-12 border-gray-300 focus:border-[#1E88E5] focus:ring-[#1E88E5] transition-colors"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-[#1E88E5] hover:bg-[#1565C0] text-white rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
            >
              {isLoading ? 'Signing in...' : 'Login'}
            </Button>
          </form>

          <div className="mt-6 text-center space-y-4">
            <button 
              onClick={() => alert('Password reset functionality would be implemented')}
              className="text-[#1E88E5] hover:text-[#1565C0] transition-colors"
            >
              Forgot Password?
            </button>
            
            <p className="text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={() => onNavigate('signup')}
                className="text-[#1E88E5] hover:text-[#1565C0] transition-colors underline"
              >
                Sign up here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}