import { useData } from '../contexts/DataContext';

export default function Skills() {
  const { data } = useData();
  const categories = [...new Set(data.skills.map(s => s.category))];

  return (
    <section className="section skills" id="skills">
      <div className="container">
        <div className="section-header">
          <span className="section-tag"><i className="fas fa-code"></i> مهاراتي</span>
          <h2 className="section-title">الخبرات والمهارات التقنية</h2>
          <p className="section-subtitle">
            أمتلك مجموعة متنوعة من المهارات في البرمجة والذكاء الاصطناعي والزراعة الذكية
          </p>
        </div>

        {categories.map((cat, ci) => (
          <div key={ci} style={{ marginBottom: 40 }}>
            <h3 style={{ color: 'var(--primary-dark)', marginBottom: 16, fontSize: '1.2rem' }}>
              <i className="fas fa-folder-open" style={{ marginLeft: 8, color: 'var(--accent)' }}></i>
              {cat}
            </h3>
            <div className="skills-grid">
              {data.skills.filter(s => s.category === cat).map((skill, i) => (
                <div key={skill.id} className={`skill-card animate-in delay-${(i % 4) + 1}`}>
                  <div className="skill-icon"><i className={skill.icon}></i></div>
                  <h4>{skill.name}</h4>
                  <p className="skill-category">{skill.category}</p>
                  <div className="skill-bar">
                    <div className="skill-bar-fill" style={{ width: `${skill.level}%` }} data-level={`${skill.level}%`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
