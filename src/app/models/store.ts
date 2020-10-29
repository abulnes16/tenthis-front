import Category from './category';
import Configuration from './configuration';
import Media from './media';
import Product from './product';

interface Store {
  name: string;
  description: string;
  products: Array<Product>;
  categories: Array<Category>;
  pages: Array<any>;
  configuration: Configuration;
  media: Array<Media>;
}

export default Store;
