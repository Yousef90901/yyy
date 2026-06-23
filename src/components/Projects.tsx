import { useData } from '../contexts/DataContext';

export default function Projects() {
  const { data } = useData();

  return (
    <section className="section projects" id="projects">
      <div className="container">
        <div className="section-header">
          <span className="section-tag"><i className="fas fa-rocket"></i> مشاريعي</span>
          <h2 className="section-title">أحدث المشاريع</h2>
          <p className="section-subtitle">
            أعمالي في توظيف الذكاء الاصطناعي لخدمة القطاع الزراعي وتطوير البرامج والحلول الرقمية
          </p>
        </div>

        <div className="projects-grid">
          {data.projects.map((project, i) => (
            <div key={project.id} className={`project-card animate-in delay-${(i % 3) + 1}`}>
              <div className="project-image">
                {project.image ? (
                  <img src={project.image} alt={project.title} />
                ) : (
                  <i className="fas fa-leaf"></i>
                )}
                {project.featured && <span className="project-featured"><i className="fas fa-star"></i> مميز</span>}
              </div>
              <div className="project-body">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tech">
                  {project.technologies.map(t => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
                <div className="project-links">
                  {project.link && project.link !== '#' && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      <i className="fas fa-external-link-alt"></i> معاينة
                    </a>
                  )}
                  {project.github && project.github !== '#' && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-github"></i> كود
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
