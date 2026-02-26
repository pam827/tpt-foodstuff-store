import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '../services/api';
import ProductCard from '../components/ProductCard';

function Home({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await api.getProducts();
        // Show only first 6 products on home page
        setProducts((data.products || []).slice(0, 6));
        setLoading(false);
      } catch (error) {
        console.error('Error loading products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-content">
          <h1>Fresh from the Market to Your Door</h1>
          <p>Premium quality rice, oil, and noodles delivered with care</p>
          <Link to="/products" className="btn">Explore Our Products</Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="products-section">
        <div className="container">
          <h2 className="section-title">Featured Products</h2>
          <p className="product-count" style={{ marginTop: '1rem' }}>
            Handpicked favorites from our collection
          </p>
          
          {loading ? (
            <div className="loading">Loading delicious products...</div>
          ) : (
            <>
              <div className="products-grid">
                {products.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product}
                    onAddToCart={onAddToCart}
                  />
                ))}
              </div>
              
              <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                <Link to="/products" className="btn">
                  View All Products
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section style={{ 
        background: 'linear-gradient(135deg, #f5ebe0 0%, #e5c185 100%)', 
        padding: '5rem 0',
        marginTop: '4rem'
      }}>
        <div className="container">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '3rem',
            textAlign: 'center'
          }}>
            <div>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚚</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.8rem', fontFamily: 'Playfair Display' }}>
                Fast Delivery
              </h3>
              <p style={{ color: '#666', fontSize: '1.05rem' }}>
                Quick delivery to your doorstep within Lagos
              </p>
            </div>
            
            <div>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✨</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.8rem', fontFamily: 'Playfair Display' }}>
                Quality Guaranteed
              </h3>
              <p style={{ color: '#666', fontSize: '1.05rem' }}>
                Only the finest products make it to our store
              </p>
            </div>
            
            <div>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💰</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.8rem', fontFamily: 'Playfair Display' }}>
                Best Prices
              </h3>
              <p style={{ color: '#666', fontSize: '1.05rem' }}>
                Competitive pricing on all bulk purchases
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;