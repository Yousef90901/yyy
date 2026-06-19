import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      navigate('/admin/dashboard');
    } else {
      setError('❌ كلمة المرور غير صحيحة');
    }
  };

  return (
    <div className="login-page">
      <form className="login-box" onSubmit={handleSubmit}>
        <div className="lock-icon">
          <i className="fas fa-crown"></i>
        </div>
        <h2>لوحة التحكم</h2>
        <p>أدخل كلمة المرور للوصول إلى لوحة التحكم</p>

        <div className="input-group">
          <i className="fas fa-lock input-icon"></i>
          <input
            type="password"
            placeholder="كلمة المرور"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoFocus
          />
        </div>

        {error && <p className="login-error">{error}</p>}

        <button type="submit" className="btn btn-primary">
          <i className="fas fa-sign-in-alt"></i> دخول
        </button>

        <div style={{ marginTop: 20 }}>
          <a href="/" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>
            <i className="fas fa-arrow-right"></i> العودة للرئيسية
          </a>
        </div>
      </form>
    </div>
  );
}
