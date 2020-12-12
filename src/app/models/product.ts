import Category from './category';
import Media from './media';

interface Product {
  _id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  quantity: number;
  tags: string;
  media: Array<Media> | any;
}

export default Product;
