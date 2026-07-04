import { ResumeData } from '@/types/resume';

const AtsTemplate = ({ data }: { data: ResumeData }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications } = data;

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif', fontSize: '11px', lineHeight: '1.6', color: '#000' }}>
      <h1 style={{ fontSize: '22px', fontWeight: 700, margin: '0 0 4px', textAlign: 'center' }}>
        {personalInfo.fullName || 'Your Name'}
      </h1>
      <div style={{ textAlign: 'center', fontSize: '10px', color: '#555', marginBottom: '20px' }}>
        {[personalInfo.email, personalInfo.phone, personalInfo.address, personalInfo.linkedin].filter(Boolean).join(' | ')}
      </div>

      {summary && (
        <div style={{ marginBottom: '16px' }}>
          <h2 style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', borderBottom: '1px solid #000', paddingBottom: '2px', marginBottom: '6px' }}>Summary</h2>
          <p style={{ margin: 0 }}>{summary}</p>
        </div>
      )}

      {experience.length > 0 && (
        <div style={{ marginBottom: '16px' }}>
          <h2 style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', borderBottom: '1px solid #000', paddingBottom: '2px', marginBottom: '8px' }}>Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: '12px' }}>
              <div><strong>{exp.jobTitle}</strong>, {exp.company} | {exp.startDate} – {exp.endDate}</div>
              <p style={{ margin: '2px 0 0' }}>{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {education.length > 0 && (
        <div style={{ marginBottom: '16px' }}>
          <h2 style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', borderBottom: '1px solid #000', paddingBottom: '2px', marginBottom: '8px' }}>Education</h2>
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: '4px' }}>{edu.degree}, {edu.institution}, {edu.year}</div>
          ))}
        </div>
      )}

      {skills.length > 0 && (
        <div style={{ marginBottom: '16px' }}>
          <h2 style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', borderBottom: '1px solid #000', paddingBottom: '2px', marginBottom: '6px' }}>Skills</h2>
          <p style={{ margin: 0 }}>{skills.join(', ')}</p>
        </div>
      )}

      {projects.length > 0 && (
        <div style={{ marginBottom: '16px' }}>
          <h2 style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', borderBottom: '1px solid #000', paddingBottom: '2px', marginBottom: '8px' }}>Projects</h2>
          {projects.map((p) => (
            <div key={p.id} style={{ marginBottom: '6px' }}>
              <strong>{p.name}</strong>{p.link ? ` (${p.link})` : ''} — {p.description}
            </div>
          ))}
        </div>
      )}

      {certifications.length > 0 && (
        <div>
          <h2 style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', borderBottom: '1px solid #000', paddingBottom: '2px', marginBottom: '6px' }}>Certifications</h2>
          {certifications.map((c) => (
            <div key={c.id} style={{ marginBottom: '4px' }}>{c.name} — {c.issuer}, {c.year}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AtsTemplate;
