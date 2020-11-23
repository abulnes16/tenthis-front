import Product from './product';

interface Order {
  _id?: string;
  client: any;
  date: string;
  total: number;
  store: string;
  products: Array<Product>;
}

export default Order;
