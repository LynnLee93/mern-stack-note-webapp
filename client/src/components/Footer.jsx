function Footer() {

  const year = new Date().getFullYear();

  return (
    <footer className="footer mt-auto py-3 bg-light">
      <div className="container">

      <a href="https://github.com/LynnLee93" target="_blank" rel="noreferrer"><i className="footer-logo fab fa-md fa-github"></i></a>
      <a href="https://www.linkedin.com/in/hellolynnlee/" target="_blank" rel="noreferrer"><i className="footer-logo fab fa-md fa-linkedin"></i></a>
      <a href="mailto:linglynn1221@gmail.com"><i className="footer-logo fas fa-md fa-envelope"></i></a>

      <p className="text-muted">Copyright on Lynn.L {year}</p>
    </div>
</footer>
  );
}

export default Footer;
