import Category from './category';
import Media from './media';

interface Product {
  name: string;
  description: string;
  price: number;
  categories: Array<Category>;
  quantity: number;
  tags: Array<string>;
  media: Array<Media>;
}

export default Product;