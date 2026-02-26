import { useEffect, useState } from 'react';
import { api } from '../services/api';
import ProductCard from '../components/ProductCard';
function Products({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [error, setError] = useState(null);
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
        setProducts(prods);
        setFiltered(prods);
        setLoading(false);
      } catch (error) {
        setError('Error: ' + error.message);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);
  const filterByCategory = (category) => {
    setActiveCategory(category);
    if (category === 'all') {
      setFiltered(products);
    } else {
      setFiltered(products.filter(p => p.category === category));
    }
  };
  return (
    <section className="products-section">
      <div className="container">
        <h2 className="section-title">Our Products</h2>
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
        ) : error ? (
          <div style={{ textAlign: 'center', color: 'red', padding: '2rem' }}>
            <h3>❌ Error Loading Products</h3>
            <p>{error}</p>
            <p>Make sure XAMPP is running and backend files are in the correct location.</p>
          </div>
        ) : (
          <>
            <p className="product-count">{filtered.length} products found</p>
            <div className="products-grid">
              {filtered.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
export default Products;