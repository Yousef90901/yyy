import { useEffect, useState } from 'react';
import { useData } from '../contexts/DataContext';

export default function Hero() {
  const { data } = useData();
  const { profile } = data;
  const [typed, setTyped] = useState('');
  const [showSecond, setShowSecond] = useState(false);
  const fullText = 'Agricultural Engineer | AI Specialist';

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTyped(fullText.slice(0, i + 1));
      i++;
      if (i >= fullText.length) {
        clearInterval(interval);
        setTimeout(() => setShowSecond(true), 400);
      }
    }, 45);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero" id="hero">
      <div className="hero-bg-shapes">
        <div className="hero-shape"></div>
        <div className="hero-shape"></div>
        <div className="hero-shape"></div>
        <div className="hero-grid"></div>
        <div className="hero-glow"></div>
      </div>

      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-badge">
              <span className="hero-badge-dot"></span>
              متاح للعمل
            </div>

            <h1 className="hero-title">
              <span className="hero-title-line hero-title-small">المهندس</span>
              <span className="hero-title-line hero-title-big">
                {profile.name}
              </span>
              <span className="hero-gradient-text">{profile.title}</span>
            </h1>

            <p className="hero-typed-wrapper">
              <span className="hero-typed">{typed}</span>
              <span className="hero-cursor">|</span>
            </p>

            <p className={`hero-bio ${showSecond ? 'visible' : ''}`}>
              {profile.bio}
            </p>

            <div className={`hero-buttons ${showSecond ? 'visible' : ''}`}>
              <a href="#projects" className="hero-btn hero-btn-primary">
                <span>مشاريعي</span>
                <i className="fas fa-arrow-left"></i>
              </a>
              <a href="#contact" className="hero-btn hero-btn-outline">
                <i className="fas fa-envelope"></i>
                <span>تواصل معي</span>
              </a>
              <a href="#about" className="hero-btn hero-btn-ghost">
                <i className="fas fa-chevron-down"></i>
              </a>
            </div>

            <div className={`hero-stats ${showSecond ? 'visible' : ''}`}>
              {profile.stats.slice(0, 3).map((stat, i) => (
                <div key={i} className="hero-stat">
                  <span className="hero-stat-value">{stat.value}</span>
                  <span className="hero-stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-profile-ring">
              <div className="hero-profile-ring-inner"></div>
              <div className="hero-avatar-frame">
                {profile.photo ? (
                  <img src={profile.photo} alt={profile.name} />
                ) : (
                  <div className="hero-avatar-placeholder">
                    <i className="fas fa-user-graduate"></i>
                  </div>
                )}
              </div>
              <div className="hero-orbit">
                <div className="hero-orbit-dot" style={{ '--i': 0 } as React.CSSProperties}></div>
                <div className="hero-orbit-dot" style={{ '--i': 1 } as React.CSSProperties}></div>
                <div className="hero-orbit-dot" style={{ '--i': 2 } as React.CSSProperties}></div>
              </div>
            </div>

            <div className="hero-tech-icons">
              <div className="hero-tech-icon" style={{ top: '10%', right: '5%', animationDelay: '0s' }}>
                <i className="fab fa-react"></i>
              </div>
              <div className="hero-tech-icon" style={{ top: '30%', left: '0%', animationDelay: '1s' }}>
                <i className="fab fa-python"></i>
              </div>
              <div className="hero-tech-icon" style={{ bottom: '25%', right: '0%', animationDelay: '2s' }}>
                <i className="fas fa-brain"></i>
              </div>
              <div className="hero-tech-icon" style={{ bottom: '10%', left: '10%', animationDelay: '0.5s' }}>
                <i className="fas fa-leaf"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-scroll-indicator">
        <span>اسحب للأسفل</span>
        <i className="fas fa-chevron-down"></i>
      </div>
    </section>
  );
}
