import { useState, useRef } from 'react';
import { useData } from '../contexts/DataContext';

const emptyProject = {
  id: '', title: '', description: '', technologies: [] as string[],
  image: '', link: '', github: '', featured: false, date: ''
};

export default function AdminProjects() {
  const { data, addProject, updateProject, deleteProject } = useData();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyProject);
  const [techInput, setTechInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetForm = () => {
    setForm(emptyProject);
    setEditingId(null);
    setTechInput('');
  };

  const startEdit = (id: string) => {
    const project = data.projects.find(p => p.id === id);
    if (project) {
      setForm({ ...emptyProject, ...project, link: project.link ?? '', github: project.github ?? '' });
      setEditingId(id);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let w = img.width, h = img.height;
        const max = 800;
        if (w > max || h > max) {
          if (w > h) { h = (h / w) * max; w = max; }
          else { w = (w / h) * max; h = max; }
        }
        canvas.width = w; canvas.height = h;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0, w, h);
        setForm(prev => ({ ...prev, image: canvas.toDataURL('image/jpeg', 0.8) }));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateProject(editingId, form);
    } else {
      addProject({ ...form, id: Date.now().toString() });
    }
    resetForm();
  };

  const addTech = () => {
    if (techInput.trim()) {
      setForm(prev => ({ ...prev, technologies: [...prev.technologies, techInput.trim()] }));
      setTechInput('');
    }
  };

  const removeTech = (idx: number) => {
    setForm(prev => ({ ...prev, technologies: prev.technologies.filter((_, i) => i !== idx) }));
  };

  return (
    <div>
      <div className="admin-header">
        <h2><i className="fas fa-rocket"></i> إدارة المشاريع</h2>
      </div>

      <form className="admin-form" onSubmit={handleSave} style={{ marginBottom: 30 }}>
        <h3>{editingId ? 'تعديل المشروع' : 'إضافة مشروع جديد'}</h3>
        <div className="form-row">
          <div>
            <label>عنوان المشروع</label>
            <input value={form.title} onChange={e => setForm(prev => ({ ...prev, title: e.target.value }))} required />
          </div>
          <div>
            <label>التاريخ</label>
            <input type="month" value={form.date} onChange={e => setForm(prev => ({ ...prev, date: e.target.value }))} />
          </div>
        </div>
        <div>
          <label>الوصف</label>
          <textarea value={form.description} onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))} required />
        </div>
        <div className="form-row">
          <div>
            <label>رابط الصورة (URL)</label>
            <input value={form.image} onChange={e => setForm(prev => ({ ...prev, image: e.target.value }))} placeholder="https://..." />
          </div>
          <div>
            <label>رابط المشروع</label>
            <input value={form.link} onChange={e => setForm(prev => ({ ...prev, link: e.target.value }))} />
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label>أو رفع صورة من الجهاز</label>
          <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} style={{ marginTop: 6 }} />
          {form.image && (
            <div style={{ marginTop: 8 }}>
              <img src={form.image} alt="Preview" style={{ width: 120, height: 80, borderRadius: 8, objectFit: 'cover', border: '2px solid var(--accent)' }} />
            </div>
          )}
        </div>

        <div className="form-row">
          <div>
            <label>رابط GitHub</label>
            <input value={form.github} onChange={e => setForm(prev => ({ ...prev, github: e.target.value }))} />
          </div>
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 24 }}>
              <input type="checkbox" checked={form.featured} onChange={e => setForm(prev => ({ ...prev, featured: e.target.checked }))} />
              مشروع مميز
            </label>
          </div>
        </div>
        <div>
          <label>التقنيات المستخدمة</label>
          <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
            <input value={techInput} onChange={e => setTechInput(e.target.value)} placeholder="أضف تقنية" style={{ flex: 1 }} />
            <button type="button" className="btn btn-primary btn-sm" onClick={addTech}>
              <i className="fas fa-plus"></i> إضافة
            </button>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {form.technologies.map((t, i) => (
              <span key={i} className="tag" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                {t}
                <button type="button" onClick={() => removeTech(i)} style={{ background: 'none', color: 'red', fontSize: '0.8rem', padding: 0, border: 'none' }}>
                  <i className="fas fa-times"></i>
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            <i className="fas fa-save"></i> {editingId ? 'تحديث' : 'إضافة'}
          </button>
          {editingId && (
            <button type="button" className="btn btn-outline" onClick={resetForm}>إلغاء</button>
          )}
        </div>
      </form>

      <div className="admin-list">
        {data.projects.map(project => (
          <div key={project.id} className="admin-item">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              {project.image && (
                <img src={project.image} alt="" style={{ width: 50, height: 50, borderRadius: 8, objectFit: 'cover' }} />
              )}
              <div className="admin-item-info">
                <h4>{project.title} {project.featured && <span style={{ color: 'var(--accent)', fontSize: '0.8rem' }}>⭐ مميز</span>}</h4>
                <p>{project.description.slice(0, 100)}...</p>
              </div>
            </div>
            <div className="admin-item-actions">
              <button className="btn btn-warning btn-sm" onClick={() => startEdit(project.id)}>
                <i className="fas fa-edit"></i>
              </button>
              <button className="btn btn-danger btn-sm" onClick={() => { if (confirm('هل أنت متأكد؟')) deleteProject(project.id); }}>
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </div>
        ))}
        {data.projects.length === 0 && <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: 40 }}>لا توجد مشاريع بعد</p>}
      </div>
    </div>
  );
}
