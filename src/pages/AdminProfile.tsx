import { useState, useRef } from 'react';
import { useData } from '../contexts/DataContext';

export default function AdminProfile() {
  const { data, updateProfile } = useData();
  const p = data.profile;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({ ...p });
  const [socialText, setSocialText] = useState(
    p.socialLinks.map(l => `${l.platform}::${l.url}::${l.icon}`).join('\n')
  );
  const [aboutText, setAboutText] = useState(p.aboutText.join('\n'));
  const [statsText, setStatsText] = useState(
    p.stats.map(s => `${s.label}::${s.value}::${s.icon}`).join('\n')
  );
  const [saved, setSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
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
        const max = 400;
        if (w > max || h > max) {
          if (w > h) { h = (h / w) * max; w = max; }
          else { w = (w / h) * max; h = max; }
        }
        canvas.width = w; canvas.height = h;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0, w, h);
        setForm(prev => ({ ...prev, photo: canvas.toDataURL('image/jpeg', 0.7) }));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const socialLinks = socialText.split('\n').filter(l => l.trim()).map(l => {
      const parts = l.split('::');
      return { platform: parts[0]?.trim() || '', url: parts[1]?.trim() || '', icon: parts[2]?.trim() || 'fas fa-link' };
    });
    const aboutTextLines = aboutText.split('\n').filter(l => l.trim());
    const stats = statsText.split('\n').filter(l => l.trim()).map(l => {
      const parts = l.split('::');
      return { label: parts[0]?.trim() || '', value: parts[1]?.trim() || '', icon: parts[2]?.trim() || 'fas fa-star' };
    });
    updateProfile({ ...form, socialLinks, aboutText: aboutTextLines, stats });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      <div className="admin-header">
        <h2><i className="fas fa-user-edit"></i> تعديل الملف الشخصي</h2>
      </div>

      <form className="admin-form" onSubmit={handleSave}>
        <h3>المعلومات الأساسية</h3>
        <div className="form-row">
          <div>
            <label>الاسم</label>
            <input name="name" value={form.name} onChange={handleChange} />
          </div>
          <div>
            <label>اللقب المهني (عربي)</label>
            <input name="title" value={form.title} onChange={handleChange} />
          </div>
        </div>
        <div className="form-row">
          <div>
            <label>اللقب المهني (English)</label>
            <input name="titleEn" value={form.titleEn} onChange={handleChange} />
          </div>
          <div>
            <label>رابط الصورة الشخصية</label>
            <input name="photo" value={form.photo} onChange={handleChange} placeholder="https://..." />
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <label>رفع صورة من الجهاز</label>
          <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} style={{ marginTop: 6 }} />
          {form.photo && (
            <div style={{ marginTop: 10 }}>
              <img src={form.photo} alt="Preview" style={{ width: 100, height: 100, borderRadius: 12, objectFit: 'cover', border: '2px solid var(--accent)' }} />
            </div>
          )}
        </div>

        <div>
          <label>نبذة مختصرة (Bio)</label>
          <textarea name="bio" value={form.bio} onChange={handleChange} />
        </div>

        <h3 style={{ marginTop: 24 }}>معلومات الاتصال</h3>
        <div className="form-row">
          <div>
            <label>البريد الإلكتروني</label>
            <input name="email" value={form.email} onChange={handleChange} />
          </div>
          <div>
            <label>رقم الهاتف</label>
            <input name="phone" value={form.phone} onChange={handleChange} />
          </div>
        </div>
        <div>
          <label>الموقع</label>
          <input name="location" value={form.location} onChange={handleChange} />
        </div>

        <h3 style={{ marginTop: 24 }}>روابط التواصل الاجتماعي</h3>
        <div>
          <label>كل سطر: <code>المنصة::الرابط::الأيقونة</code></label>
          <textarea value={socialText} onChange={e => setSocialText(e.target.value)} style={{ minHeight: 100 }} />
          <small style={{ color: 'var(--text-muted)' }}>مثال: LinkedIn::https://linkedin.com/in/user::fab fa-linkedin-in</small>
        </div>

        <h3 style={{ marginTop: 24 }}>نبذة عنّي (كل سطر فقرة)</h3>
        <textarea value={aboutText} onChange={e => setAboutText(e.target.value)} style={{ minHeight: 100 }} />

        <h3 style={{ marginTop: 24 }}>الإحصائيات (كل سطر: <code>التسمية::القيمة::الأيقونة</code>)</h3>
        <textarea value={statsText} onChange={e => setStatsText(e.target.value)} style={{ minHeight: 80 }} />

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            <i className="fas fa-save"></i> حفظ التغييرات
          </button>
          {saved && <span style={{ color: 'var(--accent)', fontWeight: 600 }}>✓ تم الحفظ بنجاح</span>}
        </div>
      </form>
    </div>
  );
}
