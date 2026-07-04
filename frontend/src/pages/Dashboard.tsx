import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { resumeAPI, type ResumeListItem } from '@/services/api';
import { FileText, Plus, Trash2, Edit3, LogOut, Clock, User, Loader2 } from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<ResumeListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const res = await resumeAPI.list();
      setResumes(res.resumes);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    setCreating(true);
    try {
      const resume = await resumeAPI.create(
        `Resume ${new Date().toLocaleDateString()}`,
        'professional',
        {
          personalInfo: { fullName: '', email: '', phone: '', address: '', linkedin: '', portfolio: '' },
          summary: '', experience: [], education: [], skills: [], projects: [], certifications: [],
        }
      );
      navigate(`/builder/${resume.id}`);
    } catch (err: any) {
      setError(err.message);
      setCreating(false);
    }
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!confirm('Delete this resume?')) return;
    setDeletingId(id);
    try {
      await resumeAPI.delete(id);
      setResumes(prev => prev.filter(r => r.id !== id));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  const fmtDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const templateColors: Record<string, string> = {
    professional: '#1e293b', modern: '#2563eb', minimal: '#374151',
    creative: '#7c3aed', ats: '#059669', elegant: '#be185d',
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', color: '#e8e8f0', fontFamily: "'DM Sans', sans-serif" }}>
      {/* Navbar */}
      <nav style={{
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        padding: '0 32px', height: '60px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'rgba(15,15,26,0.95)', backdropFilter: 'blur(10px)',
        position: 'sticky', top: 0, zIndex: 10,
      }}>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '32px', height: '32px', borderRadius: '8px',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <FileText size={16} color="white" />
          </div>
          <span style={{ fontWeight: 700, fontSize: '16px', color: '#e8e8f0' }}>ResumeForge</span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#9ca3af', fontSize: '14px' }}>
            <User size={14} />
            <span>{user?.name}</span>
          </div>
          <button onClick={logout} style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            background: 'none', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px', padding: '6px 12px',
            color: '#9ca3af', fontSize: '13px', cursor: 'pointer',
            transition: 'all 0.2s',
          }}>
            <LogOut size={14} /> Sign out
          </button>
        </div>
      </nav>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '48px 32px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px' }}>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: 800, letterSpacing: '-0.5px', marginBottom: '6px' }}>
              My Resumes
            </h1>
            <p style={{ color: '#6b7280', fontSize: '14px' }}>
              {resumes.length} resume{resumes.length !== 1 ? 's' : ''} in your account
            </p>
          </div>
          <button onClick={handleCreate} disabled={creating} style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            border: 'none', borderRadius: '10px', padding: '12px 20px',
            color: 'white', fontSize: '14px', fontWeight: 600,
            cursor: creating ? 'not-allowed' : 'pointer',
          }}>
            {creating ? <Loader2 size={16} /> : <Plus size={16} />}
            New Resume
          </button>
        </div>

        {error && (
          <div style={{
            background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
            borderRadius: '8px', padding: '12px 16px', marginBottom: '24px',
            color: '#f87171', fontSize: '14px',
          }}>
            {error}
          </div>
        )}

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '80px', color: '#6b7280' }}>
            <Loader2 size={32} />
          </div>
        ) : resumes.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '80px 40px',
            background: 'rgba(255,255,255,0.02)',
            border: '1px dashed rgba(255,255,255,0.1)',
            borderRadius: '16px',
          }}>
            <FileText size={48} color="#374151" style={{ marginBottom: '16px' }} />
            <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px', color: '#9ca3af' }}>
              No resumes yet
            </h3>
            <p style={{ color: '#6b7280', marginBottom: '24px', fontSize: '14px' }}>
              Create your first professional resume in minutes
            </p>
            <button onClick={handleCreate} style={{
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              border: 'none', borderRadius: '10px', padding: '12px 24px',
              color: 'white', fontSize: '14px', fontWeight: 600, cursor: 'pointer',
            }}>
              <Plus size={16} style={{ display: 'inline', marginRight: '6px' }} />
              Create Resume
            </button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '20px',
          }}>
            {resumes.map((resume) => (
              <Link
                key={resume.id}
                to={`/builder/${resume.id}`}
                style={{ textDecoration: 'none' }}
              >
                <div style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  transition: 'all 0.2s',
                  cursor: 'pointer',
                  position: 'relative',
                }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.border = '1px solid rgba(99,102,241,0.4)';
                    (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.border = '1px solid rgba(255,255,255,0.07)';
                    (e.currentTarget as HTMLDivElement).style.transform = 'none';
                  }}
                >
                  {/* Template color band */}
                  <div style={{
                    height: '6px',
                    background: templateColors[resume.template] || '#6366f1',
                  }} />

                  <div style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <div>
                        <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#e8e8f0', marginBottom: '4px' }}>
                          {resume.title}
                        </h3>
                        <span style={{
                          fontSize: '11px', fontWeight: 500,
                          background: 'rgba(99,102,241,0.15)',
                          color: '#818cf8', borderRadius: '4px', padding: '2px 6px',
                          textTransform: 'capitalize',
                        }}>
                          {resume.template}
                        </span>
                      </div>
                      <button
                        onClick={(e) => handleDelete(resume.id, e)}
                        disabled={deletingId === resume.id}
                        style={{
                          background: 'none', border: 'none', cursor: 'pointer',
                          color: '#4b5563', padding: '4px', borderRadius: '6px',
                          transition: 'color 0.2s',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.color = '#ef4444')}
                        onMouseLeave={e => (e.currentTarget.style.color = '#4b5563')}
                      >
                        {deletingId === resume.id ? <Loader2 size={16} /> : <Trash2 size={16} />}
                      </button>
                    </div>

                    {resume.data?.personalInfo?.fullName && (
                      <p style={{ fontSize: '13px', color: '#9ca3af', marginBottom: '12px' }}>
                        {resume.data.personalInfo.fullName}
                      </p>
                    )}

                    <div style={{
                      display: 'flex', alignItems: 'center', gap: '6px',
                      color: '#4b5563', fontSize: '12px',
                    }}>
                      <Clock size={11} />
                      <span>Updated {fmtDate(resume.updatedAt)}</span>
                    </div>
                  </div>

                  <div style={{
                    padding: '12px 20px',
                    borderTop: '1px solid rgba(255,255,255,0.05)',
                    display: 'flex', alignItems: 'center', gap: '6px',
                    color: '#6366f1', fontSize: '13px', fontWeight: 500,
                  }}>
                    <Edit3 size={13} />
                    Edit Resume
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
