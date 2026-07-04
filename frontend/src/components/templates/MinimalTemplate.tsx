import { ResumeData } from '@/types/resume';

const MinimalTemplate = ({ data }: { data: ResumeData }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications } = data;

  return (
    <div style={{ padding: '48px', fontFamily: 'Inter, sans-serif', fontSize: '11px', lineHeight: '1.6', color: '#333' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 300, margin: 0, letterSpacing: '0.5px' }}>
        {personalInfo.fullName || 'Your Name'}
      </h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '6px', fontSize: '10px', color: '#999' }}>
        {personalInfo.email && <span>{personalInfo.email}</span>}
        {personalInfo.phone && <span>{personalInfo.phone}</span>}
        {personalInfo.address && <span>{personalInfo.address}</span>}
      </div>
      <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '20px 0' }} />

      {summary && <><p style={{ color: '#666' }}>{summary}</p><hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '20px 0' }} /></>}

      {experience.length > 0 && (
        <>
          <h2 style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '3px', color: '#999', marginBottom: '12px' }}>Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span><strong>{exp.jobTitle}</strong> at {exp.company}</span>
                <span style={{ color: '#bbb', fontSize: '10px' }}>{exp.startDate} — {exp.endDate}</span>
              </div>
              <p style={{ color: '#666', margin: '4px 0 0' }}>{exp.description}</p>
            </div>
          ))}
          <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '20px 0' }} />
        </>
      )}

      {education.length > 0 && (
        <>
          <h2 style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '3px', color: '#999', marginBottom: '12px' }}>Education</h2>
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: '6px', display: 'flex', justifyContent: 'space-between' }}>
              <span>{edu.degree} — {edu.institution}</span>
              <span style={{ color: '#bbb', fontSize: '10px' }}>{edu.year}</span>
            </div>
          ))}
          <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '20px 0' }} />
        </>
      )}

      {skills.length > 0 && (
        <>
          <h2 style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '3px', color: '#999', marginBottom: '8px' }}>Skills</h2>
          <p style={{ color: '#666', margin: 0 }}>{skills.join(', ')}</p>
          <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '20px 0' }} />
        </>
      )}

      {projects.length > 0 && (
        <>
          <h2 style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '3px', color: '#999', marginBottom: '12px' }}>Projects</h2>
          {projects.map((p) => (
            <div key={p.id} style={{ marginBottom: '8px' }}>
              <strong>{p.name}</strong>
              <p style={{ color: '#666', margin: '2px 0 0' }}>{p.description}</p>
            </div>
          ))}
        </>
      )}

      {certifications.length > 0 && (
        <>
          <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '20px 0' }} />
          <h2 style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '3px', color: '#999', marginBottom: '8px' }}>Certifications</h2>
          {certifications.map((c) => (
            <div key={c.id} style={{ marginBottom: '4px' }}>{c.name} — {c.issuer} ({c.year})</div>
          ))}
        </>
      )}
    </div>
  );
};

export default MinimalTemplate;
