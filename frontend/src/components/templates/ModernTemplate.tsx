import { ResumeData } from '@/types/resume';

interface Props { data: ResumeData; }

const ModernTemplate = ({ data }: Props) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications } = data;

  return (
    <div style={{ padding: '40px', fontFamily: 'Inter, sans-serif', fontSize: '11px', lineHeight: '1.5', color: '#1a1a2e' }}>
      {/* Header */}
      <div style={{ borderBottom: '3px solid #2563eb', paddingBottom: '20px', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 800, margin: 0, color: '#2563eb' }}>
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '8px', fontSize: '10px', color: '#64748b' }}>
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.address && <span>• {personalInfo.address}</span>}
          {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
          {personalInfo.portfolio && <span>• {personalInfo.portfolio}</span>}
        </div>
      </div>

      {summary && (
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: '#2563eb', marginBottom: '6px' }}>Professional Summary</h2>
          <p style={{ color: '#475569', margin: 0 }}>{summary}</p>
        </div>
      )}

      {experience.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: '#2563eb', marginBottom: '10px' }}>Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong style={{ fontSize: '12px' }}>{exp.jobTitle}</strong>
                <span style={{ color: '#94a3b8', fontSize: '10px' }}>{exp.startDate} — {exp.endDate}</span>
              </div>
              <div style={{ color: '#2563eb', fontSize: '11px' }}>{exp.company}</div>
              <p style={{ color: '#475569', margin: '4px 0 0' }}>{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {education.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: '#2563eb', marginBottom: '10px' }}>Education</h2>
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
              <div><strong>{edu.degree}</strong> — {edu.institution}</div>
              <span style={{ color: '#94a3b8', fontSize: '10px' }}>{edu.year}</span>
            </div>
          ))}
        </div>
      )}

      {skills.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: '#2563eb', marginBottom: '8px' }}>Skills</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {skills.map((s) => (
              <span key={s} style={{ background: '#eff6ff', color: '#2563eb', padding: '3px 10px', borderRadius: '999px', fontSize: '10px', fontWeight: 500 }}>{s}</span>
            ))}
          </div>
        </div>
      )}

      {projects.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: '#2563eb', marginBottom: '10px' }}>Projects</h2>
          {projects.map((p) => (
            <div key={p.id} style={{ marginBottom: '10px' }}>
              <strong style={{ fontSize: '12px' }}>{p.name}</strong>
              {p.link && <span style={{ color: '#2563eb', fontSize: '10px', marginLeft: '8px' }}>{p.link}</span>}
              <p style={{ color: '#475569', margin: '2px 0 0' }}>{p.description}</p>
            </div>
          ))}
        </div>
      )}

      {certifications.length > 0 && (
        <div>
          <h2 style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: '#2563eb', marginBottom: '8px' }}>Certifications</h2>
          {certifications.map((c) => (
            <div key={c.id} style={{ marginBottom: '6px' }}>
              <strong>{c.name}</strong> — {c.issuer} ({c.year})
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ModernTemplate;
