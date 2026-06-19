import { useState } from 'react';
import { useData } from '../contexts/DataContext';

const emptyExp = { id: '', title: '', company: '', description: '', startDate: '', endDate: '', current: false };

export default function AdminExperience() {
  const { data, addExperience, updateExperience, deleteExperience } = useData();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyExp);

  const resetForm = () => { setForm(emptyExp); setEditingId(null); };

  const startEdit = (id: string) => {
    const exp = data.experiences.find(e => e.id === id);
    if (exp) { setForm({ ...exp }); setEditingId(id); }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateExperience(editingId, form);
    } else {
      addExperience({ ...form, id: Date.now().toString() });
    }
    resetForm();
  };

  return (
    <div>
      <div className="admin-header">
        <h2><i className="fas fa-briefcase"></i> إدارة الخبرات</h2>
      </div>

      <form className="admin-form" onSubmit={handleSave} style={{ marginBottom: 30 }}>
        <h3>{editingId ? 'تعديل الخبرة' : 'إضافة خبرة جديدة'}</h3>
        <div className="form-row">
          <div>
            <label>المسمى الوظيفي</label>
            <input value={form.title} onChange={e => setForm(prev => ({ ...prev, title: e.target.value }))} required />
          </div>
          <div>
            <label>الشركة / المؤسسة</label>
            <input value={form.company} onChange={e => setForm(prev => ({ ...prev, company: e.target.value }))} required />
          </div>
        </div>
        <div>
          <label>الوصف</label>
          <textarea value={form.description} onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))} required />
        </div>
        <div className="form-row">
          <div>
            <label>تاريخ البداية</label>
            <input type="month" value={form.startDate} onChange={e => setForm(prev => ({ ...prev, startDate: e.target.value }))} />
          </div>
          <div>
            <label>تاريخ النهاية</label>
            <input type="month" value={form.endDate} onChange={e => setForm(prev => ({ ...prev, endDate: e.target.value }))} disabled={form.current} />
          </div>
        </div>
        <div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input type="checkbox" checked={form.current} onChange={e => setForm(prev => ({ ...prev, current: e.target.checked, endDate: '' }))} />
            أعمل حالياً هنا
          </label>
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            <i className="fas fa-save"></i> {editingId ? 'تحديث' : 'إضافة'}
          </button>
          {editingId && <button type="button" className="btn btn-outline" onClick={resetForm}>إلغاء</button>}
        </div>
      </form>

      <div className="admin-list">
        {data.experiences.map(exp => (
          <div key={exp.id} className="admin-item">
            <div className="admin-item-info">
              <h4>{exp.title} {exp.current && <span style={{ color: 'var(--accent)', fontSize: '0.8rem' }}>🔵 حالياً</span>}</h4>
              <p>{exp.company} - {exp.startDate} إلى {exp.current ? 'الآن' : exp.endDate}</p>
            </div>
            <div className="admin-item-actions">
              <button className="btn btn-warning btn-sm" onClick={() => startEdit(exp.id)}>
                <i className="fas fa-edit"></i>
              </button>
              <button className="btn btn-danger btn-sm" onClick={() => { if (confirm('هل أنت متأكد؟')) deleteExperience(exp.id); }}>
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </div>
        ))}
        {data.experiences.length === 0 && <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: 40 }}>لا توجد خبرات بعد</p>}
      </div>
    </div>
  );
}
