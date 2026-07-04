import { ResumeData } from '@/types/resume';

const ProfessionalTemplate = ({ data }: { data: ResumeData }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications } = data;
  const accent = '#1e293b';

  return (
    <div style={{ padding: '40px', fontFamily: 'Georgia, serif', fontSize: '11px', lineHeight: '1.6', color: '#1e293b' }}>
      <div style={{ textAlign: 'center', borderBottom: `2px solid ${accent}`, paddingBottom: '16px', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: 700, margin: 0, letterSpacing: '2px', textTransform: 'uppercase' }}>
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '16px', marginTop: '8px', fontSize: '10px', color: '#64748b' }}>
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.address && <span>{personalInfo.address}</span>}
        </div>
      </div>

      {summary && (
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', borderBottom: '1px solid #cbd5e1', paddingBottom: '4px', marginBottom: '8px' }}>Summary</h2>
          <p style={{ color: '#475569', margin: 0 }}>{summary}</p>
        </div>
      )}

      {experience.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', borderBottom: '1px solid #cbd5e1', paddingBottom: '4px', marginBottom: '10px' }}>Professional Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong>{exp.jobTitle}</strong>
                <span style={{ fontSize: '10px', color: '#94a3b8' }}>{exp.startDate} – {exp.endDate}</span>
              </div>
              <div style={{ fontStyle: 'italic', color: '#64748b' }}>{exp.company}</div>
              <p style={{ margin: '4px 0 0', color: '#475569' }}>{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {education.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', borderBottom: '1px solid #cbd5e1', paddingBottom: '4px', marginBottom: '10px' }}>Education</h2>
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
              <div><strong>{edu.degree}</strong>, {edu.institution}</div>
              <span style={{ fontSize: '10px', color: '#94a3b8' }}>{edu.year}</span>
            </div>
          ))}
        </div>
      )}

      {skills.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', borderBottom: '1px solid #cbd5e1', paddingBottom: '4px', marginBottom: '8px' }}>Skills</h2>
          <p style={{ margin: 0, color: '#475569' }}>{skills.join(' • ')}</p>
        </div>
      )}

      {projects.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', borderBottom: '1px solid #cbd5e1', paddingBottom: '4px', marginBottom: '10px' }}>Projects</h2>
          {projects.map((p) => (
            <div key={p.id} style={{ marginBottom: '8px' }}>
              <strong>{p.name}</strong>
              <p style={{ margin: '2px 0 0', color: '#475569' }}>{p.description}</p>
            </div>
          ))}
        </div>
      )}

      {certifications.length > 0 && (
        <div>
          <h2 style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', borderBottom: '1px solid #cbd5e1', paddingBottom: '4px', marginBottom: '8px' }}>Certifications</h2>
          {certifications.map((c) => (
            <div key={c.id} style={{ marginBottom: '4px' }}><strong>{c.name}</strong> — {c.issuer}, {c.year}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfessionalTemplate;
