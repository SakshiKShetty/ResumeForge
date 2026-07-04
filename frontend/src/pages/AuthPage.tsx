import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { FileText, Eye, EyeOff, Loader2, ArrowRight, CheckCircle2 } from 'lucide-react';

type Mode = 'login' | 'register';

const AuthPage = ({ mode: initialMode }: { mode: Mode }) => {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>(initialMode);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'login') {
        await login(form.email, form.password);
      } else {
        await register(form.name, form.email, form.password);
      }
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const features = [
    'Industry-standard resume templates',
    'Real-time preview as you type',
    'One-click PDF download',
    'Auto-save to cloud',
    'ATS-optimized formats',
  ];

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      background: '#0a0a0f',
      color: '#e8e8f0',
    }}>
      {/* Left Panel */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '60px',
        background: 'linear-gradient(135deg, #0a0a0f 0%, #12121e 100%)',
        borderRight: '1px solid rgba(255,255,255,0.06)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative blobs */}
        <div style={{
          position: 'absolute', top: '-100px', left: '-100px',
          width: '400px', height: '400px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '-100px', right: '-100px',
          width: '300px', height: '300px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <Link to="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '48px' }}>
          <div style={{
            width: '40px', height: '40px', borderRadius: '10px',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <FileText size={20} color="white" />
          </div>
          <span style={{ fontSize: '20px', fontWeight: 700, color: '#e8e8f0', letterSpacing: '-0.3px' }}>
            ResumeForge
          </span>
        </Link>

        <h1 style={{
          fontSize: '42px', fontWeight: 800, lineHeight: 1.15,
          marginBottom: '16px', letterSpacing: '-1px',
          background: 'linear-gradient(135deg, #e8e8f0 0%, #9ca3af 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>
          Land your dream<br />job faster.
        </h1>
        <p style={{ color: '#6b7280', fontSize: '16px', marginBottom: '40px', lineHeight: 1.6 }}>
          Build beautiful, professional resumes that get noticed by recruiters.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {features.map((f) => (
            <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <CheckCircle2 size={16} color="#6366f1" />
              <span style={{ color: '#9ca3af', fontSize: '14px' }}>{f}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel - Form */}
      <div style={{
        width: '480px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '60px',
        background: '#0f0f1a',
      }}>
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px', letterSpacing: '-0.5px' }}>
            {mode === 'login' ? 'Welcome back' : 'Create account'}
          </h2>
          <p style={{ color: '#6b7280', fontSize: '14px' }}>
            {mode === 'login'
              ? 'Sign in to access your resumes'
              : 'Start building for free today'}
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {mode === 'register' && (
            <div>
              <label style={{ fontSize: '13px', fontWeight: 500, color: '#9ca3af', display: 'block', marginBottom: '6px' }}>
                Full Name
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="John Doe"
                required
                style={inputStyle}
              />
            </div>
          )}

          <div>
            <label style={{ fontSize: '13px', fontWeight: 500, color: '#9ca3af', display: 'block', marginBottom: '6px' }}>
              Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
              required
              style={inputStyle}
            />
          </div>

          <div>
            <label style={{ fontSize: '13px', fontWeight: 500, color: '#9ca3af', display: 'block', marginBottom: '6px' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder={mode === 'register' ? 'Min. 6 characters' : 'Your password'}
                required
                minLength={mode === 'register' ? 6 : undefined}
                style={{ ...inputStyle, paddingRight: '42px' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute', right: '12px', top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: '#6b7280', padding: 0, display: 'flex',
                }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <div style={{
              background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
              borderRadius: '8px', padding: '10px 14px',
              color: '#f87171', fontSize: '13px',
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: '4px',
              padding: '12px',
              background: loading ? '#3f3f6b' : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              border: 'none', borderRadius: '10px',
              color: 'white', fontSize: '15px', fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              transition: 'opacity 0.2s',
            }}
          >
            {loading ? (
              <><Loader2 size={16} className="animate-spin" /> Processing...</>
            ) : (
              <>{mode === 'login' ? 'Sign In' : 'Create Account'} <ArrowRight size={16} /></>
            )}
          </button>
        </form>

        <div style={{
          marginTop: '24px', textAlign: 'center',
          color: '#6b7280', fontSize: '14px',
        }}>
          {mode === 'login' ? (
            <>Don't have an account?{' '}
              <button onClick={() => { setMode('register'); setError(''); }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6366f1', fontWeight: 500 }}>
                Sign up free
              </button>
            </>
          ) : (
            <>Already have an account?{' '}
              <button onClick={() => { setMode('login'); setError(''); }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6366f1', fontWeight: 500 }}>
                Sign in
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '11px 14px',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '8px',
  color: '#e8e8f0',
  fontSize: '14px',
  outline: 'none',
  transition: 'border-color 0.2s',
  boxSizing: 'border-box',
};

export default AuthPage;
