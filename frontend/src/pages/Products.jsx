import { useEffect, useState } from 'react';
import { api } from '../services/api';
import ProductCard from '../components/ProductCard';

function Products({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');

  // Categories with "Noodles" instead of specific brands
  const categories = [
    { key: 'all', label: '🛒 All Products' },
    { key: 'rice', label: '🌾 Rice' },
    { key: 'oil', label: '🫙 Oil' },
    { key: 'noodles', label: '🍜 Noodles' },
    { key: 'others', label: '📦 Others' },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await api.getProducts();
        const prods = data.products || [];
        
        console.log('📦 Products loaded:', prods.length);
        prods.forEach(p => {
          console.log(`  - ${p.name} | Category: ${p.category}`);
        });
        
        setProducts(prods);
        setFiltered(prods);
        setLoading(false);
      } catch (error) {
        console.error('Error loading products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filterByCategory = (category) => {
    console.log('🔍 Filtering by:', category);
    setActiveCategory(category);
    
    if (category === 'all') {
      setFiltered(products);
      console.log('✅ Showing all products:', products.length);
    } else if (category === 'noodles') {
      // Show all noodle products (minimie, indomie, or any noodle brand)
      const result = products.filter(product => 
        product.category === 'noodles' || 
        product.category === 'minimie' ||
        product.category === 'indomie'
      );
      console.log(`✅ Found ${result.length} noodle products`);
      result.forEach(p => console.log(`  - ${p.name}`));
      setFiltered(result);
    } else {
      const result = products.filter(product => product.category === category);
      console.log(`✅ Found ${result.length} products in "${category}" category`);
      result.forEach(p => console.log(`  - ${p.name}`));
      setFiltered(result);
    }
  };

  return (
    <section className="products-section">
      <div className="container">
        <h2 className="section-title">Our Products</h2>
        <p style={{ 
          textAlign: 'center', 
          fontSize: '1.2rem', 
          color: '#666', 
          marginTop: '1rem',
          marginBottom: '2rem'
        }}>
          Browse our carefully curated selection of premium foodstuffs
        </p>

        {/* Category Filter Tabs */}
        <div className="category-tabs">
          {categories.map(cat => (
            <button
              key={cat.key}
              className={`category-tab ${activeCategory === cat.key ? 'active' : ''}`}
              onClick={() => filterByCategory(cat.key)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="loading">Loading products...</div>
        ) : (
          <>
            <p className="product-count">
              {filtered.length} {filtered.length === 1 ? 'product' : 'products'} found
            </p>
            
            <div className="products-grid">
              {filtered.length > 0 ? (
                filtered.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={onAddToCart}
                  />
                ))
              ) : (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '4rem',
                  gridColumn: '1 / -1',
                  background: '#fff',
                  borderRadius: '12px',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                }}>
                  <h3 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#666' }}>
                    😕 No products found
                  </h3>
                  <p style={{ color: '#999', fontSize: '1.1rem' }}>
                    No products match the "{activeCategory}" category.
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Products;