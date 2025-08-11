import axios from 'axios';
import { Product } from '../types/Product';

const API_URL = 'http://localhost:5000/api/products';

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};