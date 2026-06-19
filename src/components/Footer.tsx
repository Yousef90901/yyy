export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>© {new Date().getFullYear()} يوسف رجب عويس. جميع الحقوق محفوظة.</p>
        <div className="footer-links">
          <a href="#hero">الرئيسية</a>
          <a href="#about">عنّي</a>
          <a href="#projects">المشاريع</a>
          <a href="#contact">تواصل</a>
        </div>
      </div>
    </footer>
  );
}
