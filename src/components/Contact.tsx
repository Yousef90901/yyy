import { useData } from '../contexts/DataContext';

export default function Contact() {
  const { data } = useData();
  const { profile } = data;

  return (
    <section className="section contact" id="contact">
      <div className="container">
        <div className="section-header">
          <span className="section-tag" style={{ background: 'rgba(82,183,136,0.2)', color: 'var(--accent)' }}>
            <i className="fas fa-envelope"></i> تواصل
          </span>
          <h2 className="section-title" style={{ color: 'white' }}>هيا نعمل معاً</h2>
          <p className="section-subtitle">
           我有 فكرة مشروع؟ تواصل معي وسنحولها إلى واقع
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-info animate-in">
            <h3>لنصنع شيئاً رائعاً</h3>
            <p>
              أنا متاح للعمل الحر والمشاريع المثيرة. إذا كانت لديك فكرة مشروع
              أو استشارة في مجال الزراعة الذكية والذكاء الاصطناعي، فلا تتردد في التواصل.
            </p>

            <div className="contact-item">
              <div className="icon"><i className="fas fa-envelope"></i></div>
              <div>
                <div className="label">البريد الإلكتروني</div>
                <div className="text">{profile.email}</div>
              </div>
            </div>

            <div className="contact-item">
              <div className="icon"><i className="fas fa-phone"></i></div>
              <div>
                <div className="label">رقم الهاتف</div>
                <div className="text">{profile.phone}</div>
              </div>
            </div>

            <div className="contact-item">
              <div className="icon"><i className="fas fa-map-marker-alt"></i></div>
              <div>
                <div className="label">الموقع</div>
                <div className="text">{profile.location}</div>
              </div>
            </div>

            <div className="contact-social">
              {profile.socialLinks.map(link => (
                <a key={link.platform} href={link.url} target="_blank" rel="noopener noreferrer" title={link.platform}>
                  <i className={link.icon}></i>
                </a>
              ))}
            </div>
          </div>

          <form className="contact-form animate-in delay-1" onSubmit={e => { e.preventDefault(); alert('تم إرسال الرسالة بنجاح!'); }}>
            <div className="form-group">
              <input type="text" placeholder="الاسم كامل" required />
            </div>
            <div className="form-group">
              <input type="email" placeholder="البريد الإلكتروني" required />
            </div>
            <div className="form-group">
              <input type="text" placeholder="الموضوع" />
            </div>
            <div className="form-group">
              <textarea placeholder="رسالتك..." required></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              <i className="fas fa-paper-plane"></i> إرسال الرسالة
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
