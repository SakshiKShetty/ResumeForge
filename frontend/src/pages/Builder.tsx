import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FileText, Download, Printer, ChevronLeft, Palette, Cloud, CloudOff, Loader2, Check, Monitor, Pencil } from 'lucide-react';
import { useResumeStore } from '@/store/resumeStore';
import { TEMPLATES } from '@/types/resume';
import ResumeForm from '@/components/ResumeForm';
import ResumePreview from '@/components/ResumePreview';
import { resumeAPI } from '@/services/api';
import { useAuth } from '@/hooks/useAuth';

type SaveState = 'idle' | 'saving' | 'saved' | 'error';

const Builder = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { resumeData, selectedTemplate, setTemplate, setResumeData } = useResumeStore();

  const [showPreview, setShowPreview] = useState(false);
  const [saveState, setSaveState] = useState<SaveState>('idle');
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [loadingResume, setLoadingResume] = useState(!!id);
  const [resumeTitle, setResumeTitle] = useState('My Resume');
  const [editingTitle, setEditingTitle] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const autoSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const currentId = useRef<string | undefined>(id);

  // Load existing resume from backend
  useEffect(() => {
    if (id && isAuthenticated) {
      resumeAPI.get(id).then((doc) => {
        setResumeData(doc.data);
        setTemplate(doc.template as any);
        setResumeTitle(doc.title);
        setLastSaved(new Date(doc.lastSavedAt));
        currentId.current = id;
      }).catch(() => {
        navigate('/dashboard');
      }).finally(() => setLoadingResume(false));
    } else {
      setLoadingResume(false);
    }
  }, [id]);

  // Auto-save whenever resumeData or template changes
  useEffect(() => {
    if (!isAuthenticated || !currentId.current || loadingResume) return;

    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);

    autoSaveTimer.current = setTimeout(async () => {
      setSaveState('saving');
      try {
        const res = await resumeAPI.autoSave(currentId.current!, selectedTemplate, resumeData);
        setLastSaved(new Date(res.lastSavedAt));
        setSaveState('saved');
        setTimeout(() => setSaveState('idle'), 2000);
      } catch {
        setSaveState('error');
      }
    }, 1500); // 1.5s debounce

    return () => {
      if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    };
  }, [resumeData, selectedTemplate, isAuthenticated, loadingResume]);

  // Create new resume in backend if user is logged in but no id
  useEffect(() => {
    if (isAuthenticated && !id && !currentId.current) {
      resumeAPI.create(resumeTitle, selectedTemplate, resumeData).then((doc) => {
        currentId.current = doc.id;
        navigate(`/builder/${doc.id}`, { replace: true });
      }).catch(() => { /* offline mode - continue without cloud */ });
    }
  }, [isAuthenticated]);

  const handleTitleSave = async () => {
    setEditingTitle(false);
    if (currentId.current) {
      try {
        await resumeAPI.update(currentId.current, resumeTitle, selectedTemplate, resumeData);
      } catch {}
    }
  };

  const handleDownloadPDF = async () => {
    const element = document.getElementById('resume-preview');
    if (!element) return;

    setDownloading(true);

    // Show it if hidden
    const container = document.getElementById('resume-preview-container');
    const wasHidden = container?.classList.contains('hidden') || container?.style.display === 'none';
    if (wasHidden && container) {
      container.style.cssText = 'position:absolute;left:-9999px;top:0;display:block!important;visibility:visible;';
    }

    try {
      const html2canvas = (await import('html2canvas')).default;
      const { jsPDF } = await import('jspdf');

      const canvas = await html2canvas(element, {
        scale: 3,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
        width: element.scrollWidth,
        height: element.scrollHeight,
      });

      const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;
      const imgData = canvas.toDataURL('image/jpeg', 0.98);

      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      const name = resumeData.personalInfo.fullName || 'Resume';
      pdf.save(`${name.replace(/\s+/g, '_')}_Resume.pdf`);
    } catch (err) {
      console.error('PDF generation failed:', err);
      alert('PDF download failed. Please try printing instead.');
    } finally {
      if (wasHidden && container) {
        container.style.cssText = '';
      }
      setDownloading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const SaveIndicator = () => {
    if (!isAuthenticated) return null;
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#6b7280' }}>
        {saveState === 'saving' && <><Loader2 size={12} style={{ animation: 'spin 1s linear infinite' }} /><span>Saving…</span></>}
        {saveState === 'saved' && <><Check size={12} color="#10b981" /><span style={{ color: '#10b981' }}>Saved</span></>}
        {saveState === 'error' && <><CloudOff size={12} color="#ef4444" /><span style={{ color: '#ef4444' }}>Save failed</span></>}
        {saveState === 'idle' && lastSaved && (
          <><Cloud size={12} /><span>Saved {lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span></>
        )}
      </div>
    );
  };

  if (loadingResume) {
    return (
      <div style={{ minHeight: '100vh', background: '#0a0a0f', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Loader2 size={32} color="#6366f1" />
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-background" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Top bar */}
      <header style={{
        height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 16px', borderBottom: '1px solid rgba(255,255,255,0.07)',
        background: 'rgba(10,10,15,0.95)', backdropFilter: 'blur(10px)',
        position: 'sticky', top: 0, zIndex: 50, gap: '12px',
        flexShrink: 0,
      }}>
        {/* Left */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, flex: 1 }}>
          <Link to={isAuthenticated ? '/dashboard' : '/'} style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            color: '#9ca3af', fontSize: '13px', textDecoration: 'none',
            flexShrink: 0,
          }}>
            <ChevronLeft size={16} />
            <span className="hidden sm:inline">Back</span>
          </Link>

          {/* Editable Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: 0 }}>
            {editingTitle ? (
              <input
                autoFocus
                value={resumeTitle}
                onChange={e => setResumeTitle(e.target.value)}
                onBlur={handleTitleSave}
                onKeyDown={e => { if (e.key === 'Enter') handleTitleSave(); }}
                style={{
                  background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(99,102,241,0.5)',
                  borderRadius: '6px', padding: '4px 8px', color: '#e8e8f0',
                  fontSize: '14px', fontWeight: 600, outline: 'none', width: '200px',
                }}
              />
            ) : (
              <button onClick={() => setEditingTitle(true)} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '6px',
                color: '#e8e8f0', fontSize: '14px', fontWeight: 600,
              }}>
                <span style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {resumeTitle}
                </span>
                <Pencil size={12} color="#6b7280" />
              </button>
            )}
          </div>

          <SaveIndicator />
        </div>

        {/* Center - Template selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          <Palette size={14} color="#9ca3af" />
          <select
            value={selectedTemplate}
            onChange={(e) => setTemplate(e.target.value as any)}
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '8px', padding: '5px 10px',
              color: '#e8e8f0', fontSize: '13px', cursor: 'pointer',
              outline: 'none',
            }}
          >
            {TEMPLATES.map(t => (
              <option key={t.id} value={t.id} style={{ background: '#1a1a2e' }}>{t.name}</option>
            ))}
          </select>
        </div>

        {/* Right - Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          {/* Mobile preview toggle */}
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="lg:hidden"
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              background: showPreview ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.06)',
              border: `1px solid ${showPreview ? 'rgba(99,102,241,0.5)' : 'rgba(255,255,255,0.12)'}`,
              borderRadius: '8px', padding: '5px 10px',
              color: showPreview ? '#818cf8' : '#9ca3af', fontSize: '13px', cursor: 'pointer',
            }}
          >
            <Monitor size={14} />
            <span className="hidden sm:inline">{showPreview ? 'Edit' : 'Preview'}</span>
          </button>

          <button onClick={handlePrint} style={actionBtnStyle}>
            <Printer size={14} />
            <span className="hidden sm:inline">Print</span>
          </button>

          <button onClick={handleDownloadPDF} disabled={downloading} style={{
            ...actionBtnStyle,
            background: downloading ? 'rgba(99,102,241,0.3)' : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            color: 'white',
            border: 'none',
          }}>
            {downloading ? <Loader2 size={14} /> : <Download size={14} />}
            <span className="hidden sm:inline">
              {downloading ? 'Generating…' : 'Download PDF'}
            </span>
          </button>
        </div>
      </header>

      {/* Main content */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Form panel */}
        <div
          className={`${showPreview ? 'hidden lg:block' : 'block'}`}
          style={{
            width: '420px',
            minWidth: '420px',
            overflowY: 'auto',
            borderRight: '1px solid rgba(255,255,255,0.07)',
            background: '#0f0f1a',
          }}
        >
          <ResumeForm />
        </div>

        {/* Preview panel */}
        <div
          id="resume-preview-container"
          className={`${!showPreview ? 'hidden lg:flex' : 'flex'}`}
          style={{
            flex: 1,
            overflowY: 'auto',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            background: '#1a1a2e',
            padding: '32px',
          }}
        >
          <div style={{
            background: 'white',
            width: '210mm',
            minHeight: '297mm',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            borderRadius: '4px',
          }}>
            <ResumePreview />
          </div>
        </div>
      </div>

      {/* Print styles */}
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #resume-preview, #resume-preview * { visibility: visible; }
          #resume-preview {
            position: fixed; left: 0; top: 0;
            width: 210mm; background: white;
          }
        }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

const actionBtnStyle: React.CSSProperties = {
  display: 'flex', alignItems: 'center', gap: '6px',
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: '8px', padding: '5px 10px',
  color: '#9ca3af', fontSize: '13px', cursor: 'pointer',
};

export default Builder;
