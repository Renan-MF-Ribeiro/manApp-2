import { Product } from '../../products/model/product.model';

export interface Order {
  id: string;
  customerName: string;
  product: OrderItem[];
  total: number;
  status: 'paid' | 'pending' | 'cancelled';
  meansOfPayment: 'card' | 'pix' | 'cash';
  orderDate: Date;
}

export interface OrderItem {
  product: Product;
  quantity: number;
  total: number;
}
