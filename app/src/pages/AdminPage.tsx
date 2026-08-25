import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { t } from '@/data/translations';
import { Mail, User, Clock, Shield, Users, MessageSquare } from 'lucide-react';

interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

interface UserRecord {
  id: number;
  username: string;
  email: string;
  role: string;
}

export default function AdminPage() {
  const { language } = useLanguage();
  const { user, isAdmin, isLoading } = useAuth();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [activeTab, setActiveTab] = useState<'contacts' | 'users'>('contacts');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && (!user || !isAdmin)) {
      navigate('/');
    }
  }, [user, isAdmin, isLoading, navigate]);

  useEffect(() => {
    if (!isAdmin) return;

    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const [contactsRes, usersRes] = await Promise.all([
          fetch('/api/contact/list', { headers: { Authorization: `Bearer ${token}` } }),
          fetch('/api/auth/listUsers', { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        if (contactsRes.ok) setContacts(await contactsRes.json());
        if (usersRes.ok) setUsers(await usersRes.json());
      } catch {
        console.error('Failed to fetch admin data');
      }
      setLoading(false);
    };

    fetchData();
  }, [isAdmin]);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center"><p className="text-brown/60">Loading...</p></div>;
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-sand pt-24 pb-16">
      <div className="container-custom">
        <div className="flex items-center gap-3 mb-8">
          <Shield size={28} className="text-terracotta" />
          <h1 className="font-serif text-4xl md:text-5xl text-brown">{t(language, 'admin.heading')}</h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-brown/10">
          <button
            onClick={() => setActiveTab('contacts')}
            className={`flex items-center gap-2 py-3 text-sm font-medium uppercase tracking-wider transition-colors ${
              activeTab === 'contacts' ? 'text-terracotta border-b-2 border-terracotta' : 'text-brown/50 hover:text-brown'
            }`}
          >
            <MessageSquare size={16} />
            {t(language, 'admin.contacts')}
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`flex items-center gap-2 py-3 text-sm font-medium uppercase tracking-wider transition-colors ${
              activeTab === 'users' ? 'text-terracotta border-b-2 border-terracotta' : 'text-brown/50 hover:text-brown'
            }`}
          >
            <Users size={16} />
            {t(language, 'admin.users')}
          </button>
        </div>

        {loading ? (
          <p className="text-brown/60">Loading data...</p>
        ) : (
          <>
            {/* Contact Submissions */}
            {activeTab === 'contacts' && (
              <div className="bg-white shadow-sm overflow-hidden">
                {contacts.length === 0 ? (
                  <div className="p-12 text-center text-brown/50">{t(language, 'admin.noContacts')}</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-brown text-white">
                        <tr>
                          <th className="text-left py-3 px-4 font-medium">{t(language, 'admin.name')}</th>
                          <th className="text-left py-3 px-4 font-medium">{t(language, 'admin.email')}</th>
                          <th className="text-left py-3 px-4 font-medium">{t(language, 'admin.subject')}</th>
                          <th className="text-left py-3 px-4 font-medium">{t(language, 'admin.message')}</th>
                          <th className="text-left py-3 px-4 font-medium">{t(language, 'admin.date')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {contacts.map((c) => (
                          <tr key={c.id} className="border-b border-brown/5 hover:bg-sand/50">
                            <td className="py-3 px-4 font-medium">{c.name}</td>
                            <td className="py-3 px-4">
                              <a href={`mailto:${c.email}`} className="text-terracotta hover:underline flex items-center gap-1">
                                <Mail size={12} /> {c.email}
                              </a>
                            </td>
                            <td className="py-3 px-4 text-brown/70">{c.subject}</td>
                            <td className="py-3 px-4 text-brown/60 max-w-xs truncate">{c.message}</td>
                            <td className="py-3 px-4 text-brown/50 whitespace-nowrap">
                              <span className="flex items-center gap-1">
                                <Clock size={12} />
                                {new Date(c.createdAt).toLocaleDateString()}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* Users */}
            {activeTab === 'users' && (
              <div className="bg-white shadow-sm overflow-hidden">
                {users.length === 0 ? (
                  <div className="p-12 text-center text-brown/50">No users found.</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-brown text-white">
                        <tr>
                          <th className="text-left py-3 px-4 font-medium">ID</th>
                          <th className="text-left py-3 px-4 font-medium">{t(language, 'admin.name')}</th>
                          <th className="text-left py-3 px-4 font-medium">{t(language, 'admin.email')}</th>
                          <th className="text-left py-3 px-4 font-medium">{t(language, 'admin.role')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((u) => (
                          <tr key={u.id} className="border-b border-brown/5 hover:bg-sand/50">
                            <td className="py-3 px-4 text-brown/50">{u.id}</td>
                            <td className="py-3 px-4 font-medium flex items-center gap-2">
                              <User size={14} className="text-terracotta" /> {u.username}
                            </td>
                            <td className="py-3 px-4 text-terracotta">{u.email}</td>
                            <td className="py-3 px-4">
                              <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded ${
                                u.role === 'admin' ? 'bg-terracotta text-white' : 'bg-brown/10 text-brown'
                              }`}>
                                {u.role}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
