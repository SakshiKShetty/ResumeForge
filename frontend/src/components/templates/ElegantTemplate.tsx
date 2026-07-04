import { ResumeData } from '@/types/resume';

const ElegantTemplate = ({ data }: { data: ResumeData }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications } = data;
  const accent = '#be185d';

  return (
    <div style={{ padding: '44px', fontFamily: '"Times New Roman", serif', fontSize: '11px', lineHeight: '1.6', color: '#1a1a1a' }}>
      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 400, margin: 0, letterSpacing: '4px', textTransform: 'uppercase', color: accent }}>
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div style={{ width: '60px', height: '2px', background: accent, margin: '12px auto' }} />
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '14px', fontSize: '10px', color: '#777' }}>
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.address && <span>{personalInfo.address}</span>}
        </div>
      </div>

      {summary && (
        <div style={{ marginBottom: '22px', textAlign: 'center', maxWidth: '85%', margin: '0 auto 22px' }}>
          <p style={{ color: '#555', fontStyle: 'italic', margin: 0 }}>{summary}</p>
        </div>
      )}

      {experience.length > 0 && (
        <div style={{ marginBottom: '22px' }}>
          <h2 style={{ fontSize: '12px', fontWeight: 400, textTransform: 'uppercase', letterSpacing: '3px', color: accent, textAlign: 'center', marginBottom: '14px' }}>Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <strong style={{ fontSize: '12px', letterSpacing: '0.5px' }}>{exp.jobTitle}</strong>
                <span style={{ color: '#aaa', fontSize: '10px', fontStyle: 'italic' }}>{exp.startDate} — {exp.endDate}</span>
              </div>
              <div style={{ color: accent, fontSize: '11px', fontStyle: 'italic' }}>{exp.company}</div>
              <p style={{ color: '#555', margin: '4px 0 0' }}>{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {education.length > 0 && (
        <div style={{ marginBottom: '22px' }}>
          <h2 style={{ fontSize: '12px', fontWeight: 400, textTransform: 'uppercase', letterSpacing: '3px', color: accent, textAlign: 'center', marginBottom: '14px' }}>Education</h2>
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: '8px', textAlign: 'center' }}>
              <strong>{edu.degree}</strong> — {edu.institution} <span style={{ color: '#aaa' }}>({edu.year})</span>
            </div>
          ))}
        </div>
      )}

      {skills.length > 0 && (
        <div style={{ marginBottom: '22px' }}>
          <h2 style={{ fontSize: '12px', fontWeight: 400, textTransform: 'uppercase', letterSpacing: '3px', color: accent, textAlign: 'center', marginBottom: '10px' }}>Skills</h2>
          <p style={{ textAlign: 'center', color: '#555', margin: 0 }}>{skills.join('  ·  ')}</p>
        </div>
      )}

      {projects.length > 0 && (
        <div style={{ marginBottom: '22px' }}>
          <h2 style={{ fontSize: '12px', fontWeight: 400, textTransform: 'uppercase', letterSpacing: '3px', color: accent, textAlign: 'center', marginBottom: '14px' }}>Projects</h2>
          {projects.map((p) => (
            <div key={p.id} style={{ marginBottom: '10px', textAlign: 'center' }}>
              <strong>{p.name}</strong>
              <p style={{ color: '#555', margin: '2px 0 0' }}>{p.description}</p>
            </div>
          ))}
        </div>
      )}

      {certifications.length > 0 && (
        <div>
          <h2 style={{ fontSize: '12px', fontWeight: 400, textTransform: 'uppercase', letterSpacing: '3px', color: accent, textAlign: 'center', marginBottom: '10px' }}>Certifications</h2>
          {certifications.map((c) => (
            <div key={c.id} style={{ textAlign: 'center', marginBottom: '4px' }}>{c.name} — {c.issuer} ({c.year})</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ElegantTemplate;
