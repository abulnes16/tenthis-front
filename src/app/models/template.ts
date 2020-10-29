import Media from './media';

interface Template {
  name: string;
  description: string;
  css: string;
  js: string;
  media: Array<Media>;
}

export default Template;
