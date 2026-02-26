import { Link } from 'react-router-dom';

function ProductCard({ product, onAddToCart }) {
  const handleAddToCart = (e) => {
    e.preventDefault();
    onAddToCart(product);
    
    // Optional: Show a nice toast notification
    const btn = e.target;
    const originalText = btn.textContent;
    btn.textContent = '✓ Added!';
    btn.style.background = '#5f8d4e';
    
    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
    }, 1500);
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`}>
        <img 
          src={product.image} 
          alt={product.name} 
          className="product-image"
        />
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-price">₦{parseFloat(product.price).toLocaleString()}</p>
          <p className="product-description">{product.description}</p>
        </div>
      </Link>
      <div style={{ padding: '0 2rem 2rem' }}>
        <button 
          className="btn" 
          style={{ 
            width: '100%',
            padding: '1rem',
            fontSize: '1rem',
            borderRadius: '12px'
          }}
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;