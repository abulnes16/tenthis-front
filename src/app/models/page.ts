import Block from './block';

interface Page {
  title: string;
  description: string;
  isMain: boolean;
  isVisible: boolean;
  html: Array<Block>;
  css: string;
}

export default Page;
