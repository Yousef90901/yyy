import { useData } from '../contexts/DataContext';

export default function Testimonials() {
  const { data } = useData();

  if (data.testimonials.length === 0) return null;

  return (
    <section className="section testimonials" id="testimonials">
      <div className="container">
        <div className="section-header">
          <span className="section-tag"><i className="fas fa-comments"></i> آراء العملاء</span>
          <h2 className="section-title">ماذا يقولون عنّي</h2>
          <p className="section-subtitle">
            شهادات وتوصيات من عملاء وزملاء في مجال العمل
          </p>
        </div>

        <div className="testimonials-grid">
          {data.testimonials.map((t, i) => (
            <div key={t.id} className={`testimonial-card animate-in delay-${(i % 3) + 1}`}>
              <p className="testimonial-text">"{t.text}"</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">
                  {t.avatar ? <img src={t.avatar} alt={t.name} /> : t.name.charAt(0)}
                </div>
                <div className="testimonial-author-info">
                  <h4>{t.name}</h4>
                  <span>{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
