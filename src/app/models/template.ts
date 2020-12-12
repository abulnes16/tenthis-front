import Media from './media';

interface Template {
  _id?: string;
  name: string;
  description: string;
  html: string;
  css: string;
  js: string;
  media: Array<any>;
}

export default Template;
