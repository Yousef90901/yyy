import { useState } from 'react';
import { useData } from '../contexts/DataContext';

const emptyTest = { id: '', name: '', role: '', text: '', avatar: '' };

export default function AdminTestimonials() {
  const { data, addTestimonial, updateTestimonial, deleteTestimonial } = useData();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyTest);

  const resetForm = () => { setForm(emptyTest); setEditingId(null); };

  const startEdit = (id: string) => {
    const t = data.testimonials.find(x => x.id === id);
    if (t) { setForm({ ...t }); setEditingId(id); }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateTestimonial(editingId, form);
    } else {
      addTestimonial({ ...form, id: Date.now().toString() });
    }
    resetForm();
  };

  return (
    <div>
      <div className="admin-header">
        <h2><i className="fas fa-comments"></i> إدارة التوصيات</h2>
      </div>

      <form className="admin-form" onSubmit={handleSave} style={{ marginBottom: 30 }}>
        <h3>{editingId ? 'تعديل التوصية' : 'إضافة توصية جديدة'}</h3>
        <div className="form-row">
          <div>
            <label>الاسم</label>
            <input value={form.name} onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))} required />
          </div>
          <div>
            <label>الدور / المنصب</label>
            <input value={form.role} onChange={e => setForm(prev => ({ ...prev, role: e.target.value }))} required />
          </div>
        </div>
        <div>
          <label>نص التوصية</label>
          <textarea value={form.text} onChange={e => setForm(prev => ({ ...prev, text: e.target.value }))} required />
        </div>
        <div>
          <label>رابط الصورة (اختياري)</label>
          <input value={form.avatar} onChange={e => setForm(prev => ({ ...prev, avatar: e.target.value }))} placeholder="https://..." />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            <i className="fas fa-save"></i> {editingId ? 'تحديث' : 'إضافة'}
          </button>
          {editingId && <button type="button" className="btn btn-outline" onClick={resetForm}>إلغاء</button>}
        </div>
      </form>

      <div className="admin-list">
        {data.testimonials.map(t => (
          <div key={t.id} className="admin-item">
            <div className="admin-item-info">
              <h4>{t.name} - {t.role}</h4>
              <p>"{t.text.slice(0, 80)}..."</p>
            </div>
            <div className="admin-item-actions">
              <button className="btn btn-warning btn-sm" onClick={() => startEdit(t.id)}>
                <i className="fas fa-edit"></i>
              </button>
              <button className="btn btn-danger btn-sm" onClick={() => { if (confirm('هل أنت متأكد؟')) deleteTestimonial(t.id); }}>
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </div>
        ))}
        {data.testimonials.length === 0 && <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: 40 }}>لا توجد توصيات بعد</p>}
      </div>
    </div>
  );
}
