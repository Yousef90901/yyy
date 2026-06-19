import { useData } from '../contexts/DataContext';

export default function AdminDashboard() {
  const { data } = useData();
  const totalSkills = data.skills.length;
  const totalProjects = data.projects.length;
  const totalExperiences = data.experiences.length;
  const totalTestimonials = data.testimonials.length;

  return (
    <div>
      <div className="admin-header">
        <h2>مرحبا بك يا <span style={{ color: 'var(--accent)' }}>{data.profile.name}</span> 👋</h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20, marginBottom: 40, direction: 'rtl' }}>
        {[
          { label: 'المهارات', value: totalSkills, icon: 'fas fa-code', color: '#52b788' },
          { label: 'المشاريع', value: totalProjects, icon: 'fas fa-rocket', color: '#2d6a4f' },
          { label: 'الخبرات', value: totalExperiences, icon: 'fas fa-briefcase', color: '#1b4332' },
          { label: 'التوصيات', value: totalTestimonials, icon: 'fas fa-comments', color: '#95d5b2' },
        ].map((item, i) => (
          <div key={i} className="card" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 56, height: 56, borderRadius: 14, background: `${item.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', color: item.color }}>
              <i className={item.icon}></i>
            </div>
            <div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary-dark)', lineHeight: 1 }}>{item.value}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{item.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="card" style={{ direction: 'rtl' }}>
        <h3 style={{ marginBottom: 16, color: 'var(--primary-dark)', fontSize: '1.2rem' }}>
          <i className="fas fa-info-circle" style={{ marginLeft: 8, color: 'var(--accent)' }}></i>
          معلومات سريعة
        </h3>
        <div style={{ display: 'grid', gap: 12 }}>
          <p style={{ color: 'var(--text-muted)' }}>
            <strong>البريد:</strong> {data.profile.email}
          </p>
          <p style={{ color: 'var(--text-muted)' }}>
            <strong>الهاتف:</strong> {data.profile.phone}
          </p>
          <p style={{ color: 'var(--text-muted)' }}>
            <strong>الموقع:</strong> {data.profile.location}
          </p>
          <p style={{ color: 'var(--text-muted)' }}>
            <strong>عدد روابط التواصل:</strong> {data.profile.socialLinks.length}
          </p>
        </div>
      </div>

      <div style={{ marginTop: 24 }} className="card">
        <h3 style={{ marginBottom: 16, color: 'var(--primary-dark)', fontSize: '1.2rem' }}>
          <i className="fas fa-tasks" style={{ marginLeft: 8, color: 'var(--accent)' }}></i>
          إجراءات سريعة
        </h3>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <a href="/yyy/admin/profile" className="btn btn-primary btn-sm">
            <i className="fas fa-user-edit"></i> تعديل الملف الشخصي
          </a>
          <a href="/yyy/admin/projects" className="btn btn-primary btn-sm">
            <i className="fas fa-plus"></i> إدارة المشاريع
          </a>
          <a href="/yyy/admin/skills" className="btn btn-primary btn-sm">
            <i className="fas fa-plus"></i> إدارة المهارات
          </a>
        </div>
      </div>
    </div>
  );
}
