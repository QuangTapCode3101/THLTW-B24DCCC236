export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface OrderEntity {
  orderId: string;
  customerId: string;
  customerName: string;
  orderDate: string;
  totalAmount: number;
  status: 'PENDING' | 'SHIPPING' | 'COMPLETED' | 'CANCELLED';
  items: OrderItem[];
}

export const CUSTOMER_LIST = [
  { label: 'Nguyễn Văn A', value: 'C001' },
  { label: 'Trần Thị B', value: 'C002' },
  { label: 'Lê Văn C', value: 'C003' },
];

export const PRODUCT_LIST = [
  { label: 'iPhone 15', value: 'P01', price: 20000000 },
  { label: 'MacBook M2', value: 'P02', price: 30000000 },
  { label: 'iPad Air', value: 'P03', price: 15000000 },
];              