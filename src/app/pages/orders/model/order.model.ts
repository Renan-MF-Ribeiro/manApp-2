import { Product } from '../../products/model/product.model';

export interface Order {
  id: string;
  client: string;
  product: OrderItem[];
  total: number;
  status: 'paid' | 'pending' | 'cancelled';
  meansOfPayment: 'card' | 'pix' | 'cash';
  orderDate: Date;
  date: Date;
}

export interface OrderItem {
  product: Product;
  quantity: number;
  total: number;
}
