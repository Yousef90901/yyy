import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { data } = useData();
  const { login } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [showAdminInput, setShowAdminInput] = useState(false);
  const [adminPass, setAdminPass] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'الرئيسية', href: '#hero' },
    { label: 'عنّي', href: '#about' },
    { label: 'مهاراتي', href: '#skills' },
    { label: 'مشاريعي', href: '#projects' },
    { label: 'الخبرات', href: '#experience' },
    { label: 'تواصل', href: '#contact' },
  ];

  const handleLogoClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    if (newCount >= 6) {
      setShowAdminInput(true);
      setClickCount(0);
    }
  };

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(adminPass)) {
      setShowAdminInput(false);
      setAdminPass('');
      navigate('/admin/dashboard');
    } else {
      alert('❌ كلمة المرور غير صحيحة');
      setAdminPass('');
      setShowAdminInput(false);
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <a href="#hero" className="logo" onClick={handleLogoClick}>
          <i className="fas fa-leaf"></i>
          المهندس
        </a>

        <button className="nav-toggle" onClick={() => setOpen(!open)}>
          <i className={`fas ${open ? 'fa-times' : 'fa-bars'}`}></i>
        </button>

        <div className={`nav-links ${open ? 'open' : ''}`}>
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
          ))}
        </div>
      </div>

      {showAdminInput && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)'
        }} onClick={() => { setShowAdminInput(false); setAdminPass(''); }}>
          <form onSubmit={handleAdminSubmit} onClick={e => e.stopPropagation()} style={{
            background: '#1a1a2e', padding: 40, borderRadius: 20,
            border: '1px solid rgba(255,255,255,0.1)', width: 340, textAlign: 'center'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: 16, color: '#52b788' }}>
              <i className="fas fa-lock"></i>
            </div>
            <h3 style={{ color: 'white', marginBottom: 8, fontSize: '1.3rem' }}>دخول المدير</h3>
            <p style={{ color: 'rgba(255,255,255,0.4)', marginBottom: 24, fontSize: '0.9rem' }}>
              أدخل كلمة المرور للوصول للوحة التحكم
            </p>
            <input
              type="password" value={adminPass}
              onChange={e => setAdminPass(e.target.value)}
              placeholder="كلمة المرور"
              autoFocus
              style={{
                width: '100%', padding: '14px 16px', borderRadius: 12,
                background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
                color: 'white', fontSize: '1rem', marginBottom: 16
              }}
            />
            <button type="submit" style={{
              width: '100%', padding: '14px', borderRadius: 12,
              background: 'linear-gradient(135deg, #2d6a4f, #52b788)', color: 'white',
              fontWeight: 700, fontSize: '1rem', border: 'none', cursor: 'pointer'
            }}>
              <i className="fas fa-sign-in-alt"></i> دخول
            </button>
          </form>
        </div>
      )}
    </nav>
  );
}
