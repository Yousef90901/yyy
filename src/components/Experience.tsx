import { useData } from '../contexts/DataContext';

const months: Record<string, string> = {
  '01': 'يناير', '02': 'فبراير', '03': 'مارس', '04': 'إبريل',
  '05': 'مايو', '06': 'يونيو', '07': 'يوليو', '08': 'أغسطس',
  '09': 'سبتمبر', '10': 'أكتوبر', '11': 'نوفمبر', '12': 'ديسمبر'
};

function formatDate(d: string) {
  if (!d) return '';
  const [y, m] = d.split('-');
  return `${months[m] || m} ${y}`;
}

export default function Experience() {
  const { data } = useData();

  return (
    <section className="section experience" id="experience">
      <div className="container">
        <div className="section-header">
          <span className="section-tag"><i className="fas fa-briefcase"></i> الخبرات</span>
          <h2 className="section-title">المسيرة المهنية</h2>
          <p className="section-subtitle">
            رحلة الخبرات والمشوار المهني في مجال الزراعة والذكاء الاصطناعي
          </p>
        </div>

        <div className="timeline">
          {data.experiences.map((exp, i) => (
            <div key={exp.id} className={`timeline-item animate-in delay-${(i % 3) + 1}`}>
              <div className={`timeline-dot ${exp.current ? 'current' : ''}`}></div>
              <div className="timeline-content">
                <span className="timeline-date">
                  <i className="fas fa-calendar-alt"></i>
                  {formatDate(exp.startDate)} - {exp.current ? 'الآن' : formatDate(exp.endDate)}
                  {exp.current && <span className="current-badge">حالياً</span>}
                </span>
                <h3>{exp.title}</h3>
                <p className="company">{exp.company}</p>
                <p>{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
