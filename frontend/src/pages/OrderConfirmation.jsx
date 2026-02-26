import { Link, Navigate } from 'react-router-dom';

// ======================================
// STORE CONFIG - UPDATE THIS VALUE
// ======================================
const STORE_WHATSAPP = '2349065297894';
// ======================================

function OrderConfirmation({ order }) {
  if (!order) {
    return <Navigate to="/" replace />;
  }

  const buildWhatsAppMessage = () => {
    let message = `Hello! I just placed an order on TPT&T.\n\n`;
    message += `Order #${order.order_id}\n`;
    message += `Name: ${order.customer_name}\n`;
    message += `Phone: ${order.phone}\n`;
    message += `Address: ${order.address}\n\n`;
    message += `Items:\n`;

    order.cart_items.forEach(item => {
      const subtotal = item.price * item.quantity;
      message += `- ${item.name} x${item.quantity} = ₦${subtotal.toLocaleString()}\n`;
    });

    message += `\nTotal: ₦${order.total_price.toLocaleString()}\n\n`;
    message += `Please confirm my order. Thank you!`;

    return encodeURIComponent(message);
  };

  const whatsappUrl = `https://wa.me/${STORE_WHATSAPP}?text=${buildWhatsAppMessage()}`;

  return (
    <section className="confirmation-section">
      <div className="container">
        <div className="confirmation-card">
          <div className="confirmation-header">
            <div className="confirmation-icon">✓</div>
            <h1>Order Placed Successfully!</h1>
            <p className="confirmation-subtitle">
              Your order <strong>#{order.order_id}</strong> has been received.
              A confirmation email has been sent to <strong>{order.customer_email}</strong>.
            </p>
          </div>

          <div className="confirmation-details">
            <h3>Order Summary</h3>
            <div className="confirmation-items">
              {order.cart_items.map(item => (
                <div key={item.id} className="order-item">
                  <span>{item.name} x {item.quantity}</span>
                  <span>₦{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
              <div className="order-total">
                <span>Total:</span>
                <span>₦{order.total_price.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="confirmation-customer">
            <h3>Delivery Details</h3>
            <p><strong>Name:</strong> {order.customer_name}</p>
            <p><strong>Phone:</strong> {order.phone}</p>
            <p><strong>Email:</strong> {order.customer_email}</p>
            <p><strong>Address:</strong> {order.address}</p>
          </div>

          <div className="confirmation-actions">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
            >
              Send Order via WhatsApp
            </a>
            <Link to="/products" className="btn btn-secondary">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OrderConfirmation;