import Media from './media';

interface Configuration {
  logo: string | any;
  favicon: string | any;
  keywords: Array<string>;
  css: string;
  js: string;
  header: string;
  footer: string;
  useTemplate: boolean;
  template?: string;
}

export default Configuration;
