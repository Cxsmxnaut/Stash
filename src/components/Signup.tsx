import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Card } from './Card';
import { Button } from './Button';
import { ThemeToggle } from './ThemeToggle';
import { useAuth } from '../contexts/AuthContext';

interface SignupProps {
  onSwitchToLogin: () => void;
}

export function Signup({ onSwitchToLogin }: SignupProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await signup(name, email, password);
    } catch (err) {
      setError('Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7] dark:bg-[#111111] flex items-center justify-center p-5 transition-colors">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-[32px] font-semibold text-[#111111] dark:text-white mb-2">
              Create account ✨
            </h1>
            <p className="text-[#8E8E93] dark:text-[#A0A0A0]">
              Start managing your finances
            </p>
          </div>
          <ThemeToggle />
        </div>

        {/* Signup Card */}
        <Card className="mb-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-[#111111] dark:text-white font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Wayne Smith"
                required
                className="w-full px-4 py-3 rounded-2xl bg-[#F7F7F7] dark:bg-[#2A2A2A] border-none text-[#111111] dark:text-white placeholder:text-[#8E8E93] dark:placeholder:text-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-[#111111] dark:focus:ring-white transition-colors"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-[#111111] dark:text-white font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="wayne@example.com"
                required
                className="w-full px-4 py-3 rounded-2xl bg-[#F7F7F7] dark:bg-[#2A2A2A] border-none text-[#111111] dark:text-white placeholder:text-[#8E8E93] dark:placeholder:text-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-[#111111] dark:focus:ring-white transition-colors"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-[#111111] dark:text-white font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  required
                  className="w-full px-4 py-3 pr-12 rounded-2xl bg-[#F7F7F7] dark:bg-[#2A2A2A] border-none text-[#111111] dark:text-white placeholder:text-[#8E8E93] dark:placeholder:text-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-[#111111] dark:focus:ring-white transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8E8E93] dark:text-[#A0A0A0] hover:text-[#111111] dark:hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-[#111111] dark:text-white font-medium mb-2">
                Confirm Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter your password"
                required
                className="w-full px-4 py-3 rounded-2xl bg-[#F7F7F7] dark:bg-[#2A2A2A] border-none text-[#111111] dark:text-white placeholder:text-[#8E8E93] dark:placeholder:text-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-[#111111] dark:focus:ring-white transition-colors"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 rounded-2xl bg-red-500/10 text-red-500 text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <Button type="submit" className={loading ? 'opacity-50' : ''}>
              {loading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>
        </Card>

        {/* Login Link */}
        <div className="text-center">
          <p className="text-[#8E8E93] dark:text-[#A0A0A0]">
            Already have an account?{' '}
            <button
              onClick={onSwitchToLogin}
              className="text-[#111111] dark:text-white font-medium hover:underline"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
