import Category from './category';
import Configuration from './configuration';
import Media from './media';
import Product from './product';
import User from './user';

interface Store {
  _id?: string;
  name: string;
  user: User;
  description: string;
  pages: Array<any>;
  configuration: Configuration;
  isBlock: boolean;
  isActive: boolean;
}

export default Store;
