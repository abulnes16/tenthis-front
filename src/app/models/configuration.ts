interface Configuration {
  logo: string;
  favicon: string;
  keywords: Array<string>;
  css: string;
  js: string;
  header: string;
  footer: string;
  useTemplate: boolean;
  template?: string;
}

export default Configuration;
