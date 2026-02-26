import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';

function ProductDetails({ onAddToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await api.getProduct(id);
        setProduct({ ...data, id });
        setLoading(false);
      } catch (error) {
        console.error('Error loading product:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    onAddToCart(product);
    navigate('/cart');
  };

  if (loading) {
    return <div className="loading">Loading product...</div>;
  }

  if (!product) {
    return <div className="loading">Product not found</div>;
  }

  return (
    <section className="product-details">
      <div className="container">
        <div className="product-details-grid">
          <div>
            <img 
              src={product.image} 
              alt={product.name} 
              className="product-details-image"
            />
          </div>
          <div className="product-details-info">
            <h1>{product.name}</h1>
            <p className="product-price">₦{parseFloat(product.price).toLocaleString()}</p>
            <p className="product-description">{product.description}</p>
            <button className="btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;