import Product from './product';

interface Order {
  _id?: string;
  numOrder: string;
  client: any;
  date: string;
  total: number;
  products: Array<Product>;
}

export default Order;
