import { useState, useEffect } from 'react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';
import {
  Globe,
  CodeXml,
  AtSign,
  CheckCircle2,
  Loader2,
  User as UserIcon,
  Eye,
  EyeOff,
  AlertCircle,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export function UserAccount() {
  const { user, updateUser } = useAuth();

  // Form states with fallback to initial reference image values
  const [displayName, setDisplayName] = useState(user?.name || 'User');
  const [email, setEmail] = useState(user?.email || 'google@gmail.com');
  const [location, setLocation] = useState(user?.location || '');
  const [websiteUrl, setWebsiteUrl] = useState(user?.websiteUrl || '');
  const [githubHandle, setGithubHandle] = useState(user?.githubHandle || '');
  const [xHandle, setXHandle] = useState(user?.xHandle || '');

  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Security form states
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [securitySaving, setSecuritySaving] = useState(false);
  const [securitySuccess, setSecuritySuccess] = useState(false);
  const [securityError, setSecurityError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      if (user.name) setDisplayName(user.name);
      if (user.email) setEmail(user.email);
      if (user.location) setLocation(user.location);
      if (user.websiteUrl) setWebsiteUrl(user.websiteUrl);
      if (user.githubHandle) setGithubHandle(user.githubHandle);
      if (user.xHandle) setXHandle(user.xHandle);
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveSuccess(false);

    setTimeout(() => {
      updateUser({
        name: displayName,
        email,
        location,
        websiteUrl,
        githubHandle,
        xHandle,
      });
      setSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    }, 600);
  };

  const handleSecuritySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSecurityError(null);
    setSecuritySuccess(false);

    if (!currentPassword) {
      setSecurityError('Please enter your current password.');
      return;
    }

    if (!newPassword || newPassword.length < 8) {
      setSecurityError('New password must be at least 8 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setSecurityError('New password and confirmation password do not match.');
      return;
    }

    setSecuritySaving(true);
    setTimeout(() => {
      setSecuritySaving(false);
      setSecuritySuccess(true);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setSecuritySuccess(false), 4000);
    }, 600);
  };

  const formatJoinedDate = () => {
    if (user?.createdAt) {
      try {
        const d = new Date(user.createdAt);
        if (!isNaN(d.getTime())) {
          return new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' }).format(d);
        }
      } catch {
        // fallback to default
      }
    }
    return new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' }).format(
      user?.createdAt ? new Date(user.createdAt) : new Date()
    );
  };

  return (
    <div className="py-10 sm:py-16 bg-stone-50 min-h-screen text-stone-900">
      <Container size="full" className="max-w-[1560px] px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Breadcrumb & Page Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
              <Link to="/" className="hover:text-amber-800 transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-stone-900 font-semibold">User Account</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-[#b45309] text-white flex items-center justify-center font-heading font-black text-xl shadow-md shrink-0">
                  {displayName ? displayName.charAt(0).toUpperCase() : <UserIcon className="h-6 w-6" />}
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-950 font-heading tracking-tight leading-tight">
                    {displayName || 'My Account'}
                  </h1>
                  <p className="text-xs sm:text-sm text-stone-500 font-normal mt-0.5">
                    Joined {formatJoinedDate()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Success Banner */}
          {saveSuccess && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-2.5 shadow-2xs animate-in fade-in slide-in-from-top-2 duration-300">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
              <span className="font-medium">Profile changes saved successfully!</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Card 1: Profile Information */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-bold font-heading text-stone-950 tracking-tight">
                  Profile Information
                </h2>
                {/* <p className="text-xs sm:text-sm text-stone-500">
                  This information will be displayed on your client profile.
                </p> */}
              </div>

              <div className="space-y-5">
                {/* Display Name */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="displayName"
                    className="block text-xs sm:text-sm font-semibold text-stone-800"
                  >
                    Display Name
                  </label>
                  <input
                    id="displayName"
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Name"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 bg-white text-stone-900 placeholder-stone-400 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 transition-all"
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="emailAddress"
                    className="block text-xs sm:text-sm font-semibold text-stone-800"
                  >
                    Email Address
                  </label>
                  <input
                    id="emailAddress"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="google@gmail.com"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 bg-white text-stone-900 placeholder-stone-400 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 transition-all"
                  />
                </div>

                {/* Location */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="location"
                    className="block text-xs sm:text-sm font-semibold text-stone-800"
                  >
                    Location
                  </label>
                  <input
                    id="location"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. San Francisco, CA"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 bg-white text-stone-900 placeholder-stone-400 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Card 2: Social Links & Portfolio */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-bold font-heading text-stone-950 tracking-tight">
                  Social Links & Portfolio
                </h2>
                <p className="text-xs sm:text-sm text-stone-500">
                  Connect your external social media handles and website for customer verification.
                </p>
              </div>

              {/* 3 Columns Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* Website URL */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="websiteUrl"
                    className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-stone-800"
                  >
                    <Globe className="h-4 w-4 text-stone-600 shrink-0" />
                    <span>Website URL</span>
                  </label>
                  <input
                    id="websiteUrl"
                    type="url"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    placeholder="https://yourwebsite.dev"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 bg-white text-stone-900 placeholder-stone-400 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 transition-all"
                  />
                </div>

                {/* GitHub Handle */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="githubHandle"
                    className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-stone-800"
                  >
                    <CodeXml className="h-4 w-4 text-stone-600 shrink-0" />
                    <span>GitHub Handle</span>
                  </label>
                  <input
                    id="githubHandle"
                    type="text"
                    value={githubHandle}
                    onChange={(e) => setGithubHandle(e.target.value)}
                    placeholder="username"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 bg-white text-stone-900 placeholder-stone-400 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 transition-all"
                  />
                </div>

                {/* X / Twitter Handle */}
                <div className="space-y-1.5 sm:col-span-2 lg:col-span-1">
                  <label
                    htmlFor="xHandle"
                    className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-stone-800"
                  >
                    <AtSign className="h-4 w-4 text-stone-600 shrink-0" />
                    <span>X / Twitter Handle</span>
                  </label>
                  <input
                    id="xHandle"
                    type="text"
                    value={xHandle}
                    onChange={(e) => setXHandle(e.target.value)}
                    placeholder="username"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 bg-white text-stone-900 placeholder-stone-400 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Save Action Button */}
            <div className="flex justify-end pt-2">
              <Button
                type="submit"
                disabled={saving}
                className="bg-[#b45309] hover:bg-[#9a3412] active:scale-[0.99] text-white font-bold px-7 py-3 text-sm rounded-lg shadow-md cursor-pointer disabled:opacity-70 transition-all flex items-center gap-2"
              >
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Saving Changes...</span>
                  </>
                ) : (
                  <span>Save Profile Changes</span>
                )}
              </Button>
            </div>
          </form>

          {/* Card 3: Security & Authentication (Password Change) */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="space-y-1">
              <h2 className="text-lg sm:text-xl font-bold font-heading text-stone-950 tracking-tight">
                Security & Authentication
              </h2>
              <p className="text-xs sm:text-sm text-stone-500">
                Manage your password and active security options.
              </p>
            </div>

            {/* Security Alerts */}
            {securityError && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-center gap-2.5">
                <AlertCircle className="h-4 w-4 text-red-600 shrink-0" />
                <span>{securityError}</span>
              </div>
            )}

            {securitySuccess && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Security preferences updated successfully!</span>
              </div>
            )}

            <form onSubmit={handleSecuritySubmit} className="space-y-5">
              {/* Row 1: Current Password */}
              <div className="space-y-1.5">
                <label
                  htmlFor="currentPassword"
                  className="block text-xs sm:text-sm font-semibold text-stone-800"
                >
                  Current Password
                </label>
                <div className="relative">
                  <input
                    id="currentPassword"
                    type={showCurrentPassword ? 'text' : 'password'}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-3.5 pr-11 py-2.5 rounded-lg border border-stone-300 bg-white text-stone-900 placeholder-stone-400 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-1 top-1/2 -translate-y-1/2 p-2.5 text-stone-400 hover:text-stone-700 focus:outline-none rounded-md"
                    aria-label={showCurrentPassword ? 'Hide password' : 'Show password'}
                  >
                    {showCurrentPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Row 2: New Password & Confirm New Password */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-1.5">
                  <label
                    htmlFor="newPassword"
                    className="block text-xs sm:text-sm font-semibold text-stone-800"
                  >
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      id="newPassword"
                      type={showNewPassword ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      className="w-full pl-3.5 pr-11 py-2.5 rounded-lg border border-stone-300 bg-white text-stone-900 placeholder-stone-400 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-1 top-1/2 -translate-y-1/2 p-2.5 text-stone-400 hover:text-stone-700 focus:outline-none rounded-md"
                      aria-label={showNewPassword ? 'Hide password' : 'Show password'}
                    >
                      {showNewPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-xs sm:text-sm font-semibold text-stone-800"
                  >
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      className="w-full pl-3.5 pr-11 py-2.5 rounded-lg border border-stone-300 bg-white text-stone-900 placeholder-stone-400 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-1 top-1/2 -translate-y-1/2 p-2.5 text-stone-400 hover:text-stone-700 focus:outline-none rounded-md"
                      aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Save Security Action Button */}
              <div className="flex justify-end pt-3">
                <Button
                  type="submit"
                  disabled={securitySaving}
                  className="bg-[#b45309] hover:bg-[#9a3412] active:scale-[0.99] text-white font-bold px-6 py-2.5 text-sm rounded-lg shadow-md cursor-pointer disabled:opacity-70 transition-all flex items-center gap-2"
                >
                  {securitySaving ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Updating Security...</span>
                    </>
                  ) : (
                    <span>Save Security Preferences</span>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
}
