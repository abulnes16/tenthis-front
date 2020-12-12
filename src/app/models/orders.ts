import Product from './product';
import Store from './store';

interface Order {
  _id?: string;
  client?: any;
  date?: string;
  total?: number;
  store: string | Store | any;
  products: Array<Product>;
}

export default Order;
