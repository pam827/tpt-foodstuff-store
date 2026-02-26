import { Link } from 'react-router-dom';

function Cart({ cart, onUpdateQuantity, onRemoveFromCart }) {
  const total = cart.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);

  if (cart.length === 0) {
    return (
      <section className="cart-section">
        <div className="container">
          <div className="empty-cart">
            <h2>Your cart is empty</h2>
            <p>Add some delicious products to get started!</p>
            <Link to="/products" className="btn">Browse Products</Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="cart-section">
      <div className="container">
        <h2 className="section-title">Shopping Cart</h2>
        
        <div className="cart-items">
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <img 
                src={item.image} 
                alt={item.name} 
                className="cart-item-image"
              />
              <div className="cart-item-info">
                <h3 className="cart-item-name">{item.name}</h3>
                <p className="cart-item-price">₦{parseFloat(item.price).toLocaleString()}</p>
                
                <div className="quantity-controls">
                  <button 
                    className="quantity-btn"
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span className="quantity-display">{item.quantity}</span>
                  <button 
                    className="quantity-btn"
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                  <button 
                    className="remove-btn"
                    onClick={() => onRemoveFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div>
                <p className="cart-item-price">
                  ₦{(parseFloat(item.price) * item.quantity).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="cart-total">
            Total: ₦{total.toLocaleString()}
          </div>
          <Link to="/checkout" className="btn" style={{ width: '100%', textAlign: 'center', display: 'block' }}>
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Cart;