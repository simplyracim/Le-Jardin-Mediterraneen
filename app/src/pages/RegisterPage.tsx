import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { t } from '@/data/translations';

export default function RegisterPage() {
  const { language } = useLanguage();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error?.message || 'Registration failed');
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

  return (
    <div className="min-h-screen bg-sand flex items-center justify-center py-20 px-5">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="font-serif text-4xl md:text-5xl text-brown mb-2">{t(language, 'auth.joinUs')}</h1>
          <p className="text-brown/60">{t(language, 'auth.register')}</p>
        </div>

        <div className="bg-white p-8 shadow-sm">
          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 mb-6">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-xs font-medium uppercase tracking-wider text-brown/60 mb-1 block">{t(language, 'auth.username')}</label>
              <input
                type="text"
                required
                minLength={3}
                className="w-full border-b border-brown/30 py-2 text-sm focus:outline-none focus:border-terracotta transition-colors"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
            </div>
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
                minLength={6}
                className="w-full border-b border-brown/30 py-2 text-sm focus:outline-none focus:border-terracotta transition-colors"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
            <div>
              <label className="text-xs font-medium uppercase tracking-wider text-brown/60 mb-1 block">Confirm Password</label>
              <input
                type="password"
                required
                className="w-full border-b border-brown/30 py-2 text-sm focus:outline-none focus:border-terracotta transition-colors"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              />
            </div>
            <button type="submit" disabled={loading} className="btn-terracotta w-full justify-center disabled:opacity-50">
              <UserPlus size={16} />
              {loading ? '...' : t(language, 'auth.register')}
            </button>
          </form>

          <p className="text-center text-sm text-brown/60 mt-6">
            {t(language, 'auth.haveAccount')}{' '}
            <Link to="/login" className="text-terracotta hover:underline">{t(language, 'auth.loginNow')}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
