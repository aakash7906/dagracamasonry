import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Hammer, Eye, EyeOff, ArrowLeft, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

function GoogleIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.17 0 9.99 0 12s.45 3.83 1.25 5.42l4.03-3.15z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
      />
    </svg>
  );
}

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Please provide both your email and password.');
      return;
    }

    try {
      setLoading(true);
      await login(email);
      setSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 900);
    } catch {
      setError('Unable to authenticate. Please check your credentials.');
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    await login('client@dagracamasonry.com', 'Estate Client');
    setSuccess(true);
    setTimeout(() => {
      navigate('/');
    }, 900);
  };

  return (
    <div className="min-h-screen w-full flex bg-stone-50 text-stone-900 font-sans selection:bg-amber-100 selection:text-amber-900">
      {/* Left Column: Auth Form */}
      <div className="w-full lg:w-1/2 min-h-screen flex flex-col justify-between p-4 sm:p-8 md:p-10 lg:p-12 xl:p-16 bg-white z-10 overflow-y-auto">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 sm:pb-0">
          <Link to="/" className="flex items-center gap-2 sm:gap-2.5 group">
            <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg bg-[#b45309] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform shrink-0">
              <Hammer className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-white stroke-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-sm sm:text-base tracking-tight text-stone-950 leading-tight">
                DA GRACA
              </span>
              <span className="text-[8px] sm:text-[9px] uppercase tracking-widest text-[#b45309] font-bold -mt-0.5">
                Masonry & Stone
              </span>
            </div>
          </Link>

          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors p-1"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back to website</span>
            <span className="sm:hidden">Back</span>
          </Link>
        </div>

        {/* Center Auth Card */}
        <div className="w-full max-w-sm sm:max-w-md mx-auto my-auto py-6 sm:py-8">
          <div className="text-center space-y-1.5 sm:space-y-2 mb-6 sm:mb-8">
            <div className="inline-block text-[#b45309] font-heading font-black text-xl sm:text-2xl tracking-tight">
              DA GRACA
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-950 font-heading tracking-tight">
              Login to your account
            </h1>
            <p className="text-xs sm:text-sm text-stone-500">
              Enter your email below to login to your account
            </p>
          </div>

          {/* Error & Success Alerts */}
          {error && (
            <div className="mb-5 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-5 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
              <span>Login successful! Redirecting to your masonry portal...</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-stone-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 bg-white text-stone-900 placeholder-stone-400 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 transition-all"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold text-stone-700"
                >
                  Password
                </label>
                <a
                  href="#forgot"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Password reset instructions will be sent to your registered email.');
                  }}
                  className="text-xs text-stone-500 hover:text-amber-800 transition-colors"
                >
                  Forgot your password?
                </a>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-3.5 pr-11 py-2.5 rounded-lg border border-stone-300 bg-white text-stone-900 placeholder-stone-400 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-1 top-1/2 -translate-y-1/2 p-2.5 text-stone-400 hover:text-stone-700 focus:outline-none rounded-md"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading || success}
              className="w-full min-h-[44px] mt-2 py-2.5 px-4 rounded-lg bg-[#b45309] hover:bg-[#9a3412] active:scale-[0.99] text-white font-semibold text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Logging in...</span>
                </>
              ) : (
                <span>Login</span>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-5 sm:my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-stone-200" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase font-semibold tracking-wider text-stone-400">
              <span className="bg-white px-3">Or continue with</span>
            </div>
          </div>

          {/* Google Sign In */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading || success}
            className="w-full min-h-[44px] py-2.5 px-4 rounded-lg border border-stone-300 bg-white hover:bg-stone-50 active:scale-[0.99] text-stone-700 font-medium text-sm transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-70"
          >
            <GoogleIcon className="h-4 w-4" />
            <span>Login with Google</span>
          </button>

          {/* Switch to Sign Up */}
          <p className="text-center text-xs sm:text-sm text-stone-500 mt-5 sm:mt-6">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="font-semibold text-stone-900 hover:text-[#b45309] underline transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>

        {/* Bottom Copyright */}
        <div className="text-center text-[11px] text-stone-400 pt-4 sm:pt-6">
          © 2026 Da Graca Masonry Inc. All rights reserved.
        </div>
      </div>

      {/* Right Column: Visual Showcase (Layout matching user screenshot) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-stone-950 overflow-hidden items-end p-8 sm:p-10 xl:p-14">
        {/* Background Image with High Visibility */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-80 scale-100 transition-all duration-700"
          style={{ backgroundImage: `url('/images/masonry/craftsman-work.png')` }}
        />
        {/* Soft Contrast Gradient (Keeps image clear while ensuring bottom card readability) */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-black/20" />

        {/* Subtle Architectural Grid Graphic Accent */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(245, 158, 11, 0.4) 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />

        {/* Floating Card at Bottom */}
        <div className="relative z-10 w-full max-w-lg rounded-2xl bg-stone-950/80 backdrop-blur-xl border border-white/20 p-5 sm:p-6 xl:p-8 text-white shadow-2xl space-y-2.5 sm:space-y-3">
          <div className="h-1.5 w-12 rounded-full bg-amber-500 mb-1.5" />
          <h2 className="text-lg sm:text-xl xl:text-2xl font-extrabold font-heading text-white tracking-tight leading-snug">
            Architectural Stone & Engineering Portal
          </h2>
          <p className="text-xs xl:text-sm text-stone-300 leading-relaxed">
            Accelerate your estate masonry consultations with real-time blueprint reviews, itemized cost estimates, and certified quarry stone sourcing.
          </p>
          <div className="pt-1.5 flex flex-wrap items-center gap-2 sm:gap-4 text-[11px] text-amber-300/90 font-medium">
            <span>• 25-Year Structural Warranty</span>
            <span>• Direct Master Mason Access</span>
          </div>
        </div>
      </div>
    </div>
  );
}
