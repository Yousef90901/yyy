import { useState, useRef } from 'react';
import { useData } from '../contexts/DataContext';

export default function AdminSettings() {
  const { data, updateTheme, resetData } = useData();
  const [theme, setTheme] = useState(data.theme);
  const [newPass, setNewPass] = useState('');
  const [saved, setSaved] = useState(false);
  const importRef = useRef<HTMLInputElement>(null);

  const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTheme(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const saveTheme = (e: React.FormEvent) => {
    e.preventDefault();
    updateTheme(theme);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const changePassword = () => {
    if (newPass.length < 4) { alert('كلمة المرور يجب أن تكون 4 أحرف على الأقل'); return; }
    localStorage.setItem('yt_portfolio_data', JSON.stringify({ ...data, adminPassword: newPass }));
    alert('✅ تم تغيير كلمة المرور بنجاح');
    setNewPass('');
  };

  const handleExport = () => {
    const exportData = { ...data, _version: undefined };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'portfolio-data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const imported = JSON.parse(reader.result as string);
        localStorage.setItem('yt_portfolio_data', JSON.stringify({ ...imported, _version: 2 }));
        alert('✅ تم استيراد البيانات بنجاح. سيتم إعادة تحميل الصفحة.');
        window.location.reload();
      } catch { alert('❌ فشل قراءة الملف. تأكد من أنه بصيغة JSON صحيحة.'); }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (confirm('⚠️ هل أنت متأكد؟ سيتم حذف جميع التغييرات وإعادة البيانات الافتراضية!')) {
      if (confirm('تأكيد نهائي؟ لا يمكن التراجع عن هذا الإجراء!')) {
        resetData();
        alert('✅ تم إعادة تعيين البيانات بنجاح');
        window.location.reload();
      }
    }
  };

  return (
    <div>
      <div className="admin-header">
        <h2><i className="fas fa-cog"></i> الإعدادات</h2>
      </div>

      <form className="admin-form" onSubmit={saveTheme} style={{ marginBottom: 30 }}>
        <h3>تخصيص الألوان</h3>
        <div className="form-row">
          <div>
            <label>اللون الأساسي</label>
            <input type="color" name="primary" value={theme.primary} onChange={handleThemeChange} style={{ height: 50, padding: 4 }} />
          </div>
          <div>
            <label>اللون الثانوي</label>
            <input type="color" name="secondary" value={theme.secondary} onChange={handleThemeChange} style={{ height: 50, padding: 4 }} />
          </div>
        </div>
        <div className="form-row">
          <div>
            <label>لون التمييز</label>
            <input type="color" name="accent" value={theme.accent} onChange={handleThemeChange} style={{ height: 50, padding: 4 }} />
          </div>
          <div>
            <label>الخلفية الداكنة</label>
            <input type="color" name="darkBg" value={theme.darkBg} onChange={handleThemeChange} style={{ height: 50, padding: 4 }} />
          </div>
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            <i className="fas fa-palette"></i> حفظ الألوان
          </button>
          {saved && <span style={{ color: 'var(--accent)', fontWeight: 600 }}>✓ تم الحفظ</span>}
        </div>
      </form>

      <div className="admin-form" style={{ marginBottom: 30 }}>
        <h3>تغيير كلمة المرور</h3>
        <div className="form-row">
          <div>
            <label>كلمة المرور الجديدة</label>
            <input type="text" value={newPass} onChange={e => setNewPass(e.target.value)} placeholder="أدخل كلمة المرور الجديدة" />
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <button type="button" className="btn btn-primary" onClick={changePassword}>
              <i className="fas fa-key"></i> تغيير كلمة المرور
            </button>
          </div>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: 8 }}>
          كلمة المرور الحالية: <strong>{data.adminPassword}</strong>
        </p>
      </div>

      <div className="admin-form" style={{ marginBottom: 30 }}>
        <h3>تصدير / استيراد البيانات</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: 16 }}>
          صدر بياناتك كملف JSON، ثم استبدل بها ملف <code>src/data/defaultData.ts</code> و rebuild عشان التغييرات تظهر لكل الزوار.
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button type="button" className="btn btn-primary" onClick={handleExport}>
            <i className="fas fa-download"></i> تصدير البيانات
          </button>
          <button type="button" className="btn btn-outline" onClick={() => importRef.current?.click()}>
            <i className="fas fa-upload"></i> استيراد بيانات
          </button>
          <input type="file" accept=".json" ref={importRef} onChange={handleImport} style={{ display: 'none' }} />
        </div>
      </div>

      <div className="admin-form">
        <h3 style={{ color: '#dc3545' }}>إعادة تعيين البيانات</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: 16 }}>
          يؤدي هذا إلى حذف جميع التغييرات وإعادة البيانات الافتراضية
        </p>
        <button type="button" className="btn btn-danger" onClick={handleReset}>
          <i className="fas fa-undo"></i> إعادة تعيين الكل
        </button>
      </div>
    </div>
  );
}
