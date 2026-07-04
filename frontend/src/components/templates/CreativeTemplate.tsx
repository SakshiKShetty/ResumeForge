import { ResumeData } from '@/types/resume';

const CreativeTemplate = ({ data }: { data: ResumeData }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications } = data;
  const accent = '#8b5cf6';

  return (
    <div style={{ display: 'flex', fontFamily: 'Inter, sans-serif', fontSize: '11px', lineHeight: '1.5', color: '#1e1b4b', minHeight: '297mm' }}>
      {/* Sidebar */}
      <div style={{ width: '35%', background: accent, color: '#fff', padding: '36px 24px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 800, margin: '0 0 4px' }}>
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div style={{ fontSize: '10px', opacity: 0.8, marginBottom: '24px' }}>
          {personalInfo.email && <div>{personalInfo.email}</div>}
          {personalInfo.phone && <div>{personalInfo.phone}</div>}
          {personalInfo.address && <div>{personalInfo.address}</div>}
          {personalInfo.linkedin && <div>{personalInfo.linkedin}</div>}
          {personalInfo.portfolio && <div>{personalInfo.portfolio}</div>}
        </div>

        {skills.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '10px', borderBottom: '2px solid rgba(255,255,255,0.3)', paddingBottom: '4px' }}>Skills</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
              {skills.map((s) => (
                <span key={s} style={{ background: 'rgba(255,255,255,0.2)', padding: '3px 8px', borderRadius: '4px', fontSize: '10px' }}>{s}</span>
              ))}
            </div>
          </div>
        )}

        {education.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '10px', borderBottom: '2px solid rgba(255,255,255,0.3)', paddingBottom: '4px' }}>Education</h2>
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: '10px' }}>
                <strong style={{ fontSize: '11px' }}>{edu.degree}</strong>
                <div style={{ opacity: 0.8, fontSize: '10px' }}>{edu.institution}</div>
                <div style={{ opacity: 0.6, fontSize: '10px' }}>{edu.year}</div>
              </div>
            ))}
          </div>
        )}

        {certifications.length > 0 && (
          <div>
            <h2 style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '10px', borderBottom: '2px solid rgba(255,255,255,0.3)', paddingBottom: '4px' }}>Certifications</h2>
            {certifications.map((c) => (
              <div key={c.id} style={{ marginBottom: '6px', fontSize: '10px' }}>
                <strong>{c.name}</strong><br />{c.issuer} ({c.year})
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main */}
      <div style={{ flex: 1, padding: '36px 28px' }}>
        {summary && (
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '13px', fontWeight: 700, color: accent, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>About Me</h2>
            <p style={{ color: '#475569', margin: 0 }}>{summary}</p>
          </div>
        )}

        {experience.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '13px', fontWeight: 700, color: accent, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>Experience</h2>
            {experience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: '16px', borderLeft: `3px solid ${accent}`, paddingLeft: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <strong style={{ fontSize: '12px' }}>{exp.jobTitle}</strong>
                  <span style={{ color: '#94a3b8', fontSize: '10px' }}>{exp.startDate} — {exp.endDate}</span>
                </div>
                <div style={{ color: accent, fontSize: '11px' }}>{exp.company}</div>
                <p style={{ color: '#475569', margin: '4px 0 0' }}>{exp.description}</p>
              </div>
            ))}
          </div>
        )}

        {projects.length > 0 && (
          <div>
            <h2 style={{ fontSize: '13px', fontWeight: 700, color: accent, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>Projects</h2>
            {projects.map((p) => (
              <div key={p.id} style={{ marginBottom: '10px' }}>
                <strong>{p.name}</strong>
                {p.link && <span style={{ color: accent, fontSize: '10px', marginLeft: '8px' }}>{p.link}</span>}
                <p style={{ color: '#475569', margin: '2px 0 0' }}>{p.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreativeTemplate;
