import Product from './product';

interface Order {
  numOrder: string;
  client: any;
  date: string;
  total: number;
  products: Array<Product>;
}

export default Order;
