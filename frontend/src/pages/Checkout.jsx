import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

function Checkout({ cart, onClearCart }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customer_name: '',
    phone: '',
    address: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderMethod, setOrderMethod] = useState(''); // 'whatsapp' or 'email'

  const total = cart.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const formatWhatsAppMessage = () => {
    let message = `*NEW ORDER*\n\n`;
    message += `Name: ${formData.customer_name}\n`;
    message += `Phone: ${formData.phone}\n`;
    message += `Address: ${formData.address}\n\n`;
    message += `*ORDER ITEMS:*\n`;
    message += `------------------------\n`;
    
    cart.forEach(item => {
      const subtotal = parseFloat(item.price) * item.quantity;
      message += `${item.name} x${item.quantity} = ₦${subtotal.toLocaleString()}\n`;
    });
    
    message += `------------------------\n`;
    message += `*TOTAL: ₦${total.toLocaleString()}*`;
    
    return encodeURIComponent(message);
  };

  const handleWhatsAppOrder = async () => {
    if (!formData.customer_name || !formData.phone || !formData.address) {
      alert('Please fill in all fields');
      return;
    }

    try {
      // Save order to database
      const orderData = {
        ...formData,
        cart_items: cart,
        total_price: total,
        order_method: 'whatsapp'
      };

      await api.saveOrder(orderData);

      // Open WhatsApp
      const message = formatWhatsAppMessage();
      const whatsappNumber = '23408026353037'; // ← CHANGE THIS to your WhatsApp number
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
      
      window.open(whatsappUrl, '_blank');
      
      setSuccess(true);
      onClearCart();
      
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to process order. Please try again.');
    }
  };

  const handleEmailOrder = async () => {
    if (!formData.customer_name || !formData.phone || !formData.address) {
      alert('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      // Save order to database
      const orderData = {
        ...formData,
        cart_items: cart,
        total_price: total,
        order_method: 'email',
        store_email: 'ipamilerin3@gmail.com' // ← CHANGE THIS to your email
      };

      await api.saveOrder(orderData);
      await api.sendOrderEmail(orderData);

      setSuccess(true);
      onClearCart();
      
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send email. Please try WhatsApp instead.');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <section className="checkout-section">
        <div className="container">
          <div className="empty-cart">
            <h2>Your cart is empty</h2>
            <p>Add some products before checking out</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="checkout-section">
      <div className="container">
        <h2 className="section-title">Checkout</h2>
        
        {success && (
          <div className="success-message">
            ✅ Order placed successfully! Redirecting...
          </div>
        )}

        <form className="checkout-form" onSubmit={(e) => e.preventDefault()}>
          <div className="order-summary">
            <h3>Order Summary</h3>
            {cart.map(item => (
              <div key={item.id} className="order-item">
                <span>{item.name} x {item.quantity}</span>
                <span>₦{(parseFloat(item.price) * item.quantity).toLocaleString()}</span>
              </div>
            ))}
            <div className="order-total">
              <span>Total:</span>
              <span>₦{total.toLocaleString()}</span>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="customer_name">Full Name *</label>
            <input
              type="text"
              id="customer_name"
              name="customer_name"
              value={formData.customer_name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="e.g., 08012345678"
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Delivery Address *</label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              placeholder="Enter your full delivery address"
            />
          </div>

          {/* Order Method Buttons */}
          <div className="order-buttons">
            <button 
              type="button"
              className="btn btn-whatsapp" 
              onClick={handleWhatsAppOrder}
              disabled={loading}
            >
              📱 Order via WhatsApp
            </button>

            <button 
              type="button"
              className="btn btn-email" 
              onClick={handleEmailOrder}
              disabled={loading}
            >
              {loading ? '📧 Sending...' : '📧 Order via Email'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Checkout;