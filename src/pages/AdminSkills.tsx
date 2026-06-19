import { useState } from 'react';
import { useData } from '../contexts/DataContext';

const emptySkill = { id: '', name: '', category: '', level: 50, icon: 'fas fa-code' };

export default function AdminSkills() {
  const { data, addSkill, updateSkill, deleteSkill } = useData();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptySkill);

  const resetForm = () => { setForm(emptySkill); setEditingId(null); };

  const startEdit = (id: string) => {
    const skill = data.skills.find(s => s.id === id);
    if (skill) { setForm({ ...skill }); setEditingId(id); }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateSkill(editingId, form);
    } else {
      addSkill({ ...form, id: Date.now().toString() });
    }
    resetForm();
  };

  return (
    <div>
      <div className="admin-header">
        <h2><i className="fas fa-code"></i> إدارة المهارات</h2>
      </div>

      <form className="admin-form" onSubmit={handleSave} style={{ marginBottom: 30 }}>
        <h3>{editingId ? 'تعديل المهارة' : 'إضافة مهارة جديدة'}</h3>
        <div className="form-row">
          <div>
            <label>اسم المهارة</label>
            <input value={form.name} onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))} required />
          </div>
          <div>
            <label>التصنيف</label>
            <input value={form.category} onChange={e => setForm(prev => ({ ...prev, category: e.target.value }))} required placeholder="مثال: تطوير ويب" />
          </div>
        </div>
        <div className="form-row">
          <div>
            <label>المستوى (0-100)</label>
            <input type="number" min={0} max={100} value={form.level} onChange={e => setForm(prev => ({ ...prev, level: parseInt(e.target.value) || 0 }))} />
          </div>
          <div>
            <label>أيقونة Font Awesome</label>
            <input value={form.icon} onChange={e => setForm(prev => ({ ...prev, icon: e.target.value }))} placeholder="fab fa-react" />
          </div>
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            <i className="fas fa-save"></i> {editingId ? 'تحديث' : 'إضافة'}
          </button>
          {editingId && <button type="button" className="btn btn-outline" onClick={resetForm}>إلغاء</button>}
        </div>
      </form>

      <div className="admin-list">
        {data.skills.map(skill => (
          <div key={skill.id} className="admin-item">
            <div className="admin-item-info">
              <h4><i className={skill.icon} style={{ marginLeft: 8, color: 'var(--accent)' }}></i>{skill.name}</h4>
              <p>{skill.category} - مستوى {skill.level}%</p>
            </div>
            <div className="admin-item-actions">
              <button className="btn btn-warning btn-sm" onClick={() => startEdit(skill.id)}>
                <i className="fas fa-edit"></i>
              </button>
              <button className="btn btn-danger btn-sm" onClick={() => { if (confirm('هل أنت متأكد؟')) deleteSkill(skill.id); }}>
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </div>
        ))}
        {data.skills.length === 0 && <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: 40 }}>لا توجد مهارات بعد</p>}
      </div>
    </div>
  );
}
