import axios from 'axios';

const API_BASE_URL = '/api';

export const api = {
  getProducts: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/getproducts.php`);
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },
  getProduct: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/getproduct.php?id=${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },
  saveOrder: async (orderData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/saveorder.php`, orderData);
      return response.data;
    } catch (error) {
      console.error('Error saving order:', error);
      throw error;
    }
  },
  sendOrderEmail: async (orderData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/sendOrderEmail.php`, orderData);
      return response.data;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
};