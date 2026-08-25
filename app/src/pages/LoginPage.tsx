import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, LogIn } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { t } from '@/data/translations';

export default function LoginPage() {
  const { language } = useLanguage();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error?.message || 'Login failed');
        setLoading(false);
        return;
      }
      login(data.token, data.user);
      navigate('/');
    } catch {
      setError('Something went wrong. Please try again.');
    }
    setLoading(false);
  };

  const handleOAuth = () => {
    // Simulate OAuth by creating a test user
    const mockUser = {
      id: 999,
      username: 'oauth_user',
      email: formData.email || 'oauth@example.com',
      role: 'user' as const,
      isAdmin: false,
    };
    const mockToken = 'mock_oauth_token_' + Date.now();
    login(mockToken, mockUser);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-sand flex items-center justify-center py-20 px-5">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="font-serif text-4xl md:text-5xl text-brown mb-2">{t(language, 'auth.welcomeBack')}</h1>
          <p className="text-brown/60">{t(language, 'auth.login')}</p>
        </div>

        <div className="bg-white p-8 shadow-sm">
          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 mb-6">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-xs font-medium uppercase tracking-wider text-brown/60 mb-1 block">{t(language, 'auth.email')}</label>
              <input
                type="email"
                required
                className="w-full border-b border-brown/30 py-2 text-sm focus:outline-none focus:border-terracotta transition-colors"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label className="text-xs font-medium uppercase tracking-wider text-brown/60 mb-1 block">{t(language, 'auth.password')}</label>
              <input
                type="password"
                required
                className="w-full border-b border-brown/30 py-2 text-sm focus:outline-none focus:border-terracotta transition-colors"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
            <button type="submit" disabled={loading} className="btn-terracotta w-full justify-center disabled:opacity-50">
              <LogIn size={16} />
              {loading ? '...' : t(language, 'auth.login')}
            </button>
          </form>

          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-brown/10" />
            <span className="text-xs text-brown/40 uppercase">{t(language, 'auth.orContinue')}</span>
            <div className="flex-1 h-px bg-brown/10" />
          </div>

          <button onClick={handleOAuth} className="btn-brown w-full justify-center">
            <Sparkles size={16} />
            {t(language, 'auth.oauthLogin')}
          </button>

          <p className="text-center text-sm text-brown/60 mt-6">
            {t(language, 'auth.noAccount')}{' '}
            <Link to="/register" className="text-terracotta hover:underline">{t(language, 'auth.registerNow')}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
