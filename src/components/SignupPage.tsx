import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface SignupPageProps {
  onNavigate: (page: string) => void;
  onSignup: (user: any) => void;
}

export function SignupPage({ onNavigate, onSignup }: SignupPageProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors([]);
  };

  const validateForm = () => {
    const newErrors: string[] = [];
    
    if (!formData.fullName.trim()) newErrors.push('Full name is required');
    if (!formData.email.trim()) newErrors.push('Email is required');
    if (formData.password.length < 6) newErrors.push('Password must be at least 6 characters');
    if (formData.password !== formData.confirmPassword) newErrors.push('Passwords do not match');
    if (!formData.role) newErrors.push('Please select a role');
    
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate signup
    setTimeout(() => {
      onSignup({ 
        email: formData.email, 
        name: formData.fullName, 
        role: formData.role 
      });
      onNavigate('home');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-[#F5F7FA] to-[#E3F2FD]">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 animate-in fade-in duration-500">
        <div className="text-center mb-8">
          <h1 className="text-3xl text-[#263238] mb-2">Create Account</h1>
          <p className="text-gray-600">Join Virtual Legal Assistant</p>
        </div>

        {errors.length > 0 && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            {errors.map((error, index) => (
              <p key={index} className="text-red-600 text-sm">{error}</p>
            ))}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-[#263238]">Full Name</Label>
            <Input
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              className="h-12 border-gray-300 focus:border-[#1E88E5] focus:ring-[#1E88E5] transition-colors"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-[#263238]">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="h-12 border-gray-300 focus:border-[#1E88E5] focus:ring-[#1E88E5] transition-colors"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-[#263238]">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              className="h-12 border-gray-300 focus:border-[#1E88E5] focus:ring-[#1E88E5] transition-colors"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-[#263238]">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(e) => handleChange('confirmPassword', e.target.value)}
              className="h-12 border-gray-300 focus:border-[#1E88E5] focus:ring-[#1E88E5] transition-colors"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-[#263238]">Role</Label>
            <Select onValueChange={(value) => handleChange('role', value)}>
              <SelectTrigger className="h-12 border-gray-300 focus:border-[#1E88E5] focus:ring-[#1E88E5]">
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">User (Seeking Legal Help)</SelectItem>
                <SelectItem value="lawyer">Lawyer (Legal Professional)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-[#1E88E5] hover:bg-[#1565C0] text-white rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
          >
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <button
              onClick={() => onNavigate('login')}
              className="text-[#1E88E5] hover:text-[#1565C0] transition-colors underline"
            >
              Login here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}