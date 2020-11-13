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
  products: Array<Product>;
  categories: Array<Category>;
  pages: Array<any>;
  configuration: Configuration;
  media: Array<Media>;
  isBlock: boolean;
  isActive: boolean;
}

export default Store;
