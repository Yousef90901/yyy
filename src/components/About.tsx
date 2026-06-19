import { useData } from '../contexts/DataContext';

export default function About() {
  const { data } = useData();
  const { profile } = data;

  return (
    <section className="section about" id="about">
      <div className="container">
        <div className="about-grid">
          <div className="about-image-wrapper animate-in">
            <div className="about-image-box">
              <div className="about-inner">
                <div className="big-icon"><i className="fas fa-leaf"></i></div>
                <h3>{profile.name}</h3>
                <p>{profile.title}</p>
              </div>
            </div>
            <div className="about-experience-badge">
              <span className="number">{profile.stats[1]?.value || '2'}</span>
              <span className="label">سنة خبرة</span>
            </div>
          </div>

          <div className="about-text animate-in delay-1">
            <span className="section-tag"><i className="fas fa-user"></i> عنّي</span>
            <h2 className="about-title">{profile.aboutTitle}</h2>
            {profile.aboutText.map((t, i) => (
              <p key={i}>{t}</p>
            ))}

            <div className="stats-grid">
              {profile.stats.map((stat, i) => (
                <div key={i} className="stat-item">
                  <div className="icon"><i className={stat.icon}></i></div>
                  <div className="value">{stat.value}</div>
                  <div className="label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
