function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <h3 style={{ 
          fontSize: '1.8rem', 
          marginBottom: '1rem',
          fontFamily: 'Playfair Display'
        }}>
          TPT&T NIG ENT
        </h3>
        <p>Premium Quality Foodstuffs Delivered to Your Doorstep</p>
        <p style={{ marginTop: '1.5rem', opacity: '0.8' }}>
          &copy; {new Date().getFullYear()} TPT&T NIG ENT. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
