import Block from './block';

interface Page {
  _id?: string;
  title: string;
  description: string;
  isMain: boolean;
  isVisible: boolean;
  html: Array<Block>;
  css: string;
}

export default Page;
