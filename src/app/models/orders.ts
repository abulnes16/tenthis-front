import Product from './product';

interface Order {
  numOrder: number;
  client: any;
  date: Date;
  total: number;
  products: Array<Product>;
}

export default Order;
